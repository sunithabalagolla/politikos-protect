const { verifyToken } = require('../utils/tokenUtils');
const Citizen = require('../models/Citizen');

/**
 * Middleware to protect routes - requires valid JWT token
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Not authorized to access this route',
          code: 'NO_TOKEN'
        }
      });
    }

    try {
      // Verify token
      const decoded = verifyToken(token);
      
      // Attach user info to request
      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role
      };

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid or expired token',
          code: 'INVALID_TOKEN'
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to check if user owns the resource
 * Used for profile updates, etc.
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          message: 'Not authorized to perform this action',
          code: 'FORBIDDEN'
        }
      });
    }
    next();
  };
};

module.exports = {
  protect,
  authorize
};
