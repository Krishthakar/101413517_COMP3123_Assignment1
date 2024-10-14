// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for user signup
router.post('/signup', userController.signup);

// Route for user login
router.post('/login', userController.login);

module.exports = router;
