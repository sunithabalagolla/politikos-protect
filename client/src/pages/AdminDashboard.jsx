import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { 
  Users, 
  FileText, 
  Calendar, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  ArrowRight,
  RefreshCw,
  Clock
} from 'lucide-react'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Real data from API
  const [stats, setStats] = useState({
    totalCitizens: 0,
    totalIssues: 0,
    upcomingEvents: 0,
    activeSurveys: 0,
    issuesByStatus: {
      open: 0,
      'in-progress': 0,
      resolved: 0,
      closed: 0
    }
  })

  // Fetch dashboard stats
  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const token = localStorage.getItem('token')
      
      // Fetch dashboard stats
      const statsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (statsResponse.data.success) {
        setStats(statsResponse.data.data)
      }

      // Fetch recent activity
      const activityResponse = await axios.get(`${import.meta.env.VITE_API_URL}/admin/recent-activity`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (activityResponse.data.success) {
        setRecentActivity(activityResponse.data.data)
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError(err.response?.data?.error?.message || 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  // Fetch on component mount
  useEffect(() => {
    fetchDashboardStats()
  }, [])

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchDashboardStats()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const statCards = [
    { 
      title: 'Total Citizens', 
      value: stats.totalCitizens, 
      icon: Users,
      change: '+12%',
      changeType: 'increase',
      color: 'blue',
      href: '/admin/citizens'
    },
    { 
      title: 'Total Issues', 
      value: stats.totalIssues, 
      icon: FileText,
      change: '+8%',
      changeType: 'increase',
      color: 'purple',
      href: '/admin/issues'
    },
    { 
      title: 'Upcoming Events', 
      value: stats.upcomingEvents, 
      icon: Calendar,
      change: '+5%',
      changeType: 'increase',
      color: 'emerald',
      href: '/admin/events'
    },
    { 
      title: 'Active Surveys', 
      value: stats.activeSurveys, 
      icon: BarChart3,
      change: '-3%',
      changeType: 'decrease',
      color: 'amber',
      href: '/admin/surveys'
    },
  ]

  const [recentActivity, setRecentActivity] = useState([])

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      amber: 'bg-amber-50 text-amber-700 border-amber-200',
    }
    return colors[color] || colors.blue
  }

  // Format timestamp to relative time
  const getRelativeTime = (timestamp) => {
    const now = new Date()
    const past = new Date(timestamp)
    const diffInSeconds = Math.floor((now - past) / 1000)

    if (diffInSeconds < 60) return 'just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
    return past.toLocaleDateString()
  }

  // Get icon component from icon name
  const getIconComponent = (iconName) => {
    const icons = { Users, FileText, Calendar, BarChart3 }
    return icons[iconName] || FileText
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-semibold">Error loading dashboard</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
          <button
            onClick={fetchDashboardStats}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon
          const TrendIcon = card.changeType === 'increase' ? TrendingUp : TrendingDown
          
          return (
            <div
              key={index}
              onClick={() => navigate(card.href)}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg ${getColorClasses(card.color)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded ${
                  card.changeType === 'increase' 
                    ? 'text-emerald-700 bg-emerald-50' 
                    : 'text-red-700 bg-red-50'
                }`}>
                  <TrendIcon className="w-3 h-3" />
                  <span>{card.change}</span>
                </span>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value.toLocaleString()}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Issues Overview */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Issues Overview</h2>
              <p className="text-sm text-gray-500 mt-1">Current status distribution</p>
            </div>
            <button 
              onClick={() => navigate('/admin/issues')}
              className="flex items-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Open', value: stats.issuesByStatus.open, color: 'blue' },
              { label: 'In Progress', value: stats.issuesByStatus['in-progress'], color: 'amber' },
              { label: 'Resolved', value: stats.issuesByStatus.resolved, color: 'emerald' },
              { label: 'Closed', value: stats.issuesByStatus.closed, color: 'gray' },
            ].map((status, index) => {
              const percentage = Math.round((status.value / stats.totalIssues) * 100)
              
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {status.label}
                    </span>
                    <span className="text-xs text-gray-400">{percentage}%</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-3">{status.value}</p>
                  
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        status.color === 'blue' ? 'bg-blue-600' :
                        status.color === 'amber' ? 'bg-amber-500' :
                        status.color === 'emerald' ? 'bg-emerald-500' :
                        'bg-gray-400'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            <p className="text-sm text-gray-500 mt-1">Latest updates</p>
          </div>
          
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
            ) : (
              recentActivity.map((activity, index) => {
                const Icon = getIconComponent(activity.icon)
                
                return (
                  <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 font-medium">{activity.text}</p>
                      <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{getRelativeTime(activity.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard