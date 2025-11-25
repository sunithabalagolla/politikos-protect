require('dotenv').config();
const mongoose = require('mongoose');
const Citizen = require('./models/Citizen');

async function makeAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find user by email
    const email = process.argv[2];
    if (!email) {
      console.error('Please provide an email: node make-admin.js user@example.com');
      process.exit(1);
    }

    const citizen = await Citizen.findOne({ email });
    
    if (!citizen) {
      console.error(`Citizen with email ${email} not found`);
      process.exit(1);
    }

    // Update role to admin
    citizen.role = 'admin';
    await citizen.save();

    console.log(`✅ ${citizen.name} (${citizen.email}) is now an admin!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

makeAdmin();
