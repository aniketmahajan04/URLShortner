const { JWT_SECRET } = require("../config/config");
const jwt = require("jsonwebtoken");


const auth = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
        return res.status(401).json({
            msg: "Please login"
        });
    }

    if(!JWT_SECRET){
        throw new Error("JWT secret key is not define");
    }

    try{

        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();

    } catch(error){
        res.status(500).json({
            msg: "Invalid or expire token, please login again"
        });
        console.error("Verification error", error);
    }
}

module.exports = {
    auth
}