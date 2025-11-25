const express = require('express')
const router = express.Router()
const governanceController = require('../controllers/governanceController')
const { protect } = require('../middleware/auth')
const { requireAdmin } = require('../middleware/admin')



// Public routes
router.get('/council', governanceController.getCouncilMembers)
router.get('/decisions', governanceController.getGovernanceDecisions)
router.get('/metrics', governanceController.getGovernanceMetrics)

// Admin routes - Council Members
router.get('/admin/council', protect, requireAdmin, governanceController.getAllCouncilMembers)
router.post('/admin/council', protect, requireAdmin, governanceController.createCouncilMember)
router.put('/admin/council/:id', protect, requireAdmin, governanceController.updateCouncilMember)
router.delete('/admin/council/:id', protect, requireAdmin, governanceController.deleteCouncilMember)

// Admin routes - Governance Decisions
router.get('/admin/decisions', protect, requireAdmin, governanceController.getAllGovernanceDecisions)
router.post('/admin/decisions', protect, requireAdmin, governanceController.createGovernanceDecision)
router.put('/admin/decisions/:id', protect, requireAdmin, governanceController.updateGovernanceDecision)

module.exports = router