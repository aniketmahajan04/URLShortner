const { Router } = require("express");
const { signup } = require("")

const userRouter = Router();

userRouter.post("/signup", signup);