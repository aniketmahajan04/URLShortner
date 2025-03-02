const { JWT_SECRET } = require("../config/config");
const { userModel } = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        res.json({
            msg: "please enter all fields"
        });
        return;
    }
    try{

        const hashedPassword = await bcrypt.hash(password, 5);

        await userModel.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        res.status(201).json({
            msg: "Signup successfull!",
        });

    } catch(error){
        res.status(500).json({
            msg: "Internal server error"
        });
        console.error("Something went wrong", error);
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;

    try{

        const foundUser = await userModel.findOne({
            email: email
        });

        if(foundUser){
            const isMatch = bcrypt.compare(password, foundUser.password);

            if(!isMatch){
                res.status(400).json({
                    msg: "Invalid credentials"
                });
                return;
            }

            if(!JWT_SECRET){
                throw new Error("JWT_SECRET is not defined");
            }

            const token = jwt.sign({
                id: foundUser._id
            }, JWT_SECRET);

            res.setHeader('Authorization', `Bearer ${token}`);

            res.cookie('token', token, {
                httpOnly: true,
                secure: req.secure || false,
                maxAage: 60 * 60 * 1000
            });

            res.status(200).json({
                msg: "loggen in!",
                token: token
            });
            
        }else {
            res.status(404).json({
                msg: "User not found!"
            });
        }


    } catch(error){
        res.status(500).json({
            msg: "Internal server error"
        });
        console.error("Something went wrong", error);
    }
}

module.exports = {
    signup,
    signin
}
