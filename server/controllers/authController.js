const Citizen = require('../models/Citizen');
const { generateToken } = require('../utils/tokenUtils');

/**
 * Register a new citizen
 * POST /api/auth/register
 */
const register = async (req, res, next) => {
  try {
    const { 
      name, 
      firstName, 
      lastName, 
      email, 
      password, 
      phoneNumber, 
      state, 
      city, 
      gender 
    } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Please provide email and password',
          code: 'MISSING_FIELDS'
        }
      });
    }

    // Validate email format - MUST come before duplicate check
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Please provide a valid email address',
          code: 'INVALID_EMAIL_FORMAT'
        }
      });
    }

    // Check for common email typos
    const commonTypos = [
      'gmai.com', 'gmial.com', 'gamil.com', 'gmil.com', 'gma.com', // gmail typos
      'yahooo.com', 'yaho.com', 'yhoo.com', // yahoo typos
      'outlok.com', 'outloo.com', 'hotmial.com', // outlook/hotmail typos
      'iclou.com', 'icloud.co' // icloud typos
    ];
    const domain = email.split('@')[1]?.toLowerCase();
    if (commonTypos.includes(domain)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Please provide a valid email address',
          code: 'INVALID_EMAIL_FORMAT'
        }
      });
    }

    // Validate name (either full name or first+last name)
    if (!name && (!firstName || !lastName)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Please provide your name',
          code: 'MISSING_NAME'
        }
      });
    }

    // Check password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Password must be at least 8 characters',
          code: 'INVALID_PASSWORD'
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

    // Prepare citizen data
    const citizenData = {
      name: name || `${firstName} ${lastName}`,
      email,
      password
    };

    // Add optional fields if provided
    if (firstName) citizenData.firstName = firstName;
    if (lastName) citizenData.lastName = lastName;
    if (phoneNumber) citizenData.phoneNumber = phoneNumber;
    if (gender) citizenData.gender = gender;
    
    // Add location data
    if (state || city) {
      citizenData.location = {};
      if (state) citizenData.location.state = state;
      if (city) citizenData.location.city = city;
    }

    // Create new citizen
    const citizen = await Citizen.create(citizenData);

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
