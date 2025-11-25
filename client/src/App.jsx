import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navigation from './components/Navigation'
import AdminLayout from './components/AdminLayout'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Governance from './pages/Governance'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import IssueList from './pages/IssueList'
import IssueDetail from './pages/IssueDetail'
import EventList from './pages/EventList'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import CitizenList from './pages/CitizenList'
import IssueForm from './components/issues/IssueForm'
import EventForm from './components/events/EventForm'
import SurveyList from './pages/SurveyList'
import SurveyForm from './components/surveys/SurveyForm'
import SurveyResults from './components/surveys/SurveyResults'
import Roadmap from './pages/Roadmap'
import GovernanceCouncil from './pages/admin/GovernanceCouncil'
import GovernanceDecisions from './pages/admin/GovernanceDecisions'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Public Routes with Navigation */}
          <Route path="/" element={<><Navigation /><Home /></>} />
          <Route path="/about" element={<><Navigation /><About /></>} />
          <Route path="/governance" element={<><Navigation /><Governance /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/roadmap" element={<><Navigation /><Roadmap /></>} />
          <Route path="/issues" element={<><Navigation /><IssueList /></>} />
          <Route path="/issues/:id" element={<><Navigation /><IssueDetail /></>} />
          <Route path="/events" element={<><Navigation /><EventList /></>} />
          <Route path="/surveys" element={<><Navigation /><SurveyList /></>} />
          <Route path="/surveys/:id" element={<><Navigation /><SurveyForm /></>} />
          <Route path="/surveys/:id/results" element={<><Navigation /><SurveyResults /></>} />

          {/* Protected Routes with Navigation */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navigation />
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Navigation />
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes with AdminLayout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/citizens"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <CitizenList />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/governance/council"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <GovernanceCouncil />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/governance/decisions"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <GovernanceDecisions />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/issues"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <IssueList />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <EventList />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/surveys"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <SurveyList />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Form Routes with Navigation */}
          <Route
            path="/issues/new"
            element={
              <ProtectedRoute>
                <Navigation />
                <div className="container mx-auto px-4 py-8">
                  <IssueForm />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/new"
            element={
              <ProtectedRoute>
                <Navigation />
                <div className="container mx-auto px-4 py-8">
                  <EventForm />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
