# Design Document

## Overview

The Politikos People Center (PPC) is a full-stack MERN application that enables civic engagement through issue reporting, event management, and community feedback. The system follows a three-tier architecture with a React frontend, Express.js REST API backend, and MongoDB database. The application implements JWT-based authentication, role-based access control, and comprehensive data validation using Mongoose schemas.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────┐
│         React Frontend (Client)         │
│  - Components (Pages, Forms, Lists)     │
│  - State Management (Context/Redux)     │
│  - Routing (React Router)               │
│  - API Client (Axios)                   │
└──────────────────┬──────────────────────┘
                   │ HTTP/HTTPS
                   │ REST API Calls
                   ▼
┌─────────────────────────────────────────┐
│      Express.js Backend (Server)        │
│  - REST API Routes                      │
│  - Authentication Middleware (JWT)      │
│  - Authorization Middleware             │
│  - Error Handling Middleware            │
│  - Request Validation                   │
└──────────────────┬──────────────────────┘
                   │ Mongoose ODM
                   │
                   ▼
┌─────────────────────────────────────────┐
│         MongoDB Database                │
│  - Citizens Collection                  │
│  - CivicIssues Collection               │
│  - Events Collection                    │
│  - Surveys Collection                   │
│  - SurveyResponses Collection           │
└─────────────────────────────────────────┘
```

### Technology Stack

- **Frontend**: React 18+, React Router, Axios, CSS Modules/Styled Components
- **Backend**: Node.js, Express.js 4+, Mongoose 7+
- **Database**: MongoDB 6+
- **Authentication**: JSON Web Tokens (JWT), bcrypt for password hashing
- **Validation**: express-validator, Mongoose schema validation
- **Testing**: Jest, React Testing Library, Supertest

### Project Structure

```
politikos-people-center/
├── client/                          # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── common/
│   │   │   ├── issues/
│   │   │   ├── events/
│   │   │   └── surveys/
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── IssueList.jsx
│   │   │   ├── IssueDetail.jsx
│   │   │   ├── EventList.jsx
│   │   │   └── Profile.jsx
│   │   ├── context/                 # React Context for state
│   │   │   └── AuthContext.jsx
│   │   ├── services/                # API client services
│   │   │   └── api.js
│   │   ├── utils/                   # Utility functions
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   └── .env
├── server/                          # Express.js backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── models/                      # Mongoose models
│   │   ├── Citizen.js
│   │   ├── CivicIssue.js
│   │   ├── Event.js
│   │   ├── Survey.js
│   │   └── SurveyResponse.js
│   ├── routes/                      # API routes
│   │   ├── auth.js
│   │   ├── citizens.js
│   │   ├── issues.js
│   │   ├── events.js
│   │   ├── surveys.js
│   │   └── admin.js
│   ├── middleware/                  # Express middleware
│   │   ├── auth.js                  # JWT authentication
│   │   ├── admin.js                 # Admin authorization
│   │   ├── errorHandler.js          # Error handling
│   │   └── validator.js             # Request validation
│   ├── controllers/                 # Route controllers
│   │   ├── authController.js
│   │   ├── issueController.js
│   │   ├── eventController.js
│   │   └── surveyController.js
│   ├── utils/                       # Utility functions
│   │   └── tokenUtils.js
│   ├── server.js                    # Express app setup
│   ├── package.json
│   └── .env
├── .gitignore
└── README.md
```

## Components and Interfaces

### Backend Components

#### 1. Authentication System

**JWT Token Structure:**
```javascript
{
  userId: ObjectId,
  email: String,
  role: String,  // 'citizen' or 'admin'
  iat: Number,
  exp: Number
}
```

**Authentication Middleware:**
- Validates JWT tokens from Authorization header
- Attaches user information to request object
- Returns 401 for invalid/missing tokens

**Authorization Middleware:**
- Checks user role for admin-only endpoints
- Returns 403 for insufficient permissions

#### 2. API Routes

**Authentication Routes (`/api/auth`)**
- `POST /register` - Register new citizen
- `POST /login` - Authenticate and receive JWT
- `GET /me` - Get current user profile (protected)

**Citizen Routes (`/api/citizens`)**
- `GET /:id` - Get citizen profile
- `PUT /:id` - Update citizen profile (protected, own profile only)
- `PUT /:id/interests` - Update citizen interests (protected)
- `GET /:id/issues` - Get issues submitted by citizen

**Civic Issue Routes (`/api/issues`)**
- `GET /` - List all issues (with filtering and pagination)
- `GET /:id` - Get issue details
- `POST /` - Create new issue (protected)
- `PUT /:id/status` - Update issue status (admin only)
- `POST /:id/comments` - Add status comment (admin only)

**Event Routes (`/api/events`)**
- `GET /` - List upcoming events
- `GET /:id` - Get event details
- `POST /` - Create event (admin only)
- `POST /:id/register` - Register for event (protected)
- `DELETE /:id/register` - Unregister from event (protected)

**Survey Routes (`/api/surveys`)**
- `GET /` - List active surveys
- `GET /:id` - Get survey details
- `POST /` - Create survey (admin only)
- `POST /:id/responses` - Submit survey response (protected)
- `GET /:id/results` - Get survey results (admin only)
- `PUT /:id/close` - Close survey (admin only)

**Admin Routes (`/api/admin`)**
- `GET /dashboard` - Get dashboard statistics
- `GET /citizens` - List all citizens
- `PUT /citizens/:id/role` - Update citizen role

#### 3. Controllers

Controllers handle business logic and coordinate between routes and models:

- **authController**: Registration, login, password hashing, token generation
- **issueController**: Issue CRUD, filtering, status updates
- **eventController**: Event management, registration handling
- **surveyController**: Survey creation, response collection, result aggregation

### Frontend Components

#### Page Components

- **Home**: Landing page with platform overview
- **Login/Register**: Authentication forms
- **Dashboard**: Personalized citizen dashboard with relevant issues and events
- **IssueList**: Browse and filter civic issues
- **IssueDetail**: View issue details and status history
- **EventList**: Browse upcoming events
- **Profile**: View and edit user profile

#### Reusable Components

- **IssueCard**: Display issue summary
- **EventCard**: Display event information
- **SurveyForm**: Render survey questions dynamically
- **StatusBadge**: Display issue status with color coding
- **ProtectedRoute**: Route wrapper for authenticated pages

#### State Management

- **AuthContext**: Manages authentication state, user info, login/logout
- **API Service**: Centralized Axios instance with interceptors for token injection

## Data Models

### Citizen Model (Mongoose Schema)

```javascript
const citizenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
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
  role: {
    type: String,
    enum: ['citizen', 'admin'],
    default: 'citizen'
  },
  location: {
    address: String,
    city: String,
    state: String,
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
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
citizenSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
```

### Civic Issue Model (Mongoose Schema)

```javascript
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
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],  // [longitude, latitude]
        index: '2dsphere'
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
civicIssueSchema.index({ 'location.coordinates': '2dsphere' });
```

### Event Model (Mongoose Schema)

```javascript
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
        return value > new Date();
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
```

### Survey Model (Mongoose Schema)

```javascript
const surveySchema = new mongoose.Schema({
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
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  questions: [{
    questionText: {
      type: String,
      required: true,
      trim: true
    },
    questionType: {
      type: String,
      required: true,
      enum: ['multiple-choice', 'text', 'rating', 'yes-no']
    },
    options: [String],  // For multiple-choice questions
    required: {
      type: Boolean,
      default: true
    }
  }],
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Citizen',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  closedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for status queries
surveySchema.index({ status: 1, createdAt: -1 });
```

### Survey Response Model (Mongoose Schema)

```javascript
const surveyResponseSchema = new mongoose.Schema({
  survey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: true
  },
  respondent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Citizen',
    required: true
  },
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    answer: {
      type: mongoose.Schema.Mixed,  // Can be String, Number, or Array
      required: true
    }
  }],
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate responses
surveyResponseSchema.index({ survey: 1, respondent: 1 }, { unique: true });
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Authentication and Authorization Properties

