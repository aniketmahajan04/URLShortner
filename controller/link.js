const { generateShortUrl } = require("../utils/helper");
const { linkModel } = require("../model/link");
const { BASE_URL } = require("../config/config");
const { userModel } = require("../model/user");

const generate = async (req, res) => {
    const { longLink } = req.body;

    if(!longLink){
        res.status(400).json({
            msg: "Must provide a link"
        });
        return;
    }

    try{

        let shortUrl = generateShortUrl();

        let existingUrl = await linkModel.findOne({
            shortId: shortUrl
        });

        do{
            shortUrl = generateShortUrl();
            existingUrl = await linkModel.findOne({
                shortId: shortUrl
            })
        }while(existingUrl);

        const link = await linkModel.create({
            userId: req.userId,
            urlLink: longLink,
            shortId: shortUrl
        });

        await userModel.findByIdAndUpdate(req.userId, {
            $push: { links: link._id }
        });

        res.status(201).json({
            msg: "Short link generated",
            shortLink: `${BASE_URL}${shortUrl}`
        });


    } catch(error){
        res.status(500).json({
            msg: "Internal server error"
        });
        console.error("link generation error", error);
    }
}

const redirect = async (req, res) => {
    const { shortId } = req.params;

    try{
        const link = await linkModel.findOne({
            shortId: shortId
        });
        if(!link){
            return res.status(404).json({ msg: "Short link not found" });
        }

        res.redirect(link.urlLink);

    } catch(error){
        console.error("Redirect error:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

const allLinks = async (req, res) => {
    const userId = req.userId;

    try{

        const links = await linkModel.find({
            userId: userId
        });

        if (links.length === 0) {
            return res.status(404).json({ msg: "No links found" });
        }

        res.status(200).json({ links: links });

    } catch(error){
        res.status(500).json({
            msg: "Internal server error"
        });
        console.log("Fetching error", error);
    }
}

const deleteLinks = async (req, res) => {
    const userId = req.userId;
    const { linkId } = req.params;

    try{

        const deletingLink = await linkModel.findOneAndDelete({
            _id: linkId,
            userId: userId
        });

        if (!deletingLink) {
            return res.status(404).json({ msg: "Link not found" });
        }

        await userModel.findByIdAndUpdate(userId, {
            $pull: { links: deletingLink._id }
        });

        res.status(201).json({ msg: "Link successfully deleted" });

    } catch(error){
        res.status(500).json({ msg: "Internal server error" });
        console.error("link deleting error");
    }
}

module.exports = {
    generate,
    redirect,
    allLinks,
    deleteLinks
}