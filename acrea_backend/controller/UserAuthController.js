//acrea_backend/controller/UserAuthController.js
const UserAuthModel = require("../models/UserAuthModel");
const redis_client = require("../utils/init_redis");
const { jwt_utils, jwt_refresh_token, jwt_verify_refresh_token } = require("../utils/jwt_utils");
const httpErrors = require("http-errors");

// Register new user
const signupUserAuthController = async (req, res, next) => {
    // getting from frontend
    console.log("----> ", req.body);
    const { usrFullName, usrEmail, usrMobileNumber, usrPassword, usrType, usrProfileUrl, userBio, usrStatus } = req.body;
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
                usrProfileUrl,
                userBio,
                usrStatus: usrStatus || true  // Set default value if not provided
            });

            var savedUserDetails = await newUserSetup.save();
            const accessToken = await jwt_utils(savedUserDetails.id);
            const refreshToken = await jwt_refresh_token(savedUserDetails.id);
            res.status(201).json({
                message: "User registered successfully", access_token: accessToken, refresh_token: refreshToken, user_details: {
                    usrFullName: savedUserDetails.usrFullName,
                    usrEmail: savedUserDetails.usrEmail,
                    usrMobileNumber: savedUserDetails.usrMobileNumber,
                    usrType: savedUserDetails.usrType,
                    usrProfileUrl: savedUserDetails.usrProfileUrl,
                    userBio: savedUserDetails.userBio,
                    usrStatus: savedUserDetails.usrStatus,
                }
            });
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
            // Check if the account is disabled
            if (!isEmailFound.usrStatus) {
                return next(httpErrors.Unauthorized("Your account is disabled."));
            }
            var isPasswordMatchedSchema = await isEmailFound.isValidPassword(usrPassword);
            if (isPasswordMatchedSchema) {
                // here user is logged in
                // giving token back
                // User is logged in successfully
                const accessToken = await jwt_utils(isEmailFound.id);
                const refreshToken = await jwt_refresh_token(isEmailFound.id);
                res.status(201).json({
                    message: "User signed in successfully",
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    user_details: {
                        _id: isEmailFound._id,
                        usrFullName: isEmailFound.usrFullName,
                        usrEmail: isEmailFound.usrEmail,
                        usrMobileNumber: isEmailFound.usrMobileNumber,
                        usrType: isEmailFound.usrType,
                        usrProfileUrl: isEmailFound.usrProfileUrl,
                        userBio: isEmailFound.userBio,
                    }
                });
            } else {
                next(httpErrors.Unauthorized("Invalid Email or Password"));
            }
        } else {
            next(httpErrors.BadRequest("Invalid Email or Password"));
        }
    } catch (error) {
        console.log(error);
        next(httpErrors.ServiceUnavailable());
    }
};

const updateUserProfileAuthController = async function (req, res, next) {

    var userId = req.payload.aud;
    const { usrFullName, usrEmail, usrMobileNumber, usrProfileUrl, userBio } = req.body;
    try {
        // question asked for this
        var fetchedUserData = await UserAuthModel.findById(userId);
        if (!fetchedUserData) {
            next(httpErrors.NotFound("User not found."))
        }
        console.log("---out --- ", fetchedUserData)
        fetchedUserData.usrFullName = usrFullName;
        fetchedUserData.usrEmail = usrEmail;
        fetchedUserData.usrMobileNumber = usrMobileNumber;
        fetchedUserData.usrProfileUrl = usrProfileUrl;
        fetchedUserData.userBio = userBio;
        console.log("first")
        var updatedFetchedUser = await fetchedUserData.save()
        console.log("second")
        res.status(200).json({
            message: "User profile updated successfully.",
            user_details: {
                usrFullName: updatedFetchedUser.usrFullName,
                usrEmail: updatedFetchedUser.usrEmail,
                usrMobileNumber: updatedFetchedUser.usrMobileNumber,
                usrProfileUrl: updatedFetchedUser.usrProfileUrl,
                userBio: updatedFetchedUser.userBio,
            }
        });
        console.log("third")

    } catch (error) {
        next(httpErrors.InternalServerError("Error updating profile."))
    }
}

