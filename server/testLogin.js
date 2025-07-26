const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/skillflow';

async function testLogin() {
  try {
    await mongoose.connect(MONGO_URI);
    
    // Find admin user
    const adminUser = await User.findOne({ email: 'admin@skillflow.com' });
    if (!adminUser) {
      console.log('Admin user not found!');
      return;
    }
    
    console.log('Admin user found:', adminUser.email);
    console.log('Role:', adminUser.role);
    
    // Test password comparison
    const isMatch = await adminUser.comparePassword('admin123');
    console.log('Password match:', isMatch);
    
    if (isMatch) {
      console.log('✅ Login should work!');
    } else {
      console.log('❌ Password does not match!');
    }
    
  } catch (error) {
    console.error('Error testing login:', error);
  } finally {
    mongoose.connection.close();
  }
}

testLogin(); 