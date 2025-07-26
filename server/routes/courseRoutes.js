const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const adminAuth = require('../middleware/adminAuth');

// GET /courses
router.get('/', courseController.getCourses);

// GET /courses/:id
router.get('/:id', courseController.getCourseById);

// POST /courses (admin only)
router.post('/', adminAuth, courseController.createCourse);

// PUT /courses/:id (admin only)
router.put('/:id', adminAuth, courseController.updateCourse);

// DELETE /courses/:id (admin only)
router.delete('/:id', adminAuth, courseController.deleteCourse);

module.exports = router; 