const resetPasswordAuthController = async function (req, res, next) {
    var { usrPasswordCurrent, usrPasswordNew } = req.body;
    var { aud: userId } = req.payload;
    try {
        var fetchedUserData = await UserAuthModel.findById(userId);
        var oldPassRes = await fetchedUserData.isValidPassword(usrPasswordCurrent);
        if (oldPassRes === false) {
            next(httpErrors.Unauthorized("Current password is wrong."))
        } else {
            fetchedUserData.usrPassword = usrPasswordNew;
            var updatedFetchedUser = await fetchedUserData.save();
            console.log(updatedFetchedUser);
            res.status(201).json({ message: "User password updated success." })
        }
        console.log(oldPassRes)
    } catch (error) {
        next(httpErrors.InternalServerError("Error updating profile."))
    }
}

const forgotPasswordAuthController = async (req, res, next) => {
    try {
        const { usrEmail, usrPassword } = req.body;

        if (!usrEmail || !usrPassword) {
            return res.status(400).json({
                success: false,
                error: { message: "Email and new password are required" }
            });
        }

        // Find user by email
        const user = await UserAuthModel.findOne({ usrEmail });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: { message: "User not found" }
            });
        }

        // Update password
        user.usrPassword = usrPassword; // Will be hashed by pre-save middleware
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {
        console.error("Forgot password error:", error);
        next(httpErrors.InternalServerError("Error updating password"));
    }
};

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

