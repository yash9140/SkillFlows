const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const { auth, adminAuth } = require('../middleware/auth');

// GET /enrollments - Get user's enrolled courses
router.get('/', auth, enrollmentController.getUserEnrollments);

// POST /enrollments - Enroll in a course
router.post('/', auth, enrollmentController.enrollInCourse);

// PUT /enrollments/progress - Update course progress
router.put('/progress', auth, enrollmentController.updateProgress);

// GET /enrollments/available - Get available courses
router.get('/available', auth, enrollmentController.getAvailableCourses);

// GET /enrollments/progress - Get course progress
router.get('/progress', auth, enrollmentController.getCourseProgress);

module.exports = router; 