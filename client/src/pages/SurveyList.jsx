import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import SurveyCard from '../components/surveys/SurveyCard'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

const SurveyList = () => {
  const [surveys, setSurveys] = useState([])
  const [completedSurveys, setCompletedSurveys] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user, isAdmin } = useAuth()

  useEffect(() => {
    fetchSurveys()
  }, [])

  const fetchSurveys = async () => {
    try {
      setLoading(true)
      const response = await api.get('/surveys')
      setSurveys(response.surveys || response)
      
      // If user is logged in, check which surveys they've completed
      if (user) {
        // This would require an endpoint to get user's completed surveys
        // For now, we'll leave it as an empty set
        // In a real implementation, you'd fetch this data
      }
      
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to load surveys')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Community Surveys</h1>
        {isAdmin && (
          <Link to="/surveys/new">
            <Button>Create New Survey</Button>
          </Link>
        )}
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md mb-6">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading surveys...</p>
        </div>
      )}

      {!loading && surveys.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surveys.map((survey) => (
            <SurveyCard 
              key={survey._id} 
              survey={survey}
              isCompleted={completedSurveys.has(survey._id)}
            />
          ))}
        </div>
      )}

      {!loading && surveys.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No active surveys at this time.</p>
          <p className="text-gray-500">Check back later for new community surveys!</p>
        </div>
      )}
    </div>
  )
}

export default SurveyList
