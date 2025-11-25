# Implementation Plan

- [x] 1. Initialize project structure and dependencies



  - Create root directory with client and server folders
  - Initialize Node.js project in server folder with Express, Mongoose, bcrypt, jsonwebtoken, express-validator, cors, dotenv
  - Initialize React project in client folder with React Router, Axios
  - Create .gitignore files for both client and server
  - Set up environment configuration files (.env templates)
  - _Requirements: 12.1, 12.2_    

- [x] 2. Set up MongoDB connection and database configuration



  - Create database connection module in server/config/db.js
  - Implement connection pooling with error handling
  - Add connection string validation
  - Test database connectivity
  - _Requirements: 6.1, 6.2, 12.5_

- [x] 3. Implement Citizen model and authentication system




  - [x] 3.1 Create Citizen Mongoose schema with validation

    - Define schema with name, email, password, role, location, interests fields
    - Add email uniqueness index
    - Implement pre-save hook for password hashing
    - Add comparePassword method
    - _Requirements: 1.1, 1.2, 6.3_
  - [ ]* 3.2 Write property test for password hashing
    - **Property 1: Registration creates hashed passwords**
    - **Validates: Requirements 1.1, 6.3**
  - [ ]* 3.3 Write property test for duplicate email rejection
    - **Property 2: Duplicate email rejection**
    - **Validates: Requirements 1.2**
  - [x] 3.4 Create authentication controller with register and login functions


    - Implement registration with validation
    - Implement login with JWT token generation
    - Add password comparison logic
    - _Requirements: 1.1, 1.3, 1.4_
  - [ ]* 3.5 Write property test for login authentication
    - **Property 3: Valid login returns JWT**
    - **Property 4: Invalid credentials rejected**
    - **Validates: Requirements 1.3, 1.4**
  - [x] 3.6 Create JWT authentication middleware


    - Implement token verification middleware
    - Extract user information from token
    - Handle expired and invalid tokens
    - _Requirements: 1.5, 7.2_
  - [ ]* 3.7 Write property test for token expiration
    - **Property 5: Expired tokens rejected**
    - **Property 6: Protected endpoints require authentication**
    - **Validates: Requirements 1.5, 7.2**
  - [x] 3.8 Create admin authorization middleware


    - Check user role for admin privileges
    - Return 403 for non-admin users
    - _Requirements: 4.3_
  - [ ]* 3.9 Write property test for admin authorization
    - **Property 7: Admin-only endpoints enforce authorization**
    - **Validates: Requirements 4.3**
  - [x] 3.10 Create authentication routes (/api/auth)


    - POST /register endpoint
    - POST /login endpoint
    - GET /me endpoint for current user
    - _Requirements: 1.1, 1.3_

- [x] 4. Implement Civic Issue model and CRUD operations




  - [x] 4.1 Create CivicIssue Mongoose schema

    - Define schema with title, description, category, status, location, submittedBy fields
    - Add statusHistory subdocument array
    - Create indexes for status, category, and submittedBy
    - Add geospatial index for location coordinates
    - _Requirements: 2.1, 2.2, 2.4_
  - [ ]* 4.2 Write property test for issue creation
    - **Property 8: Issue creation with valid data**
    - **Property 9: Issue creation requires authentication**
    - **Validates: Requirements 2.1, 2.2, 2.4**
  - [ ]* 4.3 Write property test for required field validation
    - **Property 10: Missing required fields rejected**
    - **Validates: Requirements 2.3**
  - [x] 4.4 Create issue controller with CRUD functions


    - Implement createIssue with validation
    - Implement getIssues with filtering, search, and pagination
    - Implement getIssueById with population of submitter
    - Implement updateIssueStatus (admin only)
    - Implement addStatusComment (admin only)
    - _Requirements: 2.1, 2.3, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.5_
  - [ ]* 4.5 Write property tests for issue operations
    - **Property 11: Issue list ordering**
    - **Property 12: Status filtering correctness**
    - **Property 13: Keyword search correctness**
    - **Property 15: Pagination limits results**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.5**
  - [ ]* 4.6 Write property tests for status management
    - **Property 16: Status update persistence**
    - **Property 17: Status comments association**
    - **Property 18: Resolved status requires comment**


    - **Validates: Requirements 4.1, 4.2, 4.4, 4.5**
  - [x] 4.7 Create issue routes (/api/issues)

    - GET / endpoint with query parameters for filtering
    - GET /:id endpoint
    - POST / endpoint (protected)
    - PUT /:id/status endpoint (admin only)
    - POST /:id/comments endpoint (admin only)
    - _Requirements: 2.1, 3.1, 3.2, 3.3, 3.4, 4.1, 4.2_

