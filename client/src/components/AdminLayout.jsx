import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Search, Bell, Settings, LogOut, User, HelpCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AdminSidebar from './AdminSidebar'

const AdminLayout = ({ children }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/recent-activity`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (response.data.success) {
        // Take only the 3 most recent for notifications (more focused)
        const recentActivities = response.data.data.slice(0, 3).map((activity, index) => ({
          id: index + 1,
          text: activity.text,
          time: getRelativeTime(activity.timestamp),
          unread: index < 2 // Mark first 2 as unread for demo
        }))
        setNotifications(recentActivities)
      }
    } catch (err) {
      console.error('Error fetching notifications:', err)
    }
  }

  // Format timestamp to relative time
  const getRelativeTime = (timestamp) => {
    const now = new Date()
    const past = new Date(timestamp)
    const diffInSeconds = Math.floor((now - past) / 1000)

    if (diffInSeconds < 60) return 'just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hour${Math.floor(diffInSeconds / 3600) > 1 ? 's' : ''} ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} day${Math.floor(diffInSeconds / 86400) > 1 ? 's' : ''} ago`
    return past.toLocaleDateString()
  }

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search citizens, issues, events..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSearchResults(e.target.value.length > 0)
                }}
                onFocus={() => searchQuery.length > 0 && setShowSearchResults(true)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchQuery.length > 0 && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowSearchResults(false)} />
                  <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 max-h-96 overflow-y-auto">
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-xs text-gray-500 font-medium">Quick Navigation</p>
                    </div>
                    
                    {/* Search Suggestions */}
                    <div className="py-2">
                      {[
                        { name: 'Citizens', path: '/admin/citizens', icon: '👥', desc: 'Manage registered citizens' },
                        { name: 'Council Members', path: '/admin/governance/council', icon: '🏛️', desc: 'View governance council' },
                        { name: 'Decisions', path: '/admin/governance/decisions', icon: '⚖️', desc: 'Governance decisions' },
                        { name: 'Issues', path: '/admin/issues', icon: '📋', desc: 'Civic issues and reports' },
                        { name: 'Events', path: '/admin/events', icon: '📅', desc: 'Community events' },
                        { name: 'Surveys', path: '/admin/surveys', icon: '📊', desc: 'Polls and surveys' },
                      ]
                        .filter(item => 
                          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((item) => (
                          <button
                            key={item.path}
                            onClick={() => {
                              navigate(item.path)
                              setSearchQuery('')
                              setShowSearchResults(false)
                            }}
                            className="w-full flex items-start space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-2xl">{item.icon}</span>
                            <div className="flex-1 text-left">
                              <p className="text-sm font-medium text-gray-900">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.desc}</p>
                            </div>
                          </button>
                        ))}
                      
                      {[
                        { name: 'Citizens', path: '/admin/citizens', icon: '👥', desc: 'Manage registered citizens' },
                        { name: 'Council Members', path: '/admin/governance/council', icon: '🏛️', desc: 'View governance council' },
                        { name: 'Decisions', path: '/admin/governance/decisions', icon: '⚖️', desc: 'Governance decisions' },
                        { name: 'Issues', path: '/admin/issues', icon: '📋', desc: 'Civic issues and reports' },
                        { name: 'Events', path: '/admin/events', icon: '📅', desc: 'Community events' },
                        { name: 'Surveys', path: '/admin/surveys', icon: '📊', desc: 'Polls and surveys' },
                      ]
                        .filter(item => 
                          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase())
                        ).length === 0 && (
                        <div className="px-4 py-8 text-center">
                          <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">No results found for "{searchQuery}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 ml-6">
            
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications)
                  setShowProfileMenu(false)
                }}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                          <span className="text-xs text-blue-600 font-medium">{unreadCount} new</span>
                        )}
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-sm text-gray-500">No notifications yet</p>
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                              notif.unread ? 'bg-blue-50/50' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <p className="text-sm text-gray-900">{notif.text}</p>
                              {notif.unread && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-1 ml-2" />
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-200" />

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu)
                  setShowNotifications(false)
                }}
                className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                    
                    {/* User Info */}
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                          {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'Admin'}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email || 'admin@politikos.com'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button 
                        onClick={() => {
                          navigate('/profile')
                          setShowProfileMenu(false)
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </button>
                      <button 
                        onClick={() => {
                          navigate('/')
                          setShowProfileMenu(false)
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Public Site</span>
                      </button>
                      <button 
                        onClick={() => {
                          // You can add a help page route later
                          setShowProfileMenu(false)
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <HelpCircle className="w-4 h-4" />
                        <span>Help & Support</span>
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-200 py-2">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout