import express from 'express';
import User from '../models/Users.js'; // Ensure the schema has a password hashing middleware
import jwt from 'jsonwebtoken';
//import bcrypt from 'bcryptjs';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { fullname, email, password, address, mobile, role, location } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    //const salt = await bcrypt.genSalt(10);
    //const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      fullname,
      email,
      password,
      address,
      mobile,
      role,
      location
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate JWT
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email, role: savedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve all users
router.get('/register', async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users from the database
    res.json(users); // Send users as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login the user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email' });
    }

    const isMatch = password === user.password;

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Update user's location
router.post('/location', async (req, res) => {
  const { userId, location } = req.body;

  try {
    // Validate input
    if (!userId || !location) {
      return res.status(400).json({ message: 'User ID and location are required' });
    }

    // Find the user and update the location
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { location },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Location updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Error updating location:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export default router;
