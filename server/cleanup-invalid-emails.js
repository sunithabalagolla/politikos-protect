/**
 * Script to find and remove users with invalid email addresses
 * Run this once to clean up existing bad data
 */

const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✓ Connected to MongoDB'))
  .catch(err => {
    console.error('✗ MongoDB connection error:', err);
    process.exit(1);
  });

// Define the Citizen schema (minimal version for cleanup)
const citizenSchema = new mongoose.Schema({
  email: String,
  name: String,
  firstName: String,
  lastName: String
});

const Citizen = mongoose.model('Citizen', citizenSchema);

// Email validation function (same as in formatters.js)
const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) {
    return false;
  }
  
  // Check for common typos in popular email domains
  const commonTypos = [
    'gmai.com', 'gmial.com', 'gamil.com', 'gmil.com', // gmail typos
    'gma.com', // another gmail typo
    'yahooo.com', 'yaho.com', 'yhoo.com', // yahoo typos
    'outlok.com', 'outloo.com', 'hotmial.com', // outlook/hotmail typos
    'iclou.com', 'icloud.co' // icloud typos
  ];
  
  const domain = email.split('@')[1]?.toLowerCase();
  
  if (commonTypos.includes(domain)) {
    return false;
  }
  
  return true;
};

async function cleanupInvalidEmails() {
  try {
    console.log('\n🔍 Searching for users with invalid email addresses...\n');
    
    // Get all users
    const allUsers = await Citizen.find({});
    console.log(`Found ${allUsers.length} total users in database`);
    
    // Find invalid emails
    const invalidUsers = allUsers.filter(user => !isValidEmail(user.email));
    
    if (invalidUsers.length === 0) {
      console.log('\n✓ No invalid email addresses found. Database is clean!');
      process.exit(0);
    }
    
    console.log(`\n⚠️  Found ${invalidUsers.length} user(s) with invalid email addresses:\n`);
    
    invalidUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name || 'Unknown'} (${user.email})`);
      console.log(`   ID: ${user._id}`);
      console.log('');
    });
    
    // Delete invalid users
    console.log('🗑️  Removing invalid users...\n');
    
    const deletePromises = invalidUsers.map(user => 
      Citizen.deleteOne({ _id: user._id })
    );
    
    await Promise.all(deletePromises);
    
    console.log(`✓ Successfully removed ${invalidUsers.length} user(s) with invalid emails`);
    console.log('\n✓ Database cleanup complete!');
    
    process.exit(0);
  } catch (error) {
    console.error('✗ Error during cleanup:', error);
    process.exit(1);
  }
}

// Run the cleanup
cleanupInvalidEmails();
