const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Snippet schema (structure of the snippet document in MongoDB)
const snippetSchema = new Schema({
  title: {
    type: String,
    required: true,     // This field is mandatory
    trim: true,
    maxlength: 100      // Title can be up to 100 characters
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500      // Description can be up to 500 characters
  },
  code: {
    type: String,
    required: true,     // This field is mandatory (the actual code snippet)
  },
  language: {
    type: String,
    trim: true,
    default: 'javascript' // Default language if none specified
  },
  tags: [{
    type: String,
    trim: true
  }],
  user: {
    type: Schema.Types.ObjectId, // This will store the User's ID
    required: true,
    ref: 'User' // This links to the User model (like a foreign key)
  },
  // ADD THIS NEW FIELD FOR FAVORITES:
  isFavorite: {
    type: Boolean,
    default: false      // Default to not favorited
  }
}, {
  timestamps: true      // Automatically adds 'createdAt' and 'updatedAt' fields
});

// Create a model from the schema and export it
const Snippet = mongoose.model('Snippet', snippetSchema);
module.exports = Snippet;