const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Get user's enrolled courses
exports.getUserEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate('course')
      .sort({ lastAccessed: -1 });

    const enrolledCourses = enrollments.map(enrollment => ({
      id: enrollment.course._id,
      title: enrollment.course.title,
      batchName: enrollment.course.batchName,
      thumbnail: enrollment.course.thumbnail,
      progress: enrollment.progress,
      instructor: enrollment.course.instructor,
      category: enrollment.course.category,
      enrolledAt: enrollment.enrolledAt,
      lastAccessed: enrollment.lastAccessed,
      completed: enrollment.completed
    }));

    res.json(enrolledCourses);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
};

// Enroll user in a course
exports.enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }

    // Create enrollment
    const enrollment = new Enrollment({
      user: userId,
      course: courseId,
      progress: 0
    });

    await enrollment.save();

    res.status(201).json({ 
      message: 'Successfully enrolled in course',
      enrollment: {
        id: enrollment._id,
        courseId: enrollment.course,
        progress: enrollment.progress,
        enrolledAt: enrollment.enrolledAt
      }
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ error: 'Failed to enroll in course' });
  }
};

// Update course progress
exports.updateProgress = async (req, res) => {
  try {
    const { courseId, progress, completedVideos } = req.body;
    const userId = req.user._id;

    const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    enrollment.progress = Math.min(100, Math.max(0, progress));
    enrollment.lastAccessed = new Date();
    enrollment.completed = progress >= 100;
    
    // Store completed videos if provided
    if (completedVideos) {
      enrollment.completedVideos = completedVideos;
    }

    await enrollment.save();

    res.json({ 
      message: 'Progress updated successfully',
      progress: enrollment.progress,
      completed: enrollment.completed,
      completedVideos: enrollment.completedVideos || []
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
};

// Get available courses (not enrolled)
exports.getAvailableCourses = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user's enrolled course IDs
    const enrollments = await Enrollment.find({ user: userId });
    const enrolledCourseIds = enrollments.map(e => e.course);

    // Get courses not enrolled in
    const availableCourses = await Course.find({
      _id: { $nin: enrolledCourseIds }
    }).sort({ createdAt: -1 });

    res.json(availableCourses);
  } catch (error) {
    console.error('Error fetching available courses:', error);
    res.status(500).json({ error: 'Failed to fetch available courses' });
  }
};

// Get user's progress for a specific course
exports.getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.query;
    const userId = req.user._id;

    const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.json({
      progress: enrollment.progress,
      completed: enrollment.completed,
      completedVideos: enrollment.completedVideos || []
    });
  } catch (error) {
    console.error('Error fetching course progress:', error);
    res.status(500).json({ error: 'Failed to fetch course progress' });
  }
}; 