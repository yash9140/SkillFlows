const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  duration: { type: Number, required: true },
  order: { type: Number, required: true }
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  thumbnail: { type: String },
  instructor: { type: String, required: true },
  category: { type: String, required: true },
  batchName: { type: String },
  videos: [VideoSchema]
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema); 