**Property 1: Registration creates hashed passwords**
*For any* valid registration data (name, email, password), creating a new citizen account should result in the password being hashed before storage, never storing plaintext passwords.
**Validates: Requirements 1.1, 6.3**

**Property 2: Duplicate email rejection**
*For any* email address that already exists in the system, attempting to register a new account with that email should be rejected with an appropriate error.
**Validates: Requirements 1.2, 5.5**

**Property 3: Valid login returns JWT**
*For any* registered citizen with valid credentials, logging in should return a valid JWT token containing the user's ID, email, and role.
**Validates: Requirements 1.3**

**Property 4: Invalid credentials rejected**
*For any* login attempt with incorrect email or password, the system should reject the authentication and return an error without revealing which credential was invalid.
**Validates: Requirements 1.4**

**Property 5: Expired tokens rejected**
*For any* expired JWT token, attempting to access protected endpoints should result in a 401 unauthorized response.
**Validates: Requirements 1.5**

**Property 6: Protected endpoints require authentication**
*For any* protected API endpoint, requests without a valid authentication token should be rejected with a 401 status code.
**Validates: Requirements 7.2**

**Property 7: Admin-only endpoints enforce authorization**
*For any* admin-only endpoint, requests from non-admin users should be rejected with a 403 forbidden status, even if authenticated.
**Validates: Requirements 4.3**

