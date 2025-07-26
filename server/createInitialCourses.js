const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://yashdhanraj9140:BOnHEMWDni2z7Xux@cluster0.ntzrtx3.mongodb.net/';

const initialCourses = [
  {
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of machine learning algorithms and techniques",
    thumbnail: "https://via.placeholder.com/300x200/28a745/ffffff?text=ML+Intro",
    instructor: "Dr. Sarah Johnson",
    category: "Machine Learning",
    batchName: "ML Batch 2024",
    videos: [
      {
        title: "What is Machine Learning?",
        description: "Introduction to the concept of machine learning",
        videoUrl: "https://example.com/video1.mp4",
        duration: 15,
        order: 1
      },
      {
        title: "Types of Machine Learning",
        description: "Supervised, unsupervised, and reinforcement learning",
        videoUrl: "https://example.com/video2.mp4",
        duration: 20,
        order: 2
      }
    ]
  },
  {
    title: "Advanced Machine Learning Algorithms",
    description: "Deep dive into advanced ML algorithms and their applications",
    thumbnail: "https://via.placeholder.com/300x200/17a2b8/ffffff?text=Advanced+ML",
    instructor: "Prof. Michael Chen",
    category: "Machine Learning",
    batchName: "AML Batch 2024",
    videos: [
      {
        title: "Neural Networks Fundamentals",
        description: "Understanding neural network architecture",
        videoUrl: "https://example.com/video3.mp4",
        duration: 25,
        order: 1
      },
      {
        title: "Deep Learning Applications",
        description: "Real-world applications of deep learning",
        videoUrl: "https://example.com/video4.mp4",
        duration: 30,
        order: 2
      }
    ]
  },
  {
    title: "Deep Learning Fundamentals",
    description: "Master the concepts of deep learning and neural networks",
    thumbnail: "https://via.placeholder.com/300x200/ffc107/000000?text=Deep+Learning",
    instructor: "Alex Rodriguez",
    category: "Machine Learning",
    batchName: "DL Batch 2024",
    videos: [
      {
        title: "Introduction to Deep Learning",
        description: "Basics of deep learning and neural networks",
        videoUrl: "https://example.com/video5.mp4",
        duration: 18,
        order: 1
      },
      {
        title: "Convolutional Neural Networks",
        description: "Understanding CNN architecture",
        videoUrl: "https://example.com/video6.mp4",
        duration: 22,
        order: 2
      }
    ]
  }
];

async function createInitialCourses() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Insert new courses
    const courses = await Course.insertMany(initialCourses);
    console.log(`Created ${courses.length} courses:`);
    
    courses.forEach(course => {
      console.log(`- ${course.title} (${course.category})`);
    });

    console.log('Initial courses created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating courses:', error);
    process.exit(1);
  }
}

createInitialCourses(); 