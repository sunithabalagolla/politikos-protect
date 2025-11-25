const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  updatePassword,
  updateInterests,
  updateLocation,
  getCitizenIssues
} = require('../controllers/citizenController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/:id', getProfile);
router.get('/:id/issues', getCitizenIssues);

// Protected routes (user can only update their own profile)
router.put('/:id', protect, updateProfile);
router.put('/:id/password', protect, updatePassword);
router.put('/:id/interests', protect, updateInterests);
router.put('/:id/location', protect, updateLocation);

module.exports = router;
