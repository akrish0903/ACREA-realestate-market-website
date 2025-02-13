const express = require('express');
const httpErrors = require("http-errors");
const router = express.Router();
const UserAuthController = require("../controller/UserAuthController");
const upload = require("../config/multerStorage");
const { jwt_verify_token } = require('../utils/jwt_utils');
const cloudinary = require("../config/cloudinaryConfig")
const nodemailer = require("nodemailer");
const redis = require("redis"); // Store OTP temporarily
require("dotenv").config();

// Setup Redis client
const redisClient = redis.createClient();
redisClient.connect().catch(console.error);

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS, // App Password
  },
});

// User authentication routes
router.post("/signup", UserAuthController.signupUserAuthController);
router.post("/signin", UserAuthController.signinUserAuthController);

// Protected route to update user profile
router.post("/updateUserProfile", jwt_verify_token, UserAuthController.updateUserProfileAuthController);

router.post("/uploadProfileImage", upload.single("profileImage"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        res.json({ profileUrl: req.file.path }); // Cloudinary returns the file URL
    } catch (error) {
        res.status(500).json({ error: "Failed to upload image" });
    }
});

// New route to reset password (protected)
router.post("/resetPassword", jwt_verify_token, UserAuthController.resetPasswordAuthController);

// New route to forgot password
router.post("/forgot-password", UserAuthController.forgotPasswordAuthController);

// Route to refresh token
router.post("/refresh-token", UserAuthController.refreshTokenUserAuthController);

// Route to logout user
router.delete("/logout", UserAuthController.logoutUserAuthController);

// Route for admin to see list of buyers and agents
router.get("/buyerslist", jwt_verify_token, UserAuthController.showBuyerListController);
router.get("/agentslist", jwt_verify_token, UserAuthController.showAgentListController);

// Route to show recent buyers and agents to admin
router.get("/show-buyers-recent", jwt_verify_token, UserAuthController.showRecentBuyerstoAdminController);
router.get("/show-agents-recent", jwt_verify_token, UserAuthController.showRecentAgentstoAdminController);

// Route to update an buyer's profile by admin
router.put("/admin-updatebuyer/:buyerId", jwt_verify_token, UserAuthController.updateBuyerProfileByAdminController);

// Route to update an agent's profile by admin
router.put('/admin-updateagent/:agentId', jwt_verify_token, UserAuthController.updateAgentProfileByAdminController);

// Route to show agents details to admin in propertypage
router.post ("/show-agent-data", jwt_verify_token, UserAuthController.showAgentDataController);

// Route to Disable/Enable User By admin through AgentList/BuyerList
router.put('/toggle-user-status/:userId', jwt_verify_token, UserAuthController.toggleUserStatusAuthController);

// **1️⃣ Send OTP Route**
router.post("/send-otp", async (req, res) => {
    try {
      const { usrEmail } = req.body;
      if (!usrEmail) return res.status(400).json({ error: "Email is required" });
  
      const otp = Math.floor(100000 + Math.random() * 900000);
  
      // Ensure Redis client is connected before using it
      if (!redisClient.isReady) {
        return res.status(500).json({ error: "Redis client not connected" });
      }
  
      await redisClient.setEx(`otp:${usrEmail}`, 300, otp.toString());
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: usrEmail,
        subject: "Your OTP Code",
        text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
      };
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Mail error:", err);
          return res.status(500).json({ error: "Failed to send OTP" });
        }
        res.json({ success: true, message: "OTP sent!" });
      });
  
    } catch (error) {
      console.error("Send OTP Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

// **2️⃣ Verify OTP Route**
router.post("/verify-otp", async (req, res) => {
  try {
    const { usrEmail, otp } = req.body;
    if (!usrEmail || !otp) return res.status(400).json({ error: "Missing OTP or Email" });

    // Get OTP from Redis
    const storedOtp = await redisClient.get(`otp:${usrEmail}`);
    if (!storedOtp) return res.status(400).json({ error: "OTP expired or invalid" });

    if (storedOtp === otp) {
      await redisClient.del(`otp:${usrEmail}`); // Delete OTP after verification
      res.json({ success: true, message: "OTP Verified" });
    } else {
      res.status(400).json({ error: "Incorrect OTP" });
    }
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
