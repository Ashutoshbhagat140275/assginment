import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Is_logged_In: { type: Boolean, default: false },
});

// Create the model
const User = mongoose.model('User', userSchema);

// Export the model
export default User;