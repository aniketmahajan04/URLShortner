const express = require("express");
const { PORT } = require("./config/config");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home page");
})
app.get("/home", (req, res) => {
    res.send("Home page2");
})
app.get("/about", (req, res) => {
    res.send("about page2");
})

// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/link", linkRouter);

app.listen(PORT);