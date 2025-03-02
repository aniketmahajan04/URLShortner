const { Router } = require("express");
const { generate } = require("../controller/link");
const { auth } = require("../middleware/middleware");


const linkRouter = Router();

linkRouter.post("/generate", auth, generate);

module.exports = {
    linkRouter
}