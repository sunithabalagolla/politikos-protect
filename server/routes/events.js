const express = require('express');
const router = express.Router();
const {
  createEvent,
  getUpcomingEvents,
  getEventById,
  registerForEvent,
  unregisterFromEvent
} = require('../controllers/eventController');
const { protect } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/admin');

// Public routes
router.get('/', getUpcomingEvents);
router.get('/:id', getEventById);

// Admin only routes
router.post('/', protect, requireAdmin, createEvent);

// Protected routes (require authentication)
router.post('/:id/register', protect, registerForEvent);
router.delete('/:id/register', protect, unregisterFromEvent);

module.exports = router;
