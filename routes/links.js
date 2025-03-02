const { Router } = require("express");
const { generate } = require("../controller/link");


const linkRouter = Router();

// linkRouter.post("/generate", generate);

module.exports = {
    linkRouter
}