const showBuyerListController = async (req, res, next) => {
    const userId = req.payload.aud;
    try {
        const fetchedUserData = await UserAuthModel.findById(userId);
        if (fetchedUserData.usrType !== "admin") {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        const usrBuyerListArr = await UserAuthModel.find({ usrType: "buyer" }).sort({ usrFullName: 1 });
        console.log("Fetched buyers: ", usrBuyerListArr); // Add this log
        res.status(200).json({
            message: "All user records fetched successfully.",
            user_buyerlist_arr: usrBuyerListArr // Ensure this matches the frontend expectation
        });
    } catch (error) {
        console.error("Failed to fetch buyers list:", error);
        next(httpErrors.BadRequest("Failed to fetch buyers list"));
    }
};

const showAgentListController = async (req, res, next) => {
    const userId = req.payload.aud;
    try {
        const fetchedUserData = await UserAuthModel.findById(userId);
        const usrAgentListArr = await UserAuthModel.find({ $or: [{ usrType: "agent" }, { usrType: 'owner' }] }).sort({ usrFullName: 1 });
        console.log("Fetched agents and owners: ", usrAgentListArr);
        res.status(200).json({
            message: "All user records fetched successfully.",
            user_agentlist_arr: usrAgentListArr
        });
    } catch (error) {
        console.error("Failed to fetch agents and owners list:", error);
        next(httpErrors.BadRequest("Failed to fetch agents and owners list"));
    }
};

const showRecentBuyerstoAdminController = async (req, res, next) => {
    const userId = req.payload.aud;
    try {
        const fetchedUserData = await UserAuthModel.findById(userId);
        if (fetchedUserData.usrType !== "admin") {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        // Fetch only the most recent 4 buyers
        const usrBuyerListArr = await UserAuthModel.find({ usrType: "buyer" })
            .sort({ createdAt: -1 }) // Sort by creation date, newest first
            .limit(4); // Limit to 4 users
        console.log("Fetched buyers: ", usrBuyerListArr);
        res.status(200).json({
            message: "All user records fetched successfully.",
            user_buyerlist_arr: usrBuyerListArr
        });
    } catch (error) {
        console.error("Failed to fetch buyers list:", error);
        next(httpErrors.BadRequest("Failed to fetch buyers list"));
    }
};

const showRecentAgentstoAdminController = async (req, res, next) => {
    const userId = req.payload.aud;
    try {
        const fetchedUserData = await UserAuthModel.findById(userId);
        if (fetchedUserData.usrType !== "admin") {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        const usrAgentListArr = await UserAuthModel.find({ $or: [{ usrType: "agent" }, { usrType: 'owner' }] }).sort({ createdAt: -1 }) .limit(4); 
        console.log("Fetched agents and owners: ", usrAgentListArr);
        res.status(200).json({
            message: "All agents and owners records fetched successfully.",
            user_agentlist_arr: usrAgentListArr
        });
    } catch (error) {
        console.error("Failed to fetch agents and owners list:", error);
        next(httpErrors.BadRequest("Failed to fetch agents and owners list"));
    }
};

const updateBuyerProfileByAdminController = async function (req, res, next) {
    const adminId = req.payload.aud; // Admin ID from JWT token
    const buyerId = req.params.buyerId; // Buyer ID from request params

    const { usrFullName, usrEmail, usrMobileNumber, usrProfileUrl, userBio } = req.body;

    try {
        // Fetch the admin's data and ensure they are authorized
        const adminUser = await UserAuthModel.findById(adminId);
        if (!adminUser || adminUser.usrType !== 'admin') {
            return next(httpErrors.Forbidden("Unauthorized access."));
        }

        // Fetch the buyer's data using buyerId
        const buyer = await UserAuthModel.findById(buyerId);
        if (!buyer) {
            return next(httpErrors.NotFound("Buyer not found."));
        }

        // Update buyer's details
        buyer.usrFullName = usrFullName;
        buyer.usrEmail = usrEmail;
        buyer.usrMobileNumber = usrMobileNumber;
        buyer.usrProfileUrl = usrProfileUrl;
        buyer.userBio = userBio;

        const updatedBuyer = await buyer.save();

        res.status(200).json({
            message: "Buyer profile updated successfully by admin.",
            buyer_details: {
                usrFullName: updatedBuyer.usrFullName,
                usrEmail: updatedBuyer.usrEmail,
                usrMobileNumber: updatedBuyer.usrMobileNumber,
                usrProfileUrl: updatedBuyer.usrProfileUrl,
                userBio: updatedBuyer.userBio,
            },
        });
    } catch (error) {
        next(httpErrors.InternalServerError("Error updating buyer profile."));
    }
};

const updateAgentProfileByAdminController = async function (req, res, next) {
    const adminId = req.payload.aud; // Admin ID from JWT token
    const agentId = req.params.agentId; // Agent ID from request params

    const { usrFullName, usrEmail, usrMobileNumber, usrProfileUrl, userBio } = req.body;

    try {
        // Verify the admin's identity
        const adminUser = await UserAuthModel.findById(adminId);
        if (!adminUser || adminUser.usrType !== 'admin') {
            return next(httpErrors.Forbidden("Unauthorized access."));
        }

        // Fetch the agent's data using agentId
        const agent = await UserAuthModel.findById(agentId);
        if (!agent) {
            return next(httpErrors.NotFound("Agent/Owner not found."));
        }

        // Update agent's details
        agent.usrFullName = usrFullName;
        agent.usrEmail = usrEmail;  // Email might not be editable in some cases
        agent.usrMobileNumber = usrMobileNumber;
        agent.usrProfileUrl = usrProfileUrl;
        agent.userBio = userBio;

        const updatedAgent = await agent.save();

        res.status(200).json({
            message: "Agent/Owner profile updated successfully by admin.",
            agent_details: {
                usrFullName: updatedAgent.usrFullName,
                usrEmail: updatedAgent.usrEmail,
                usrMobileNumber: updatedAgent.usrMobileNumber,
                usrProfileUrl: updatedAgent.usrProfileUrl,
                userBio: updatedAgent.userBio,
            },
        });
    } catch (error) {
        next(httpErrors.InternalServerError("Error updating agent/owner profile."));
    }
};

const showAgentDataController = async (req, res, next) => {
    var { agentId } = req.body;
    console.log(agentId);

    try {
        const fetchedAgentData = await UserAuthModel.findById(agentId);

        if (!fetchedAgentData) {
            return res.status(404).json({ message: "Agent/Owner not found." });
        }

        res.status(200).json({
            message: "Agent/Owner record fetched successfully.",
            user_agentdata_arr: fetchedAgentData
        });
    } catch (error) {
        console.error("Error fetching agent data:", error);
        next(httpErrors.BadRequest("Failed to fetch agent/owner data."));
    }
};

const toggleUserStatusAuthController = async (req, res, next) => {
    const userId = req.params.userId; // Get user ID from request parameters

    try {
        const user = await UserAuthModel.findById(userId);
        if (!user) {
            return next(httpErrors.NotFound("User not found."));
        }

        // Toggle the user's status
        user.usrStatus = !user.usrStatus; // Enable if disabled, disable if enabled
        await user.save();

        res.status(200).json({
            message: `User account ${user.usrStatus ? 'enabled' : 'disabled'} successfully.`,
            userStatus: user.usrStatus
        });
    } catch (error) {
        next(httpErrors.InternalServerError("Error toggling user status."));
    }
};

module.exports = { signupUserAuthController, signinUserAuthController, updateUserProfileAuthController,
    resetPasswordAuthController, refreshTokenUserAuthController, logoutUserAuthController,
    forgotPasswordAuthController, showBuyerListController, showAgentListController,
    showRecentBuyerstoAdminController, showRecentAgentstoAdminController,updateBuyerProfileByAdminController,
    updateAgentProfileByAdminController, showAgentDataController, toggleUserStatusAuthController };