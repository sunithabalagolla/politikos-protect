import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import IssueCard from '../components/issues/IssueCard'
import EventCard from '../components/events/EventCard'
import SurveyCard from '../components/surveys/SurveyCard'
import api from '../services/api'

const Dashboard = () => {
  const { user, isAdmin, logout } = useAuth()
  const [recentIssues, setRecentIssues] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [activeSurveys, setActiveSurveys] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch recent issues (filtered by user's interests if available)
      const issuesParams = new URLSearchParams()
      if (user?.interests?.length > 0) {
        issuesParams.append('category', user.interests[0]) // Use first interest as filter
      }
      issuesParams.append('limit', '3')
      const issuesResponse = await api.get(`/issues?${issuesParams.toString()}`)
      setRecentIssues(issuesResponse.issues || issuesResponse)

      // Fetch upcoming events
      const eventsResponse = await api.get('/events')
      const events = eventsResponse.events || eventsResponse
      setUpcomingEvents(events.slice(0, 3)) // Get first 3 events

      // Fetch active surveys
      const surveysResponse = await api.get('/surveys')
      const surveys = surveysResponse.surveys || surveysResponse
      setActiveSurveys(surveys.slice(0, 3)) // Get first 3 surveys
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 animate-fade-in">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/20">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-gray-600 text-lg">Here's what's happening in your community</p>
              </div>
            </div>
          </div>
        </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Link to="/issues/new" className="group">
          <Card className="hover-lift border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white cursor-pointer overflow-hidden relative animate-fade-in stagger-1">
            <div className="absolute inset-0 bg-white/10 transform -skew-y-6 group-hover:skew-y-0 transition-transform duration-500"></div>
            <CardContent className="pt-8 pb-8 relative z-10">
              <div className="text-center">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">📝</div>
                <h3 className="font-bold text-xl mb-2">Report an Issue</h3>
                <p className="text-blue-100">Help improve your community</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/events" className="group">
          <Card className="hover-lift border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white cursor-pointer overflow-hidden relative animate-fade-in stagger-2">
            <div className="absolute inset-0 bg-white/10 transform -skew-y-6 group-hover:skew-y-0 transition-transform duration-500"></div>
            <CardContent className="pt-8 pb-8 relative z-10">
              <div className="text-center">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">📅</div>
                <h3 className="font-bold text-xl mb-2">Browse Events</h3>
                <p className="text-purple-100">Join community activities</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/surveys" className="group">
          <Card className="hover-lift border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white cursor-pointer overflow-hidden relative animate-fade-in stagger-3">
            <div className="absolute inset-0 bg-white/10 transform -skew-y-6 group-hover:skew-y-0 transition-transform duration-500"></div>
            <CardContent className="pt-8 pb-8 relative z-10">
              <div className="text-center">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">📊</div>
                <h3 className="font-bold text-xl mb-2">Take Surveys</h3>
                <p className="text-green-100">Share your opinions</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Recent Issues */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Recent Issues</h2>
              <Link to="/issues">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            {recentIssues.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentIssues.map((issue) => (
                  <IssueCard key={issue._id} issue={issue} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-gray-500">
                  No recent issues found
                </CardContent>
              </Card>
            )}
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Upcoming Events</h2>
              <Link to="/events">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            {upcomingEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event._id} event={event} onUpdate={fetchDashboardData} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-gray-500">
                  No upcoming events
                </CardContent>
              </Card>
            )}
          </div>

          {/* Active Surveys */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Active Surveys</h2>
              <Link to="/surveys">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            {activeSurveys.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeSurveys.map((survey) => (
                  <SurveyCard key={survey._id} survey={survey} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-gray-500">
                  No active surveys
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Dashboard