### Civic Issue Properties

**Property 8: Issue creation with valid data**
*For any* authenticated citizen and valid issue data (title, description, location, category), creating an issue should result in a new issue record with a unique ID and status "open".
**Validates: Requirements 2.1, 2.2**

**Property 9: Issue creation requires authentication**
*For any* issue creation attempt, the created issue should be associated with the authenticated citizen's account.
**Validates: Requirements 2.4**

**Property 10: Missing required fields rejected**
*For any* issue submission missing required fields (title, description, location, or category), the system should reject the submission and indicate which fields are missing.
**Validates: Requirements 2.3**

**Property 11: Issue list ordering**
*For any* request to list civic issues, the returned issues should be sorted by creation date with most recent first.
**Validates: Requirements 3.1**

**Property 12: Status filtering correctness**
*For any* status filter value, the returned issues should only include issues with that exact status.
**Validates: Requirements 3.2**

**Property 13: Keyword search correctness**
*For any* search keyword, the returned issues should only include issues where the keyword appears in either the title or description (case-insensitive).
**Validates: Requirements 3.3**

**Property 14: Issue detail completeness**
*For any* issue ID, retrieving issue details should return all required fields including title, description, status, location, submitter information, and timestamps.
**Validates: Requirements 3.4**

**Property 15: Pagination limits results**
*For any* paginated issue list request, the number of returned issues should not exceed the specified page size.
**Validates: Requirements 3.5**

**Property 16: Status update persistence**
*For any* valid status change by an admin user, the issue's status should be updated and a new entry should be added to the status history with timestamp.
**Validates: Requirements 4.1, 4.4**

**Property 17: Status comments association**
*For any* status comment added by an admin, the comment should be associated with both the issue and the admin's user account.
**Validates: Requirements 4.2**

**Property 18: Resolved status requires comment**
*For any* attempt to mark an issue as "resolved", the request should be rejected if no resolution comment is provided.
**Validates: Requirements 4.5**

**Property 19: Image upload association**
*For any* issue created with an image upload, the image URL should be stored and associated with the issue record.
**Validates: Requirements 2.5**

### Profile Management Properties

**Property 20: Profile excludes password**
*For any* citizen profile retrieval, the returned data should never include the password field.
**Validates: Requirements 5.1**

**Property 21: Profile update validation**
*For any* valid profile update data, the changes should be validated and persisted to the database.
**Validates: Requirements 5.2**

**Property 22: Password change requires verification**
*For any* password change request, the system should verify the current password before allowing the new password to be set.
**Validates: Requirements 5.3**

**Property 23: Profile shows submitted issues**
*For any* citizen profile view, the response should include a list of all civic issues submitted by that citizen.
**Validates: Requirements 5.4**

**Property 24: Email uniqueness on update**
*For any* attempt to update a citizen's email to an address already in use by another account, the update should be rejected.
**Validates: Requirements 5.5**

### Event Management Properties

