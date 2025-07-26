const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth');

// POST /auth/register
router.post('/register', authController.register);

// POST /auth/login
router.post('/login', authController.login);

// GET /auth/me (protected)
router.get('/me', auth, authController.getCurrentUser);

module.exports = router; 