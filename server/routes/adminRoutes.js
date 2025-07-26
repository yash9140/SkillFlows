const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');

// POST /admin/register
router.post('/register', adminController.registerAdmin);

// POST /admin/login
router.post('/login', adminController.loginAdmin);

// GET /admin/me (protected)
router.get('/me', adminAuth, adminController.getCurrentAdmin);

module.exports = router; 