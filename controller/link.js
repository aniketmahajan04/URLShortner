const { generateShortUrl } = require("../utils/helper");
const { linkModel } = require("../model/link");
const { BASE_URL } = require("../config/config");

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
            urlLink: longLink,
            shortId: shortUrl
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

module.exports = {
    generate
}