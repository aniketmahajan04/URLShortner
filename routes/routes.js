const { Router } = require("express");
const { signup } = require("../controller/user")

const userRouter = Router();

userRouter.post("/signup", signup);

module.exports = {
    userRouter
} 