const mongoose = require('mongoose')

const councilMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    enum: [
      'Women Representative',
      'Youth Member', 
      'Local Business Leader',
      'NGO/Academic Representative',
      'Civic Volunteer Lead',
      'PPC Coordinator'
    ]
  },
  term: {
    type: String,
    required: true,
    default: '2024-2025'
  },
  photo: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  joinedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('CouncilMember', councilMemberSchema)