// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the MongoDB connection function

// Initialize the Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB(); // Ensure this function uses process.env.MONGO_URI

// Routes
const userRoutes = require('./routes/userRoutes'); // Import user routes
const employeeRoutes = require('./routes/employeeRoutes'); // Import employee routes

// Use the routes in the app
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
