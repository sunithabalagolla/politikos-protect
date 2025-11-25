const mongoose = require('mongoose');

const civicIssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'infrastructure',
      'education',
      'healthcare',
      'environment',
      'public-safety',
      'transportation',
      'housing',
      'other'
    ]
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open'
  },
  location: {
    address: {
      type: String,
      required: [true, 'Location address is required']
    },
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number]  // [longitude, latitude]
      }
    }
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Citizen',
    required: true
  },
  imageUrl: {
    type: String,
    default: null
  },
  statusHistory: [{
    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved', 'closed']
    },
    comment: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Citizen'
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for common queries
civicIssueSchema.index({ status: 1, createdAt: -1 });
civicIssueSchema.index({ category: 1 });
civicIssueSchema.index({ submittedBy: 1 });

// Geospatial index (only if coordinates are provided)
civicIssueSchema.index({ 'location.coordinates': '2dsphere' }, { sparse: true });

// Add initial status to history when issue is created
civicIssueSchema.pre('save', function(next) {
  if (this.isNew) {
    this.statusHistory.push({
      status: this.status,
      comment: 'Issue created',
      updatedBy: this.submittedBy,
      updatedAt: new Date()
    });
  }
  next();
});

const CivicIssue = mongoose.model('CivicIssue', civicIssueSchema);

module.exports = CivicIssue;
