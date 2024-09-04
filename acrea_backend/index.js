const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());


console.log("This is in backend")