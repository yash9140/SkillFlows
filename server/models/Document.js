
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  originalname: String,
  filename: String,
  uploadedBy: String, // or ObjectId if you have users
  uploadedAt: { type: Date, default: Date.now },
  // Add more fields as needed
});

module.exports = mongoose.model('Document', documentSchema);