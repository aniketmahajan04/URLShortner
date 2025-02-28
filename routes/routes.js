const { Router } = require("express");
const { signup, signin } = require("../controller/user")

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

module.exports = {
    userRouter
} 