- [x] 5. Implement image upload functionality for issues





  - [x] 5.1 Set up file upload middleware (multer or similar)

    - Configure storage destination
    - Add file type validation (images only)
    - Add file size limits
    - _Requirements: 2.5_
  - [x] 5.2 Add image upload to issue creation endpoint


    - Handle multipart form data
    - Store image URL in issue record
    - _Requirements: 2.5_
  - [ ]* 5.3 Write property test for image association
    - **Property 19: Image upload association**
    - **Validates: Requirements 2.5**

- [x] 6. Implement citizen profile management







  - [ ] 6.1 Create profile controller functions
    - Implement getProfile (exclude password)
    - Implement updateProfile with validation
    - Implement updatePassword with current password verification
    - Implement updateInterests
    - Implement updateLocation
    - _Requirements: 5.1, 5.2, 5.3, 11.1, 11.2, 11.3_
  - [ ]* 6.2 Write property tests for profile operations
    - **Property 20: Profile excludes password**
    - **Property 21: Profile update validation**
    - **Property 22: Password change requires verification**
    - **Property 24: Email uniqueness on update**
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.5**
  - [ ]* 6.3 Write property tests for profile enhancements
    - **Property 35: Location data validation**
    - **Property 36: Interest association**



    - **Property 37: Interest replacement on update**
    - **Validates: Requirements 11.1, 11.2, 11.3**
  - [ ] 6.4 Create citizen routes (/api/citizens)
    - GET /:id endpoint
    - PUT /:id endpoint (protected, own profile only)
    - PUT /:id/interests endpoint (protected)
    - PUT /:id/location endpoint (protected)


    - GET /:id/issues endpoint
    - _Requirements: 5.1, 5.2, 5.4, 11.1, 11.2_
  - [ ]* 6.5 Write property test for submitted issues list
    - **Property 23: Profile shows submitted issues**
    - **Validates: Requirements 5.4**

- [x] 7. Implement Event model and management system


  - [x] 7.1 Create Event Mongoose schema

    - Define schema with title, description, eventType, date, time, location, capacity fields
    - Add registeredCitizens array
    - Add virtual for isFull
    - Create index for date and status
    - _Requirements: 9.1_
  - [x] 7.2 Create event controller functions


    - Implement createEvent (admin only)
    - Implement getUpcomingEvents with date filtering
    - Implement getEventById
    - Implement registerForEvent with duplicate check
    - Implement unregisterFromEvent
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  - [ ]* 7.3 Write property tests for event operations
    - **Property 25: Event creation with valid data**
    - **Property 26: Upcoming events filtering**
    - **Property 27: Event registration association**
    - **Property 28: Duplicate registration prevention**
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.4**
  - [x] 7.4 Create event routes (/api/events)


    - GET / endpoint for upcoming events
    - GET /:id endpoint
    - POST / endpoint (admin only)
    - POST /:id/register endpoint (protected)
    - DELETE /:id/register endpoint (protected)
    - _Requirements: 9.1, 9.2, 9.3_

- [x] 8. Implement Survey and SurveyResponse models





  - [x] 8.1 Create Survey Mongoose schema

    - Define schema with title, description, questions array, status fields


    - Add index for status
    - _Requirements: 10.1_

  - [x] 8.2 Create SurveyResponse Mongoose schema

    - Define schema with survey, respondent, answers fields
    - Add compound unique index on survey and respondent
    - _Requirements: 10.2, 10.3_
  - [x] 8.3 Create survey controller functions

    - Implement createSurvey (admin only)
    - Implement getActiveSurveys
    - Implement getSurveyById
    - Implement submitResponse with validation and duplicate check
    - Implement getSurveyResults with aggregation (admin only)
    - Implement closeSurvey (admin only)
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  - [ ]* 8.4 Write property tests for survey operations
    - **Property 30: Survey creation with active status**
    - **Property 31: Survey response validation**
    - **Property 32: Duplicate response prevention**
    - **Property 33: Survey results aggregation**
    - **Property 34: Closed survey prevents submissions**
    - **Validates: Requirements 10.1, 10.2, 10.3, 10.4, 10.5**


  - [x] 8.5 Create survey routes (/api/surveys)

    - GET / endpoint for active surveys
    - GET /:id endpoint
    - POST / endpoint (admin only)
    - POST /:id/responses endpoint (protected)
    - GET /:id/results endpoint (admin only)
    - PUT /:id/close endpoint (admin only)


    - _Requirements: 10.1, 10.2, 10.4, 10.5_

