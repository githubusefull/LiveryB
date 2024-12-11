import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  mobile: {
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
  },
  status: {
    type: String,
  },
  driverInfo:
  
  [
    {
      driverId: { type: String },
      name: { type: String },
      mobile: { type: String },
      location: {
        latitude: Number,
        longitude: Number,
      },
      _id : false,

    },
  ]

});

const NewOrder = mongoose.model('NewOrder', userSchema);

export default NewOrder;
