import mongoose from 'mongoose';

// Define a schema for the User model
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  
  mobile: {
    type: String,
  },
  role: {
    type: String,
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    }
  }
});





const User = mongoose.model('User', userSchema);

export default User;

