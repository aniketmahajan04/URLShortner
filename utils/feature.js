const mongoose = require("mongoose");

const connectDb = async (url) => {
    try{
        const connection = await mongoose.connect(url);
        console.log(`Connected to DB: ${connection.connection.host}`);
    } catch(error){
        console.log("Error while connecting to database", error);
        throw new Error("Failed to connect with database");
    }
}

module.exports = {
    connectDb
}