**Property 25: Event creation with valid data**
*For any* admin user and valid event data (title, description, date, time, location), creating an event should result in a new event record with a unique ID and status "upcoming".
**Validates: Requirements 9.1**

**Property 26: Upcoming events filtering**
*For any* request to list upcoming events, only events with dates in the future should be returned, sorted by date ascending.
**Validates: Requirements 9.2**

**Property 27: Event registration association**
*For any* authenticated citizen registering for an event, the citizen's ID should be added to the event's registered citizens list.
**Validates: Requirements 9.3**

**Property 28: Duplicate registration prevention**
*For any* citizen already registered for an event, attempting to register again should be rejected.
**Validates: Requirements 9.4**

**Property 29: Past events marked completed**
*For any* event whose date has passed, the event status should be "completed" and it should not appear in upcoming events lists.
**Validates: Requirements 9.5**

### Survey Properties

**Property 30: Survey creation with active status**
*For any* admin user creating a survey with valid data (title, description, questions), the survey should be stored with status "active".
**Validates: Requirements 10.1**

**Property 31: Survey response validation**
*For any* survey response submission, all required questions must have answers, otherwise the submission should be rejected.
**Validates: Requirements 10.2**

**Property 32: Duplicate response prevention**
*For any* citizen who has already submitted a response to a survey, attempting to submit another response should be rejected.
**Validates: Requirements 10.3**

**Property 33: Survey results aggregation**
*For any* survey with responses, requesting results should return aggregated statistics for all questions.
**Validates: Requirements 10.4**

**Property 34: Closed survey prevents submissions**
*For any* survey with status "closed", attempting to submit a new response should be rejected, while existing responses remain accessible.
**Validates: Requirements 10.5**

### Profile Enhancement Properties

**Property 35: Location data validation**
*For any* location data added to a citizen profile, the data should be validated for proper format and stored correctly.
**Validates: Requirements 11.1**

**Property 36: Interest association**
*For any* set of civic interest categories selected by a citizen, those interests should be stored in the citizen's profile.
**Validates: Requirements 11.2**

**Property 37: Interest replacement on update**
*For any* citizen updating their interests, the new interests should completely replace the old interests, not append to them.
**Validates: Requirements 11.3**

**Property 38: Issue prioritization by relevance**
*For any* citizen with specified location and interests, issues matching those criteria should be prioritized in their issue feed.
**Validates: Requirements 11.4**

**Property 39: Event relevance flagging**
*For any* new event created, citizens with matching interests should have the event flagged as relevant.
**Validates: Requirements 11.5**

### Data Integrity Properties

**Property 40: Successful operations persist immediately**
*For any* successful data operation (create, update, delete), the changes should be immediately persisted to MongoDB.
**Validates: Requirements 6.1**

**Property 41: Citizen deletion maintains referential integrity**
*For any* citizen deletion, associated civic issues should either be reassigned, marked as orphaned, or handled according to defined cascade rules.
**Validates: Requirements 6.4**

### API Validation Properties

**Property 42: Input type validation**
*For any* API request, all input parameters should be validated against expected types and formats, rejecting invalid data.
**Validates: Requirements 7.1**

**Property 43: Malformed JSON rejection**
*For any* API request with malformed JSON, the system should reject the request and return a descriptive error message.
**Validates: Requirements 7.3**

**Property 44: Error handling and logging**
*For any* unexpected error in the API, the error should be logged with details while returning a generic error message to the client.
**Validates: Requirements 7.5**

### Frontend Properties

**Property 45: Navigation updates URL**
*For any* page navigation in the frontend, the URL and browser history should be updated appropriately.
**Validates: Requirements 8.2**

**Property 46: API error display**
*For any* API error response, the frontend should display a user-friendly error message to the user.
**Validates: Requirements 8.3**

**Property 47: Unauthenticated redirect**
*For any* attempt to access a protected route without authentication, the frontend should redirect to the login page.
**Validates: Requirements 8.5**

## Error Handling

### Backend Error Handling Strategy

**Error Categories:**

1. **Validation Errors (400)**: Invalid input data, missing required fields
2. **Authentication Errors (401)**: Missing or invalid JWT tokens
3. **Authorization Errors (403)**: Insufficient permissions for requested action
4. **Not Found Errors (404)**: Requested resource doesn't exist
5. **Conflict Errors (409)**: Duplicate data, constraint violations
6. **Server Errors (500)**: Unexpected errors, database failures