- [ ] 9. Implement admin dashboard functionality
  - [x] 9.1 Create admin controller with dashboard statistics



    - Aggregate total citizens count
    - Aggregate issues by status
    - Aggregate upcoming events count
    - Aggregate active surveys count
    - _Requirements: 4.1_
  - [x] 9.2 Create admin routes (/api/admin)

    - GET /dashboard endpoint (admin only)
    - GET /citizens endpoint (admin only)
    - PUT /citizens/:id/role endpoint (admin only)
    - _Requirements: 4.1_

- [ ] 10. Implement global error handling and validation middleware
  - [ ] 10.1 Create error handler middleware
    - Handle Mongoose validation errors
    - Handle duplicate key errors
    - Handle JWT errors
    - Handle generic errors with appropriate status codes
    - _Requirements: 7.1, 7.3, 7.5_
  - [ ] 10.2 Create request validation middleware using express-validator
    - Add validation chains for each route
    - Return descriptive error messages
    - _Requirements: 7.1_
  - [ ]* 10.3 Write property tests for API validation
    - **Property 42: Input type validation**
    - **Property 43: Malformed JSON rejection**
    - **Property 44: Error handling and logging**
    - **Validates: Requirements 7.1, 7.3, 7.5**

- [ ] 11. Set up Express server and configure middleware
  - [x] 11.1 Create server.js with Express app setup

    - Configure body parser for JSON
    - Configure CORS with appropriate origins
    - Add security headers with Helmet
    - Register all route handlers
    - Register error handling middleware
    - Start server on configured port
    - _Requirements: 12.1, 12.3, 12.4_
  - [x] 11.2 Add environment-specific configuration

    - Load environment variables
    - Validate required environment variables on startup
    - Configure logging based on NODE_ENV
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

- [ ] 12. Checkpoint - Ensure all backend tests pass
  - Ensure all tests pass, ask the user if questions arise.


- [x] 13. Initialize React frontend application


  - [x] 13.1 Set up React Router for navigation


    - Configure routes for all pages
    - Create ProtectedRoute component for authenticated routes
    - _Requirements: 8.2, 8.5_
  - [ ]* 13.2 Write property test for navigation
    - **Property 45: Navigation updates URL**
    - **Property 47: Unauthenticated redirect**
    - **Validates: Requirements 8.2, 8.5**


  - [x] 13.3 Create AuthContext for state management

    - Implement login, logout, and user state
    - Add token storage in localStorage


    - Add automatic token loading on app start
    - _Requirements: 1.3, 1.5_
  - [x] 13.4 Create API service with Axios

    - Configure base URL from environment
    - Add request interceptor for auth token
    - Add response interceptor for error handling
    - _Requirements: 8.3_
  - [ ]* 13.5 Write property test for API error handling
    - **Property 46: API error display**
    - **Validates: Requirements 8.3**

- [x] 14. Build authentication pages and components



  - [x] 14.1 Create Register page component


    - Build registration form with name, email, password fields
    - Add client-side validation
    - Handle form submission and API errors
    - Redirect to login on success




    - _Requirements: 1.1, 1.2_
  - [x] 14.2 Create Login page component


    - Build login form with email and password fields
    - Handle form submission
    - Store JWT token on successful login
    - Redirect to dashboard

    - _Requirements: 1.3, 1.4_
  - [x] 14.3 Create Logout functionality



    - Clear token from storage

    - Clear user state


    - Redirect to home page
    - _Requirements: 1.5_

