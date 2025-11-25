# Politikos People Center

A comprehensive civic engagement platform that empowers citizens to report issues, participate in community events, and share their voice through surveys.

## Features

### For Citizens
- **Report Civic Issues**: Document and track community problems with photos and location data
- **Browse & Filter Issues**: Search and filter issues by status, category, and keywords
- **Community Events**: Discover and register for town halls, workshops, and community meetings
- **Participate in Surveys**: Share feedback on community initiatives and local policies
- **User Profiles**: Manage personal information, interests, and view submitted issues
- **Personalized Dashboard**: See relevant issues, events, and surveys based on your interests

### For Administrators
- **Admin Dashboard**: View platform statistics and manage all aspects of the system
- **Issue Management**: Update issue statuses, add comments, and track resolution progress
- **Event Creation**: Schedule and manage community events
- **Survey Management**: Create surveys, view results, and close completed surveys
- **Citizen Management**: View all users and manage roles

## Tech Stack

### Backend
- **Node.js** with **Express.js** - RESTful API server
- **MongoDB** with **Mongoose** - Database and ODM
- **JWT** - Authentication and authorization
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:5173` or `http://localhost:5174`

## Usage

### Creating an Admin User

After registering a regular user, you can promote them to admin using the provided script:

```bash
cd server
node make-admin.js user@example.com
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

#### Issues
- `GET /api/issues` - Get all issues (with filters)
- `GET /api/issues/:id` - Get single issue
- `POST /api/issues` - Create new issue (protected)
- `PUT /api/issues/:id/status` - Update issue status (admin only)
- `POST /api/issues/:id/comments` - Add status comment (admin only)

#### Events
- `GET /api/events` - Get upcoming events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (admin only)
- `POST /api/events/:id/register` - Register for event (protected)
- `DELETE /api/events/:id/register` - Unregister from event (protected)

#### Surveys
- `GET /api/surveys` - Get active surveys
- `GET /api/surveys/:id` - Get single survey
- `POST /api/surveys` - Create survey (admin only)
- `POST /api/surveys/:id/responses` - Submit survey response (protected)
- `GET /api/surveys/:id/results` - Get survey results (admin only)
- `PUT /api/surveys/:id/close` - Close survey (admin only)

#### Citizens
- `GET /api/citizens/:id` - Get citizen profile
- `PUT /api/citizens/:id` - Update profile (protected)
- `PUT /api/citizens/:id/password` - Change password (protected)
- `PUT /api/citizens/:id/interests` - Update interests (protected)
- `PUT /api/citizens/:id/location` - Update location (protected)
- `GET /api/citizens/:id/issues` - Get citizen's submitted issues

#### Admin
- `GET /api/admin/dashboard` - Get dashboard statistics (admin only)
- `GET /api/admin/citizens` - Get all citizens (admin only)
- `PUT /api/admin/citizens/:id/role` - Update citizen role (admin only)

## Project Structure

```
politikos-people-center/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React context providers
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   └── lib/           # Utility functions
│   └── public/            # Static assets
│
├── server/                # Express backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   └── uploads/          # Uploaded files
│
└── README.md
```

## Development

### Running Tests
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

### Building for Production

#### Backend
```bash
cd server
npm start
```

#### Frontend
```bash
cd client
npm run build
```

The build output will be in the `client/dist` directory.

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - JWT expiration time (e.g., "7d")
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@politikos.example.com or open an issue in the repository.
