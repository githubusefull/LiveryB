const mongoose = require('mongoose');

// Define a schema with the specified fields
const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  boxType: {
    type: String,
    enum: ['Small', 'Medium', 'Large'], // You can adjust these values as needed
    default: 'Small',
  },
  From: {
    type: String,
    required: true,
  },
  To: {
    type: String,
    required: true,
  }
});

const NewOrder = mongoose.model('NewOrder', userSchema);

module.exports = NewOrder;
