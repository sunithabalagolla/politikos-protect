const express = require('express');
const router = express.Router();
const {
  createSurvey,
  getActiveSurveys,
  getSurveyById,
  submitResponse,
  getSurveyResults,
  closeSurvey
} = require('../controllers/surveyController');
const { protect } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/admin');

// Public routes
router.get('/', getActiveSurveys);
router.get('/:id', getSurveyById);

// Protected routes (require authentication)
router.post('/:id/responses', protect, submitResponse);

// Admin only routes
router.post('/', protect, requireAdmin, createSurvey);
router.get('/:id/results', protect, requireAdmin, getSurveyResults);
router.put('/:id/close', protect, requireAdmin, closeSurvey);

module.exports = router;
