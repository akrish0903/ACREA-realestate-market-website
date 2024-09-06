// Load environment variables
require('dotenv').config();

const http = require("http")
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');

const authRoutes = require("./Routes/authUser");
const MongoDBConnector = require("./db/MongoDBConnector");

const app = express();

// connection to mongo db 
MongoDBConnector()

// cors setting 
// Enable CORS for all routes
app.use(cors());

// Or specify the frontend origin (for more security)
app.use(cors({
    origin: 'http://localhost:5174' // Replace with the URL where your React app is running
}));

// Middleware to parse JSON bodies
app.use(express.json());


// main server 
app.use(authRoutes);

// listener
http.createServer(app).listen(4500, () => {
    console.log("---------------------------Server is running---------------------------------------")
})
