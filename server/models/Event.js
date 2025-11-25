const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  eventType: {
    type: String,
    required: [true, 'Event type is required'],
    enum: ['meeting', 'workshop', 'town-hall', 'hearing', 'other']
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
    validate: {
      validator: function(value) {
        // Only validate for new events
        if (this.isNew) {
          return value > new Date();
        }
        return true;
      },
      message: 'Event date must be in the future'
    }
  },
  time: {
    type: String,
    required: [true, 'Event time is required']
  },
  location: {
    venue: {
      type: String,
      required: [true, 'Venue is required']
    },
    address: String,
    city: String,
    state: String,
    zipCode: String
  },
  capacity: {
    type: Number,
    min: [1, 'Capacity must be at least 1']
  },
  registeredCitizens: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Citizen'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Citizen',
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for date-based queries
eventSchema.index({ date: 1, status: 1 });

// Virtual for checking if event is full
eventSchema.virtual('isFull').get(function() {
  return this.capacity && this.registeredCitizens.length >= this.capacity;
});

// Method to check if citizen is registered
eventSchema.methods.isCitizenRegistered = function(citizenId) {
  return this.registeredCitizens.some(id => id.toString() === citizenId.toString());
};

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
