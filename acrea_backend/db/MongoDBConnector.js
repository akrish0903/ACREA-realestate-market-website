// /config/db.js

const mongoose = require("mongoose");

const MongoDBConnector = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_ATLAS_URI
    );
    console.log("======> MongoDB connection successful");
  } catch (err) {
    console.error("======> MongoDB connection error:", err);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = MongoDBConnector;
