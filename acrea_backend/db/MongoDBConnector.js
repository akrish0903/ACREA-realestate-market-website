// /config/db.js

const mongoose = require("mongoose");

const MongoDBConnector = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://aakashthakur10:aakashthakur10*@acrea.mcdtx.mongodb.net/?retryWrites=true&w=majority&appName=acrea"
    );
    console.log("======> MongoDB connection successful");
  } catch (err) {
    console.error("======> MongoDB connection error:", err);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = MongoDBConnector;
