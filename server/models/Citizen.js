const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const citizenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  firstName: {
    type: String,
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false  // Don't include in queries by default
  },
  phoneNumber: {
    type: String,
    trim: true,
    match: [/^[\d\s\-\+\(\)]+$/, 'Please provide a valid phone number']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say', ''],
    default: ''
  },
  role: {
    type: String,
    enum: ['citizen', 'admin'],
    default: 'citizen'
  },
  location: {
    address: String,
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    zipCode: String,
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],  // [longitude, latitude]
        index: '2dsphere'
      }
    }
  },
  interests: [{
    type: String,
    enum: [
      'infrastructure',
      'education',
      'healthcare',
      'environment',
      'public-safety',
      'transportation',
      'housing',
      'economic-development'
    ]
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

// Index for email lookups
citizenSchema.index({ email: 1 });

// Pre-save hook to hash password
citizenSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
citizenSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Method to get public profile (without sensitive data)
citizenSchema.methods.toPublicJSON = function() {
  return {
    id: this._id,
    name: this.name,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    phoneNumber: this.phoneNumber,
    gender: this.gender,
    role: this.role,
    location: this.location,
    interests: this.interests,
    createdAt: this.createdAt
  };
};

const Citizen = mongoose.model('Citizen', citizenSchema);

module.exports = Citizen;