**Error Response Format:**
```javascript
{
  success: false,
  error: {
    message: "User-friendly error message",
    code: "ERROR_CODE",
    details: {} // Optional, only in development mode
  }
}
```

**Global Error Handler Middleware:**
```javascript
const errorHandler = (err, req, res, next) => {
  // Log error details
  console.error(err);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: Object.values(err.errors).map(e => e.message)
      }
    });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      error: {
        message: 'Resource already exists',
        code: 'DUPLICATE_ERROR'
      }
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Invalid or expired token',
        code: 'AUTH_ERROR'
      }
    });
  }
  
  // Default server error
  res.status(err.statusCode || 500).json({
    success: false,
    error: {
      message: err.message || 'Internal server error',
      code: err.code || 'SERVER_ERROR'
    }
  });
};
```

### Frontend Error Handling

**Error Handling Patterns:**

1. **API Client Interceptor**: Catch all API errors and format them consistently
2. **Error Boundary**: Catch React component errors and display fallback UI
3. **Toast Notifications**: Display user-friendly error messages
4. **Form Validation**: Client-side validation before API calls

**API Client with Error Handling:**
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response;
      
      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      return Promise.reject(data.error || { message: 'An error occurred' });
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({ message: 'Network error. Please try again.' });
    } else {
      // Something else happened
      return Promise.reject({ message: error.message });
    }
  }
);

export default api;
```

## Testing Strategy

### Unit Testing

**Backend Unit Tests:**
- **Model Tests**: Test Mongoose schema validation, methods, and hooks
- **Controller Tests**: Test business logic in isolation with mocked models
- **Middleware Tests**: Test authentication, authorization, and validation middleware
- **Utility Tests**: Test helper functions like token generation

**Frontend Unit Tests:**
- **Component Tests**: Test individual React components with React Testing Library
- **Hook Tests**: Test custom React hooks in isolation
- **Utility Tests**: Test helper functions and formatters

**Testing Tools:**
- Jest as test runner
- React Testing Library for component tests
- Supertest for API endpoint tests
- MongoDB Memory Server for database tests

### Property-Based Testing

**Property-Based Testing Library**: fast-check (JavaScript/TypeScript)

**Configuration**: Each property-based test should run a minimum of 100 iterations to ensure thorough coverage of the input space.

**Test Annotation Format**: Each property-based test MUST be tagged with a comment explicitly referencing the correctness property:
```javascript
// Feature: politikos-people-center, Property 1: Registration creates hashed passwords
```

**Property Test Examples:**

```javascript
const fc = require('fast-check');
const bcrypt = require('bcrypt');
const { registerCitizen } = require('../controllers/authController');

// Feature: politikos-people-center, Property 1: Registration creates hashed passwords
test('Property 1: Registration creates hashed passwords', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.record({
        name: fc.string({ minLength: 2, maxLength: 100 }),
        email: fc.emailAddress(),
        password: fc.string({ minLength: 6, maxLength: 50 })
      }),
      async (userData) => {
        const citizen = await registerCitizen(userData);
        const isHashed = await bcrypt.compare(userData.password, citizen.password);
        expect(isHashed).toBe(true);
        expect(citizen.password).not.toBe(userData.password);
      }
    ),
    { numRuns: 100 }
  );
});

// Feature: politikos-people-center, Property 11: Issue list ordering
test('Property 11: Issue list ordering', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.array(fc.record({
        title: fc.string({ minLength: 5, maxLength: 200 }),
        description: fc.string({ minLength: 10, maxLength: 2000 }),
        category: fc.constantFrom('infrastructure', 'education', 'healthcare'),
        location: fc.record({ address: fc.string() })
      }), { minLength: 2, maxLength: 20 }),
      async (issuesData) => {
        // Create issues with random delays to ensure different timestamps
        const createdIssues = [];
        for (const data of issuesData) {
          const issue = await createIssue(data);
          createdIssues.push(issue);
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        
        const retrievedIssues = await listIssues();
        
        // Verify issues are sorted by most recent first
        for (let i = 0; i < retrievedIssues.length - 1; i++) {
          expect(retrievedIssues[i].createdAt >= retrievedIssues[i + 1].createdAt).toBe(true);
        }
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property Test Coverage:**
- Authentication properties (1-7): Test with random valid/invalid credentials
- Issue management properties (8-19): Test with random issue data and status transitions
- Profile properties (20-24): Test with random profile updates
- Event properties (25-29): Test with random event data and registrations
- Survey properties (30-34): Test with random survey structures and responses
- Data integrity properties (35-44): Test with random data operations

### Integration Testing

**Integration Test Scope:**
- Full API endpoint tests with real MongoDB (using test database)
- Frontend-backend integration tests
- Authentication flow tests (register → login → protected endpoint)
- Complete user workflows (create issue → update status → view history)

**Test Database Strategy:**
- Use separate test database
- Clear database before each test suite
- Seed test data as needed
- Use transactions for test isolation where possible

### End-to-End Testing

**E2E Testing Tool**: Playwright or Cypress

**E2E Test Scenarios:**
- User registration and login flow
- Create and browse civic issues
- Register for events
- Submit survey responses
- Admin dashboard operations

## Security Considerations

### Authentication Security

1. **Password Hashing**: Use bcrypt with salt rounds of 12
2. **JWT Security**: 
   - Sign tokens with strong secret (minimum 256 bits)
   - Set reasonable expiration (e.g., 24 hours)
   - Use HTTPS in production
3. **Token Storage**: Store JWT in httpOnly cookies or localStorage with XSS protection

### Input Validation

1. **Server-Side Validation**: Always validate on server, never trust client
2. **Sanitization**: Sanitize user inputs to prevent XSS attacks
3. **SQL/NoSQL Injection**: Use Mongoose parameterized queries
4. **File Upload Validation**: Validate file types and sizes for image uploads

### API Security

1. **CORS**: Configure CORS to allow only trusted origins
2. **Rate Limiting**: Implement rate limiting to prevent abuse
3. **Helmet.js**: Use Helmet middleware for security headers
4. **Environment Variables**: Never commit secrets, use .env files

### Data Privacy

1. **Password Exclusion**: Never return password fields in API responses
2. **Personal Data**: Implement proper data access controls
3. **Audit Logging**: Log sensitive operations for security auditing

## Deployment Considerations

### Environment Configuration

**Required Environment Variables:**

**Backend (.env):**
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ppc
JWT_SECRET=your-secret-key-min-256-bits
JWT_EXPIRE=24h
CLIENT_URL=http://localhost:3000
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Database Setup

1. **Indexes**: Create indexes for frequently queried fields
2. **Connection Pooling**: Configure appropriate pool size
3. **Backup Strategy**: Regular automated backups
4. **Migration Strategy**: Use migration scripts for schema changes

### Production Deployment

1. **Build Process**: 
   - Frontend: `npm run build` creates optimized production build
   - Backend: Use PM2 or similar for process management
2. **Static File Serving**: Serve React build from Express in production
3. **Logging**: Use Winston or similar for structured logging
4. **Monitoring**: Implement health checks and monitoring
5. **SSL/TLS**: Use HTTPS in production with valid certificates

## Performance Optimization

### Backend Optimization

1. **Database Queries**: 
   - Use lean() for read-only queries
   - Implement pagination for large datasets
   - Use indexes for frequently queried fields
2. **Caching**: Consider Redis for session storage and caching
3. **Compression**: Use compression middleware for responses

### Frontend Optimization

1. **Code Splitting**: Use React.lazy() for route-based code splitting
2. **Memoization**: Use React.memo() and useMemo() for expensive computations
3. **Image Optimization**: Compress and lazy-load images
4. **Bundle Size**: Analyze and minimize bundle size

## Future Enhancements

1. **Real-time Updates**: WebSocket integration for live issue updates
2. **Geolocation**: Map visualization of civic issues
3. **Notifications**: Email/SMS notifications for issue updates
4. **Mobile App**: React Native mobile application
5. **Analytics Dashboard**: Advanced analytics for admins
6. **Multi-language Support**: Internationalization (i18n)
