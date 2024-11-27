const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Auth = require('./api/routers/Auth'); // Import the user routes
const Order = require('./api/routers/NewOrder'); // Import the user routes
const connectToDatabase = require('./db');

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(bodyParser.json()); // Middleware to parse incoming JSON requests



// Use the userRouter for the '/users' endpoint
app.use('/auth', Auth);
app.use('/order', Order);

// Start the server



module.exports = async (req, res) => {
  await connectToDatabase();
  app(req, res); // Use express to handle the request
};