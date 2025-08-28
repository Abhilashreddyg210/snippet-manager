const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

  // Routes
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

// Snippet Routes
const snippetsRouter = require('./routes/snippets');
app.use('/api/snippets', snippetsRouter);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Code Snippet Manager API!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});