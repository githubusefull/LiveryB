const express = require('express');
const NewOrder = require('../models/NewOrder'); // Import the User model
const router = express.Router();

// GET: Retrieve all users
router.get('/create', async (req, res) => {
  try {
    const users = await NewOrder.find(); // Retrieve all users from the database
    res.json(users); // Send users as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Create a new user
router.post('/create', async (req, res) => {
  const { phoneNumber, address, quantity, boxType, From, To } = req.body;

 

  const newUser = new NewOrder({
    phoneNumber,
    address,
    quantity,
    boxType,
    From,
    To
  });

  try {
    const savedUser = await newUser.save(); // Save the new user to the database
    res.status(201).json(savedUser); // Send the created user as a JSON response
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
