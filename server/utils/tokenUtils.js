const jwt = require('jsonwebtoken');

/**
 * Generate JWT token for a citizen
 * @param {Object} citizen - Citizen object
 * @returns {String} JWT token
 */
const generateToken = (citizen) => {
  const payload = {
    userId: citizen._id,
    email: citizen.email,
    role: citizen.role
  };

  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '24h' }
  );
};

/**
 * Verify JWT token
 * @param {String} token - JWT token
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = {
  generateToken,
  verifyToken
};
