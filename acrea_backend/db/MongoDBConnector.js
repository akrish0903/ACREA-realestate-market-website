// /config/db.js

const mongoose = require("mongoose");

const MongoDBConnector = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_ATLAS_URI
    );
    console.log("======> MongoDB connection successful");
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Available collections:", collections.map(c => c.name));
  } catch (err) {
    console.error("======> MongoDB connection error:", err);
    process.exit(1); // Exit process if connection fails
  }
};

mongoose.connection.on("connected",()=>{
  console.log("Connect db event success")
})
mongoose.connection.on("error",(err)=>{
  console.log("Connect db event fail - ",err)
})
mongoose.connection.on("disconnected",()=>{
  console.log("Connect db event disconnected")
})
process.on("SIGINT",async ()=>{
  await mongoose.connection.close();
  process.exit(0)
})
module.exports = MongoDBConnector;
