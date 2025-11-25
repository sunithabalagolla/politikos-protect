import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Landmark, 
  Scale, 
  FileText, 
  Calendar, 
  BarChart3,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Citizens', href: '/admin/citizens', icon: Users },
    { name: 'Council', href: '/admin/governance/council', icon: Landmark },
    { name: 'Decisions', href: '/admin/governance/decisions', icon: Scale },
    { name: 'Issues', href: '/admin/issues', icon: FileText },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Surveys', href: '/admin/surveys', icon: BarChart3 },
  ]

  const isActive = (href) => {
    if (href === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300`}>
      
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">Politikos</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        )}
        
        {isCollapsed && (
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
            <Landmark className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.href)}
              className={`
                w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${active 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-50'
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
              title={isCollapsed ? item.name : ''}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
              {!isCollapsed && <span>{item.name}</span>}
              {active && !isCollapsed && (
                <div className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Collapse Toggle - Professional Design */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
            group relative w-full flex items-center justify-center px-3 py-2.5 rounded-lg 
            text-gray-600 hover:text-gray-900 hover:bg-gray-100 
            transition-all duration-200
            ${isCollapsed ? '' : 'hover:shadow-sm'}
          `}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {/* Background Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-200" />
          
          {/* Content */}
          <div className="relative flex items-center justify-center w-full">
            {isCollapsed ? (
              <div className="flex flex-col items-center space-y-1">
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                <div className="flex space-x-0.5">
                  <div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-blue-500 transition-colors" />
                  <div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-blue-500 transition-colors delay-75" />
                  <div className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-blue-500 transition-colors delay-150" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  <span className="text-sm font-medium">Collapse</span>
                </div>
                <div className="flex space-x-0.5">
                  <div className="w-1 h-1 bg-gray-300 rounded-full group-hover:bg-blue-500 transition-colors" />
                  <div className="w-1 h-1 bg-gray-300 rounded-full group-hover:bg-blue-500 transition-colors delay-75" />
                  <div className="w-1 h-1 bg-gray-300 rounded-full group-hover:bg-blue-500 transition-colors delay-150" />
                </div>
              </div>
            )}
          </div>
        </button>
      </div>

      {/* System Status */}
      {!isCollapsed && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-600 font-medium">Online</span>
            </div>
            <span className="text-gray-400">v1.0.0</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminSidebar