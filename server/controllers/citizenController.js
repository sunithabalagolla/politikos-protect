const Citizen = require('../models/Citizen');
const CivicIssue = require('../models/CivicIssue');

/**
 * Get citizen profile
 * GET /api/citizens/:id
 */
const getProfile = async (req, res, next) => {
  try {
    const citizen = await Citizen.findById(req.params.id);

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

/**
 * Update citizen profile
 * PUT /api/citizens/:id
 */
const updateProfile = async (req, res, next) => {
  try {
    // Check if user is updating their own profile
    if (req.user.userId !== req.params.id) {
      return res.status(403).json({
        success: false,
        error: {
          message: 'You can only update your own profile',
          code: 'FORBIDDEN'
        }
      });
    }

    const { name, email } = req.body;
    const citizen = await Citizen.findById(req.params.id);

    if (!citizen) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Citizen not found',
          code: 'NOT_FOUND'
        }
      });
    }

    // Check if email is being changed and if it's already in use
    if (email && email !== citizen.email) {
      const existingCitizen = await Citizen.findOne({ email });
      if (existingCitizen) {
        return res.status(409).json({
          success: false,
          error: {
            message: 'Email already in use',
            code: 'EMAIL_IN_USE'
          }
        });
      }
      citizen.email = email;
    }

    // Update name if provided
    if (name) {
      citizen.name = name;
    }

    await citizen.save();

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

/**
 * Update citizen password
 * PUT /api/citizens/:id/password
 */
const updatePassword = async (req, res, next) => {
  try {
    // Check if user is updating their own password
    if (req.user.userId !== req.params.id) {
      return res.status(403).json({
        success: false,
        error: {
          message: 'You can only update your own password',
          code: 'FORBIDDEN'
        }
      });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Please provide current password and new password',
          code: 'MISSING_FIELDS'
        }
      });
    }

    // Get citizen with password field
    const citizen = await Citizen.findById(req.params.id).select('+password');

    if (!citizen) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Citizen not found',
          code: 'NOT_FOUND'
        }
      });
    }

    // Verify current password
    const isPasswordValid = await citizen.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Current password is incorrect',
          code: 'INVALID_PASSWORD'
        }
      });
    }

    // Update password
    citizen.password = newPassword;
    await citizen.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update citizen interests
 * PUT /api/citizens/:id/interests
 */
const updateInterests = async (req, res, next) => {
  try {
    // Check if user is updating their own interests
    if (req.user.userId !== req.params.id) {
      return res.status(403).json({
        success: false,
        error: {
          message: 'You can only update your own interests',
          code: 'FORBIDDEN'
        }
      });
    }

    const { interests } = req.body;

    if (!Array.isArray(interests)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Interests must be an array',
          code: 'INVALID_FORMAT'
        }
      });
    }

    const citizen = await Citizen.findById(req.params.id);

    if (!citizen) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Citizen not found',
          code: 'NOT_FOUND'
        }
      });
    }

    // Replace interests (not append)
    citizen.interests = interests;
    await citizen.save();

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

/**
 * Update citizen location
 * PUT /api/citizens/:id/location
 */
const updateLocation = async (req, res, next) => {
  try {
    // Check if user is updating their own location
    if (req.user.userId !== req.params.id) {
      return res.status(403).json({
        success: false,
        error: {
          message: 'You can only update your own location',
          code: 'FORBIDDEN'
        }
      });
    }

    const { location } = req.body;

    if (!location) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Please provide location data',
          code: 'MISSING_LOCATION'
        }
      });
    }

    const citizen = await Citizen.findById(req.params.id);

    if (!citizen) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Citizen not found',
          code: 'NOT_FOUND'
        }
      });
    }

    // Update location
    citizen.location = location;
    await citizen.save();

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

/**
 * Get citizen's submitted issues
 * GET /api/citizens/:id/issues
 */
const getCitizenIssues = async (req, res, next) => {
  try {
    const issues = await CivicIssue.find({ submittedBy: req.params.id })
      .sort({ createdAt: -1 })
      .populate('submittedBy', 'name email');

    res.status(200).json({
      success: true,
      data: {
        issues,
        count: issues.length
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updatePassword,
  updateInterests,
  updateLocation,
  getCitizenIssues
};
