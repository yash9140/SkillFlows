const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/skillflow';

async function resetAdminPassword() {
  try {
    await mongoose.connect(MONGO_URI);
    
    // Find admin user
    let adminUser = await User.findOne({ email: 'admin@skillflow.com' });
    if (!adminUser) {
      console.log('Admin user not found. Creating new admin user...');
      adminUser = new User({
        name: 'Admin User',
        email: 'admin@skillflow.com',
        password: 'admin123',
        role: 'admin'
      });
    } else {
      // Delete existing admin and create new one to avoid password hashing issues
      await User.deleteOne({ email: 'admin@skillflow.com' });
      adminUser = new User({
        name: 'Admin User',
        email: 'admin@skillflow.com',
        password: 'admin123',
        role: 'admin'
      });
    }
    
    await adminUser.save();
    console.log('Admin user created/reset successfully!');
    console.log('Email: admin@skillflow.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error resetting admin password:', error);
  } finally {
    mongoose.connection.close();
  }
}

resetAdminPassword(); 