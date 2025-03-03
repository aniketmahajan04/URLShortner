const { Router } = require("express");
const { generate, redirect , allLinks, deleteLinks} = require("../controller/link");
const { auth } = require("../middleware/middleware");


const linkRouter = Router();

linkRouter.post("/generate", auth, generate);
linkRouter.get("/redirect/:shortId", redirect);
linkRouter.get("/links", auth, allLinks);
linkRouter.delete("/delete/:linkId", auth, deleteLinks);
module.exports = {
    linkRouter
}