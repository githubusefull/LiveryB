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
// POST: Create a new order
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
    driverInfo // Expecting an array of objects for driverInfo
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
    driverInfo, // Directly assign driverInfo from the request body
  });

  try {
    const savedOrder = await newOrder.save(); // Save the new order to the database
    res.status(201).json(savedOrder); // Send the created order as a JSON response
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/create/:id', async (req, res) => {
  const { id } = req.params; // Extract the ID from the URL
  try {
    const order = await NewOrder.findById(id); // Find order by ID
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' }); // If order not found, send a 404 response
    }
    res.json(order); // Send the order as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
});

router.put('/create/:id', async (req, res) => {
  const { id } = req.params; // Order ID
  const { driverId, name, mobile } = req.body; // Driver information

  if (!driverId || !name || !mobile) {
    return res.status(400).json({ message: 'Driver information is incomplete.' });
  }

  try {
    // Use $push to add a new driver to the driverInfo array
    const updatedOrder = await NewOrder.findByIdAndUpdate(
      id,
      {
        $push: {
          driverInfo: { driverId, name, mobile },
        },
      },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.status(200).json({ message: 'Driver added successfully.', data: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error updating driver info.', error: error.message });
  }
});

export default router;
