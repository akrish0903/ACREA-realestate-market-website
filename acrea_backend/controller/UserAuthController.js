const UserAuthModel = require("../models/UserAuthModel");

// Register new user
const signupUserAuthController = async (req, res) => {
    // getting from frontend
    console.log("----> ",req.body);
    const { usrFullName, usrEmail, usrMobileNumber, usrPassword,usrType } = req.body;

    try {
        const newUserSetup = new UserAuthModel({
            usrFullName,
            usrEmail,
            usrMobileNumber,
            usrPassword,
            usrType,
        });

        await newUserSetup.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "Error registering user", error: err });
    }
};

// Get all users
const signinUserAuthController = async (req, res) => {
    try {
        const oldUserDetailsFetch = await UserAuthModel.find();
        res.status(200).json(oldUserDetailsFetch);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users", error: err });
    }
};

module.exports = { signupUserAuthController, signinUserAuthController };