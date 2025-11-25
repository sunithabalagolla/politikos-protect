import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

const SurveyCard = ({ survey, isCompleted }) => {
  const navigate = useNavigate()

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const handleTakeSurvey = () => {
    navigate(`/surveys/${survey._id}`)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{survey.title}</CardTitle>
            <CardDescription className="mt-1">
              Created: {formatDate(survey.createdAt)}
            </CardDescription>
          </div>
          {isCompleted && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Completed
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700 line-clamp-3">{survey.description}</p>

        <div className="text-sm text-gray-600">
          <span className="font-semibold">{survey.questions?.length || 0}</span> questions
        </div>

        <Button 
          className="w-full"
          onClick={handleTakeSurvey}
          disabled={isCompleted}
        >
          {isCompleted ? 'Already Completed' : 'Take Survey'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default SurveyCard
