require('dotenv').config();
const { connectDB, testConnection, getConnectionStatus } = require('./config/db');

/**
 * Test script to verify MongoDB connection
 * Run with: node test-db-connection.js
 */
async function testDatabaseConnection() {
  console.log('Testing MongoDB connection...\n');
  
  try {
    // Attempt to connect
    console.log('1. Connecting to MongoDB...');
    await connectDB();
    
    // Check connection status
    console.log('\n2. Checking connection status...');
    const status = getConnectionStatus();
    console.log('Connection Status:', status);
    
    // Test connectivity
    console.log('\n3. Testing database connectivity...');
    const healthCheck = await testConnection();
    console.log('Health Check:', healthCheck);
    
    if (healthCheck.success) {
      console.log('\n✅ Database connection test PASSED');
      console.log('MongoDB is properly configured and accessible');
    } else {
      console.log('\n❌ Database connection test FAILED');
      console.log('Issue:', healthCheck.message);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database connection test FAILED');
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the test
testDatabaseConnection();
