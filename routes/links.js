const { Router } = require("express");
const { generate, redirect } = require("../controller/link");
const { auth } = require("../middleware/middleware");


const linkRouter = Router();

linkRouter.post("/generate", auth, generate);
linkRouter.get("/redirect/:shortId", auth, redirect);

module.exports = {
    linkRouter
}