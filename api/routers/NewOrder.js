import express from 'express';
import NewOrder from '../models/NewOrder.js'; // Ensure .js extension for ES module compatibility

const router = express.Router();

// Fetch all orders
router.get('/create', async (req, res) => {
  try {
    const orders = await NewOrder.find(); // Retrieve all orders
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new order
router.post('/create', async (req, res) => {
  const { 
    userId, 
    mobile, 
    address, 
    quantity, 
    boxType, 
    From, 
    To, 
    status, 
    driverInfo 
  } = req.body;

  const newOrder = new NewOrder({
    userId,
    mobile,
    address,
    quantity,
    boxType,
    From,
    To,
    status,
    driverInfo,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Fetch a single order by ID
router.get('/create/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const order = await NewOrder.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update driver info
router.put('/create/:id', async (req, res) => {
  const { id } = req.params;
  const { driverId, name, mobile, location } = req.body;

  if (!driverId || !name || !mobile || !location) {
    return res.status(400).json({ message: 'Driver information is incomplete.' });
  }

  try {
    const updatedOrder = await NewOrder.findByIdAndUpdate(
      id,
      { 
        $set: { driverInfo: { driverId, name, mobile, location } },
      },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.status(200).json({ message: 'Driver added successfully.', data: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error updating driver info.', error: error.message });
  }
});

// Update order status
router.put('/status/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'New status is required.' });
  }

  try {
    const updatedOrder = await NewOrder.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.status(200).json({ message: 'Order status updated successfully.', data: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status.', error: error.message });
  }
});

export default router;
