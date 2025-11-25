const CouncilMember = require('../models/CouncilMember')
const GovernanceDecision = require('../models/GovernanceDecision')

// Get all council members (public)
const getCouncilMembers = async (req, res) => {
  try {
    const members = await CouncilMember.find({ isActive: true })
      .sort({ role: 1, name: 1 })
    
    res.json({
      success: true,
      members
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch council members',
      error: error.message
    })
  }
}

// Get governance decisions (public)
const getGovernanceDecisions = async (req, res) => {
  try {
    const { status, limit = 10 } = req.query
    
    let query = {}
    if (status) {
      query.status = status
    }
    
    const decisions = await GovernanceDecision.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
    
    res.json({
      success: true,
      decisions
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch governance decisions',
      error: error.message
    })
  }
}

// Get governance metrics (public)
const getGovernanceMetrics = async (req, res) => {
  try {
    const totalDecisions = await GovernanceDecision.countDocuments()
    const approvedDecisions = await GovernanceDecision.countDocuments({ status: 'Approved' })
    const pendingDecisions = await GovernanceDecision.countDocuments({ 
      status: { $in: ['Proposed', 'In Deliberation', 'Voting'] }
    })
    const activeMembers = await CouncilMember.countDocuments({ isActive: true })
    
    // Calculate average consensus rate
    const decisionsWithConsensus = await GovernanceDecision.find({ 
      consensusRate: { $gt: 0 } 
    })
    const avgConsensusRate = decisionsWithConsensus.length > 0 
      ? Math.round(decisionsWithConsensus.reduce((sum, d) => sum + d.consensusRate, 0) / decisionsWithConsensus.length)
      : 0

    res.json({
      success: true,
      metrics: {
        totalDecisions,
        approvedDecisions,
        pendingDecisions,
        activeMembers,
        avgConsensusRate: `${avgConsensusRate}%`,
        lastUpdated: new Date().toISOString()
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch governance metrics',
      error: error.message
    })
  }
}

// Admin: Create council member
const createCouncilMember = async (req, res) => {
  try {
    const { name, role, term, photo, bio, email } = req.body
    
    const member = new CouncilMember({
      name,
      role,
      term,
      photo,
      bio,
      email
    })
    
    await member.save()
    
    res.status(201).json({
      success: true,
      message: 'Council member created successfully',
      member
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create council member',
      error: error.message
    })
  }
}

// Admin: Update council member
const updateCouncilMember = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    
    const member = await CouncilMember.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    )
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Council member not found'
      })
    }
    
    res.json({
      success: true,
      message: 'Council member updated successfully',
      member
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update council member',
      error: error.message
    })
  }
}

// Admin: Delete council member
const deleteCouncilMember = async (req, res) => {
  try {
    const { id } = req.params
    
    const member = await CouncilMember.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    )
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Council member not found'
      })
    }
    
    res.json({
      success: true,
      message: 'Council member deactivated successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete council member',
      error: error.message
    })
  }
}

// Admin: Create governance decision
const createGovernanceDecision = async (req, res) => {
  try {
    const { title, description, proposedBy, category, priority, notes } = req.body
    
    const decision = new GovernanceDecision({
      title,
      description,
      proposedBy,
      category,
      priority,
      notes
    })
    
    await decision.save()
    
    res.status(201).json({
      success: true,
      message: 'Governance decision created successfully',
      decision
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create governance decision',
      error: error.message
    })
  }
}

// Admin: Update governance decision
const updateGovernanceDecision = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    
    // Calculate consensus rate if votes are provided
    if (updates.votesFor !== undefined && updates.votesAgainst !== undefined) {
      const totalVotes = updates.votesFor + updates.votesAgainst
      updates.totalVotes = totalVotes
      updates.consensusRate = totalVotes > 0 ? Math.round((updates.votesFor / totalVotes) * 100) : 0
      
      // Auto-update status based on consensus rate
      if (updates.consensusRate >= 70) {
        updates.status = 'Approved'
        updates.decisionDate = new Date()
      } else if (totalVotes > 0) {
        updates.status = 'Rejected'
        updates.decisionDate = new Date()
      }
    }
    
    const decision = await GovernanceDecision.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    )
    
    if (!decision) {
      return res.status(404).json({
        success: false,
        message: 'Governance decision not found'
      })
    }
    
    res.json({
      success: true,
      message: 'Governance decision updated successfully',
      decision
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update governance decision',
      error: error.message
    })
  }
}

// Admin: Get all council members (including inactive)
const getAllCouncilMembers = async (req, res) => {
  try {
    const members = await CouncilMember.find()
      .sort({ isActive: -1, role: 1, name: 1 })
    
    res.json({
      success: true,
      members
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch all council members',
      error: error.message
    })
  }
}

// Admin: Get all governance decisions
const getAllGovernanceDecisions = async (req, res) => {
  try {
    const decisions = await GovernanceDecision.find()
      .sort({ createdAt: -1 })
    
    res.json({
      success: true,
      decisions
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch all governance decisions',
      error: error.message
    })
  }
}



module.exports = {
  // Public endpoints
  getCouncilMembers,
  getGovernanceDecisions,
  getGovernanceMetrics,
  
  // Admin endpoints
  createCouncilMember,
  updateCouncilMember,
  deleteCouncilMember,
  createGovernanceDecision,
  updateGovernanceDecision,
  getAllCouncilMembers,
  getAllGovernanceDecisions
}