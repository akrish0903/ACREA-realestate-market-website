const UserAuthModel = require("../models/UserAuthModel");
const redis_client = require("../utils/init_redis");
const { jwt_utils, jwt_refresh_token, jwt_verify_refresh_token } = require("../utils/jwt_utils");
const httpErrors = require("http-errors");

// Register new user
const signupUserAuthController = async (req, res, next) => {
    // getting from frontend
    console.log("----> ", req.body);
    const { usrFullName, usrEmail, usrMobileNumber, usrPassword, usrType } = req.body;
    // previous user finding
    var previousUserFound;
    try {
        previousUserFound = await UserAuthModel.findOne({
            $or: [{ usrEmail }, { usrMobileNumber }]
        })
    } catch (error) {
        console.log("Unable to fetch previous users records - ", error)
    }

    // Creating new User
    if (previousUserFound) {
        next(httpErrors.Conflict("Email or Number already registered."))
    } else {
        try {
            const newUserSetup = new UserAuthModel({
                usrFullName,
                usrEmail,
                usrMobileNumber,
                usrPassword,
                usrType,
            });

            var savedUserDetails = await newUserSetup.save();
            const accessToken = await jwt_utils(savedUserDetails.id);
            const refreshToken = await jwt_refresh_token(savedUserDetails.id);
            res.status(201).json({ message: "User registered successfully", token: accessToken, refresh_token: refreshToken });
        } catch (err) {
            console.log(err)
            res.status(400).json({ message: "Error registering user", error: err });
        }
    }

};









// Get all users
const signinUserAuthController = async (req, res, next) => {
    const { usrEmail, usrPassword } = req.body;
    // fetching email details from email
    try {
        var isEmailFound = await UserAuthModel.findOne({ usrEmail });
        if (isEmailFound) {
            var isPasswordMatchedSchema = await isEmailFound.isValidPassword(usrPassword)
            if (isPasswordMatchedSchema) {
                // here user is logged in
                // giving token back
                const accessToken = await jwt_utils(isEmailFound.id);
                const refreshToken = await jwt_refresh_token(isEmailFound.id);
                res.status(201).json({ message: "User signed in successfully", token: accessToken, refresh_token: refreshToken });
            } else {
                next(httpErrors.Unauthorized("Invalid Email or Password"))
            }
        } else {
            next(httpErrors.BadRequest("Invalid Email or Password"))
        }
    } catch (error) {
        console.log(error)
        next(httpErrors.ServiceUnavailable())
    }

};


const updateAccUserAuthController = async function (req, res, next) {
    res.send("User token is correct.")
}

const refreshTokenUserAuthController = async function (req, res, next) {
    try {
        const { user_refresh_token } = req.body;
        if (user_refresh_token) {
            var userID = await jwt_verify_refresh_token(user_refresh_token);
            const accessToken = await jwt_utils(userID);
            const refreshToken = await jwt_refresh_token(userID);
            res.status(201).json({ message: "User refresh token is refreshed", token: accessToken, refresh_token: refreshToken });
        } else {
            next(httpErrors.BadRequest());
        }
    } catch (error) {
        next(error)
    }
}



const logoutUserAuthController = async (req, res, next) => {
    
    try {
        const { user_refresh_token } = req.body;
        if (user_refresh_token) {
            try {
                const userID = await jwt_verify_refresh_token(user_refresh_token);
                try {
                    var delResponseRedis = await redis_client.del(userID)
                    console.log(delResponseRedis);
                    res.sendStatus(204);
                } catch (error) {
                    console.log(error);
                    next(httpErrors.InternalServerError);
                }
            }
            catch (error) {
                next(error);
            }
        } else {
            next(httpErrors.BadRequest());
        }
    } catch (error) {
        next(error)
    }
}
module.exports = { signupUserAuthController, signinUserAuthController, updateAccUserAuthController, refreshTokenUserAuthController, logoutUserAuthController };