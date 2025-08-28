const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema (structure of the user document in MongoDB)
const userSchema = new Schema({
  username: {
    type: String,
    required: true,     // This field is mandatory
    unique: true,       // No two users can have the same username
    trim: true,         // Removes whitespace from both ends
    minlength: 3        // Username must be at least 3 characters long
  },
  email: {
    type: String,
    required: true,     // This field is mandatory
    unique: true,       // No two users can have the same email
    trim: true,
    lowercase: true,    // Converts email to lowercase
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'] // Email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6        // Password must be at least 6 characters long
  }
}, {
  timestamps: true      // Automatically adds 'createdAt' and 'updatedAt' fields
});

// Create a model from the schema and export it
const User = mongoose.model('User', userSchema);
module.exports = User;