const express = require("express");
const { PORT } = require("./config/config");
const { userRouter }  = require("./routes/routes");
const { connectDb } = require("./utils/feature");
const { MONGO_URL } = require("./config/config");
const { linkRouter } = require("./routes/links");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(express.Router());


if(!MONGO_URL){
    throw new Error("MONGO_URL is not define in the env variables");
}

connectDb(MONGO_URL);

app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/link", linkRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});