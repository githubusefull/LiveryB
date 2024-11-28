import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Auth from './api/routers/Auth.js'; // Ensure the file extension is included
import Order from './api/routers/NewOrder.js'; // Ensure the file extension is included

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000; // Use the port from .env or default to 3000

// Middleware
app.use(bodyParser.json()); // Middleware to parse incoming JSON requests

// Connect to MongoDB using the URL from .env
const mongodbUri = process.env.MONGODB_URI;
if (!mongodbUri) {
  console.error('MongoDB URI not found in .env file');
  process.exit(1); // Exit if the URI is missing
}

mongoose
  .connect(mongodbUri, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Use the userRouter for the '/auth' and '/order' endpoints
app.use('/auth', Auth);
app.use('/order', Order);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
