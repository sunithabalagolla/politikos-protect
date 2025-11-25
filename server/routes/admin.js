const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllCitizens,
  updateCitizenRole,
  getRecentActivity
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/admin');

// All admin routes require authentication and admin role
router.use(protect, requireAdmin);

// Dashboard statistics
router.get('/dashboard', getDashboardStats);
router.get('/recent-activity', getRecentActivity);

// Citizen management
router.get('/citizens', getAllCitizens);
router.put('/citizens/:id/role', updateCitizenRole);

module.exports = router;
