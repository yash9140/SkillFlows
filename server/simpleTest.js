const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/skillflow';

async function simpleTest() {
  try {
    await mongoose.connect(MONGO_URI);
    
    // Find admin user
    const user = await User.findOne({ email: 'admin@skillflow.com' });
    if (!user) {
      console.log('❌ User not found');
      return;
    }
    
    console.log('✅ User found:', user.email);
    console.log('Role:', user.role);
    
    // Test password directly
    const password = 'admin123';
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    
    if (isMatch) {
      console.log('✅ Login should work!');
    } else {
      console.log('❌ Password does not match');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

simpleTest(); 