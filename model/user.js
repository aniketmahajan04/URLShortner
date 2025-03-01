const { Schema, model, models, Types } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    links: [
        {
            type: Types.ObjectId,
            ref: "Link",
        }
    ]
},
{
    timestamps: true
});

module.exports = {
    userModel: models.User || model("User", userSchema)
}