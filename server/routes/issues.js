const express = require('express');
const router = express.Router();
const {
  createIssue,
  getIssues,
  getIssueById,
  updateIssueStatus,
  addStatusComment
} = require('../controllers/issueController');
const { protect } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/admin');
const upload = require('../middleware/upload');

// Public routes
router.get('/', getIssues);
router.get('/:id', getIssueById);

// Protected routes (require authentication)
// Single image upload with field name 'image'
router.post('/', protect, upload.single('image'), createIssue);

// Admin only routes
router.put('/:id/status', protect, requireAdmin, updateIssueStatus);
router.post('/:id/comments', protect, requireAdmin, addStatusComment);

// Test route to verify routing works
router.get('/test', (req, res) => {
  res.json({ message: 'Issues route is working!' });
});

module.exports = router;
