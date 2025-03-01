const { Schema, model, models } = require("mongoose");

const linkSchema = new Schema({
    link: {
        type: String,
        required: true,
        match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, "Invalid URL format"]
    },
    slug: {
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