import express from 'express';
import NewOrder from '../models/NewOrder.js'; // Add the .js extension for ES module compatibility

const router = express.Router();

// GET: Retrieve all orders
router.get('/create', async (req, res) => {
  try {
    const orders = await NewOrder.find(); // Retrieve all orders from the database
    res.json(orders); // Send orders as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Create a new order
router.post('/create', async (req, res) => {
  const { phoneNumber, address, quantity, boxType, From, To, status, driverName } = req.body;

  const newOrder = new NewOrder({
    phoneNumber,
    address,
    quantity,
    boxType,
    From,
    To,
    status,
    driverName
  });

  try {
    const savedOrder = await newOrder.save(); // Save the new order to the database
    res.status(201).json(savedOrder); // Send the created order as a JSON response
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
