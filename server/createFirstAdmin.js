const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/skillflow';

async function createFirstAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@skillflow.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const adminUser = new Admin({
      name: 'Super Admin',
      email: 'admin@skillflow.com',
      password: 'admin123',
      role: 'admin'
    });

    await adminUser.save();
    console.log('✅ First admin user created successfully!');
    console.log('📧 Email: admin@skillflow.com');
    console.log('🔑 Password: admin123');
    console.log('🎯 Role: admin');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
}

createFirstAdmin(); 