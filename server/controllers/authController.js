const Citizen = require('../models/Citizen');
const { generateToken } = require('../utils/tokenUtils');

/**
 * Register a new citizen
 * POST /api/auth/register
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Please provide name, email, and password',
          code: 'MISSING_FIELDS'
        }
      });
    }

    // Check if citizen already exists
    const existingCitizen = await Citizen.findOne({ email });
    if (existingCitizen) {
      return res.status(409).json({
        success: false,
        error: {
          message: 'Email already registered',
          code: 'DUPLICATE_EMAIL'
        }
      });
    }

    // Create new citizen
    const citizen = await Citizen.create({
      name,
      email,
      password
    });

    // Generate token
    const token = generateToken(citizen);

    res.status(201).json({
      success: true,
      data: {
        citizen: citizen.toPublicJSON(),
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login a citizen
 * POST /api/auth/login
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Please provide email and password',
          code: 'MISSING_CREDENTIALS'
        }
      });
    }

    // Find citizen and include password field
    const citizen = await Citizen.findOne({ email }).select('+password');
    
    if (!citizen) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid credentials',
          code: 'INVALID_CREDENTIALS'
        }
      });
    }

    // Check password
    const isPasswordValid = await citizen.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid credentials',
          code: 'INVALID_CREDENTIALS'
        }
      });
    }

    // Generate token
    const token = generateToken(citizen);

    res.status(200).json({
      success: true,
      data: {
        citizen: citizen.toPublicJSON(),
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current logged-in citizen
 * GET /api/auth/me
 */
const getMe = async (req, res, next) => {
  try {
    // req.user is set by auth middleware
    const citizen = await Citizen.findById(req.user.userId);
    
    if (!citizen) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Citizen not found',
          code: 'NOT_FOUND'
        }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        citizen: citizen.toPublicJSON()
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe
};
