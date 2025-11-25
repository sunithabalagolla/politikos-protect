import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

const IssueCard = ({ issue }) => {
  const navigate = useNavigate()

  const getStatusColor = (status) => {
    const colors = {
      'open': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'resolved': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const formatCategory = (category) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const handleClick = () => {
    navigate(`/issues/${issue._id}`)
  }

  return (
    <Card 
      className="cursor-pointer hover-lift border-0 shadow-md hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur group overflow-hidden"
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="relative z-10">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{issue.title}</CardTitle>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusColor(issue.status)} transition-transform group-hover:scale-110`}>
            {issue.status.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </span>
        </div>
        <CardDescription className="flex items-center gap-2 mt-2">
          <span className="font-medium">{formatCategory(issue.category)}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            📍 {issue.location?.address || 'Location not specified'}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
          {issue.description}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t">
          <span className="flex items-center gap-1">
            🕒 {formatDate(issue.createdAt)}
          </span>
          {issue.submittedBy?.name && (
            <span className="flex items-center gap-1 font-medium">
              👤 {issue.submittedBy.name}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default IssueCard
