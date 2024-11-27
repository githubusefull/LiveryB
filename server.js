const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Auth = require('./api/routers/Auth'); // Import the user routes
const Order = require('./api/routers/NewOrder'); // Import the user routes
const serverless = require('serverless-http'); // Import serverless-http

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000; // Use the port from .env or default to 3000

// Middleware
app.use(bodyParser.json()); // Middleware to parse incoming JSON requests

// Connect to MongoDB using the URL from .env
const mongodbUri = process.env.MONGODB_URI;
if (!mongodbUri) {
  console.log('MongoDB URI not found in .env file');
  process.exit(1); // Exit if the URI is missing
}

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Error connecting to MongoDB:', err);
});

// Use the userRouter for the '/users' endpoint
app.use('/auth', Auth);
app.use('/order', Order);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


module.exports = serverless(app);
