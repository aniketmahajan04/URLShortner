const { Schema, model, models } = require("mongoose");

const linkSchema = new Schema({
    urlLink: {
        type: String,
        required: true,
        match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, "Invalid URL format"]
    },
    shortId: {
        type: String,
        required: true,
        unique: true
    },
}, 
{
    timestamps: true,
})

module.exports = {
    linkModel: models.Link || model("Link", linkSchema)
}