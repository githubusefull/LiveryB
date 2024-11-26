const express = require('express');
const User = require('../models/Users'); // Import the User model
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { fullname, email, password, mobile, role } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create a new user
  const newUser = new User({ fullname, email, password, mobile, role });

  try {
    // Save the user to the database
    const savedUser = await newUser.save();
    res.status(201).json({
      id: savedUser._id,
      fullname: savedUser.fullname,
      email: savedUser.email,
      mobile: savedUser.mobile,
      role: savedUser.role,

    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login the user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Compare passwords
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });

  res.json({ token });
});

module.exports = router;
