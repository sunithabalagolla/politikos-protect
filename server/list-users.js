require('dotenv').config();
const { connectDB } = require('./config/db');
const Citizen = require('./models/Citizen');

const listUsers = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB\n');

    const citizens = await Citizen.find({}).select('name email role');
    
    if (citizens.length === 0) {
      console.log('No users found in the database.');
      console.log('Please register a user first through the frontend.');
    } else {
      console.log('Registered users:');
      console.log('================');
      citizens.forEach((citizen, index) => {
        console.log(`${index + 1}. ${citizen.name}`);
        console.log(`   Email: ${citizen.email}`);
        console.log(`   Role: ${citizen.role}`);
        console.log('');
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

listUsers();
