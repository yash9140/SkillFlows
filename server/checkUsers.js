const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/skillflow';

async function checkUsers() {
  try {
    await mongoose.connect(MONGO_URI);
    
    // Find all users
    const users = await User.find({});
    console.log(`Found ${users.length} users in database:`);
    
    users.forEach((user, index) => {
      console.log(`\nUser ${index + 1}:`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Role: ${user.role}`);
      console.log(`  Password hash: ${user.password.substring(0, 20)}...`);
      console.log(`  Created: ${user.createdAt}`);
    });
    
    // Test password for admin user
    const adminUser = await User.findOne({ email: 'admin@skillflow.com' });
    if (adminUser) {
      console.log('\n--- Testing admin password ---');
      const isMatch = await adminUser.comparePassword('admin123');
      console.log(`Password match for admin: ${isMatch}`);
    }
    
  } catch (error) {
    console.error('Error checking users:', error);
  } finally {
    mongoose.connection.close();
  }
}

checkUsers(); 