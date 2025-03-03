const { Schema, model, models, Types } = require("mongoose");

const linkSchema = new Schema({
    userId: {  
        type: Types.ObjectId,
        ref: "User",
        required: true,
        trim: true
    },
    urlLink: {
        type: String,
        required: true,
        trim: true,
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