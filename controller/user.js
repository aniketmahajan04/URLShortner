const { userModel } = require("../model/user");
const bcrypt = require("bcrypt");


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

        const user = await userModel.create({
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

module.exports = {
    signup
}