- [x] 15. Build civic issue reporting and browsing interface

  - [x] 15.1 Create IssueForm component


    - Build form with title, description, category, location fields
    - Add image upload input
    - Add client-side validation


    - Handle form submission with multipart data
    - Display success/error messages
    - _Requirements: 2.1, 2.3, 2.5_


  - [ ] 15.2 Create IssueCard component
    - Display issue summary (title, category, status, location)


    - Add status badge with color coding


    - Add click handler to navigate to detail page
    - _Requirements: 3.1, 3.4_
  - [ ] 15.3 Create IssueList page component
    - Fetch and display list of issues
    - Add filter controls for status and category

    - Add search input for keyword search
    - Implement pagination controls
    - Display issues using IssueCard components
    - _Requirements: 3.1, 3.2, 3.3, 3.5_
  - [ ] 15.4 Create IssueDetail page component
    - Fetch and display complete issue information
    - Display submitter information
    - Display status history
    - Display issue image if present
    - Add status update form for admin users
    - _Requirements: 3.4, 4.1, 4.2_

- [x] 16. Build event management interface


  - [x] 16.1 Create EventCard component


    - Display event summary (title, date, time, location)



    - Show registration status
    - Add register/unregister button
    - _Requirements: 9.2, 9.3_


  - [ ] 16.2 Create EventList page component
    - Fetch and display upcoming events
    - Display events using EventCard components
    - Handle event registration/unregistration


    - Show success/error messages
    - _Requirements: 9.2, 9.3, 9.4_
  - [x] 16.3 Create EventForm component for admins


    - Build form with title, description, eventType, date, time, location, capacity fields
    - Add validation
    - Handle form submission
    - _Requirements: 9.1_

- [x] 17. Build survey interface


  - [x] 17.1 Create SurveyCard component

    - Display survey title and description
    - Add button to take survey
    - Show completion status
    - _Requirements: 10.1_
  - [x] 17.2 Create SurveyForm component


    - Dynamically render questions based on type
    - Handle multiple-choice, text, rating, and yes-no questions
    - Add validation for required questions
    - Handle form submission
    - _Requirements: 10.2_





  - [ ] 17.3 Create SurveyList page component
    - Fetch and display active surveys
    - Display surveys using SurveyCard components
    - Navigate to survey form on click


    - _Requirements: 10.1, 10.2_


  - [x] 17.4 Create SurveyResults component for admins


    - Fetch and display aggregated results
    - Visualize statistics for each question


    - _Requirements: 10.4_




- [x] 18. Build user profile and dashboard


  - [ ] 18.1 Create Profile page component
    - Display user information
    - Add edit form for name, email, location
    - Add interests selection interface
    - Add password change form
    - Display list of submitted issues
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 11.1, 11.2, 11.3_
  - [x] 18.2 Create Dashboard page component


    - Display personalized issue feed based on interests and location
    - Display relevant upcoming events
    - Display active surveys
    - Add quick links to create issue, view events, take surveys
    - _Requirements: 11.4, 11.5_

- [ ] 19. Build admin dashboard interface
  - [x] 19.1 Create AdminDashboard page component


    - Fetch and display dashboard statistics
    - Show total citizens, issues by status, upcoming events, active surveys
    - Add navigation to admin functions
    - _Requirements: 4.1_
  - [x] 19.2 Create CitizenList component for admins


    - Display list of all citizens
    - Add role update functionality
    - _Requirements: 4.1_

- [ ] 20. Create Home/Landing page
  - [x] 20.1 Build landing page component

    - Add hero section with platform overview
    - Add features section highlighting key capabilities
    - Add call-to-action buttons (Register, Login, Browse Issues)
    - Add responsive layout
    - _Requirements: 8.1_

- [ ] 21. Add responsive styling and UI polish
  - [x] 21.1 Implement responsive CSS for all components

    - Ensure mobile-friendly layouts
    - Add breakpoints for tablet and desktop
    - Test on various screen sizes
    - _Requirements: 8.1_
  - [x] 21.2 Add loading states and spinners

    - Show loading indicators during API calls
    - Add skeleton screens for better UX
    - _Requirements: 8.4_
  - [ ] 21.3 Add toast notifications for user feedback
    - Implement toast system for success/error messages
    - Add notifications for all user actions
    - _Requirements: 8.3_

- [ ] 22. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 23. Create README and documentation
  - [x] 23.1 Write comprehensive README.md



    - Add project overview and features
    - Add installation instructions
    - Add environment variable configuration
    - Add API documentation
    - Add deployment instructions
  - [ ] 23.2 Add inline code comments
    - Document complex logic
    - Add JSDoc comments for functions
    - Document API endpoints
