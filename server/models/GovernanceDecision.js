const mongoose = require('mongoose')

const governanceDecisionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Proposed', 'In Deliberation', 'Voting', 'Approved', 'Rejected', 'Implemented'],
    default: 'Proposed'
  },
  stage: {
    type: String,
    required: true,
    enum: ['Deliberation', 'Consensus', 'Documentation', 'Implementation'],
    default: 'Deliberation'
  },
  proposedBy: {
    type: String,
    required: true
  },
  consensusRate: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  votesFor: {
    type: Number,
    default: 0
  },
  votesAgainst: {
    type: Number,
    default: 0
  },
  totalVotes: {
    type: Number,
    default: 0
  },
  decisionDate: {
    type: Date,
    default: null
  },
  implementationDate: {
    type: Date,
    default: null
  },
  category: {
    type: String,
    enum: ['Policy', 'Budget', 'Event', 'Partnership', 'Infrastructure', 'Other'],
    default: 'Other'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('GovernanceDecision', governanceDecisionSchema)