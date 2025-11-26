/**
 * Test script to verify email validation is working correctly
 */

const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth/register';

const testCases = [
  {
    name: 'Invalid - gmai.com typo',
    email: 'test@gmai.com',
    shouldPass: false
  },
  {
    name: 'Valid - gmail.com',
    email: 'test@gmail.com',
    shouldPass: true
  },
  {
    name: 'Invalid - gma.com typo',
    email: 'test@gma.com',
    shouldPass: false
  },
  {
    name: 'Valid - yahoo.com',
    email: 'test@yahoo.com',
    shouldPass: true
  },
  {
    name: 'Invalid - single char TLD',
    email: 'test@example.c',
    shouldPass: false
  }
];

async function testEmailValidation() {
  console.log('\n🧪 Testing Email Validation\n');
  console.log('=' .repeat(60));
  
  for (const testCase of testCases) {
    try {
      const response = await axios.post(API_URL, {
        firstName: 'Test',
        lastName: 'User',
        name: 'Test User',
        email: testCase.email,
        password: 'TestPassword123',
        phoneNumber: '9876543210',
        state: 'Maharashtra',
        city: 'Mumbai'
      });
      
      if (testCase.shouldPass) {
        console.log(`✓ ${testCase.name}`);
        console.log(`  Email: ${testCase.email}`);
        console.log(`  Result: Accepted (as expected)`);
      } else {
        console.log(`✗ ${testCase.name}`);
        console.log(`  Email: ${testCase.email}`);
        console.log(`  Result: Accepted (SHOULD HAVE BEEN REJECTED!)`);
      }
    } catch (error) {
      if (!testCase.shouldPass) {
        console.log(`✓ ${testCase.name}`);
        console.log(`  Email: ${testCase.email}`);
        console.log(`  Result: Rejected (as expected)`);
        console.log(`  Error: ${error.response?.data?.error?.message || error.message}`);
      } else {
        console.log(`✗ ${testCase.name}`);
        console.log(`  Email: ${testCase.email}`);
        console.log(`  Result: Rejected (SHOULD HAVE BEEN ACCEPTED!)`);
        console.log(`  Error: ${error.response?.data?.error?.message || error.message}`);
      }
    }
    console.log('');
  }
  
  console.log('=' .repeat(60));
  console.log('\n✓ Email validation test complete!\n');
}

// Check if server is running
console.log('⚠️  Make sure the server is running on http://localhost:5000');
console.log('   Run: cd server && npm start\n');

testEmailValidation().catch(error => {
  console.error('Test failed:', error.message);
  process.exit(1);
});
