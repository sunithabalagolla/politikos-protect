import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import api from '../../services/api'

const SurveyForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [survey, setSurvey] = useState(null)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchSurvey()
  }, [id])

  const fetchSurvey = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/surveys/${id}`)
      setSurvey(response)
      
      // Initialize answers object
      const initialAnswers = {}
      response.questions?.forEach((q, index) => {
        initialAnswers[index] = ''
      })
      setAnswers(initialAnswers)
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to load survey')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers({
      ...answers,
      [questionIndex]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validate required questions
    const unansweredRequired = survey.questions.some((q, index) => 
      q.required && (!answers[index] || answers[index] === '')
    )

    if (unansweredRequired) {
      setError('Please answer all required questions')
      return
    }

    try {
      setSubmitting(true)
      
      // Format answers for API
      const formattedAnswers = survey.questions.map((q, index) => ({
        questionId: q._id,
        answer: answers[index]
      }))

      await api.post(`/surveys/${id}/responses`, {
        answers: formattedAnswers
      })

      setSuccess('Survey submitted successfully!')
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/surveys')
      }, 2000)
    } catch (err) {
      setError(err.message || 'Failed to submit survey')
    } finally {
      setSubmitting(false)
    }
  }

  const renderQuestion = (question, index) => {
    const questionNumber = index + 1

    switch (question.questionType) {
      case 'multiple-choice':
        return (
          <div key={index} className="space-y-2">
            <Label htmlFor={`question-${index}`}>
              {questionNumber}. {question.questionText}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <select
              id={`question-${index}`}
              value={answers[index] || ''}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              required={question.required}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select an option</option>
              {question.options?.map((option, optIndex) => (
                <option key={optIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )

      case 'text':
        return (
          <div key={index} className="space-y-2">
            <Label htmlFor={`question-${index}`}>
              {questionNumber}. {question.questionText}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <textarea
              id={`question-${index}`}
              value={answers[index] || ''}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              required={question.required}
              rows={4}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Enter your answer..."
            />
          </div>
        )

      case 'rating':
        return (
          <div key={index} className="space-y-2">
            <Label htmlFor={`question-${index}`}>
              {questionNumber}. {question.questionText}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleAnswerChange(index, rating.toString())}
                  className={`px-4 py-2 rounded-md border ${
                    answers[index] === rating.toString()
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background hover:bg-gray-100'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500">1 = Poor, 5 = Excellent</p>
          </div>
        )

      case 'yes-no':
        return (
          <div key={index} className="space-y-2">
            <Label htmlFor={`question-${index}`}>
              {questionNumber}. {question.questionText}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleAnswerChange(index, 'Yes')}
                className={`px-6 py-2 rounded-md border ${
                  answers[index] === 'Yes'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-gray-100'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleAnswerChange(index, 'No')}
                className={`px-6 py-2 rounded-md border ${
                  answers[index] === 'No'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-gray-100'
                }`}
              >
                No
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Loading survey...</p>
      </div>
    )
  }

  if (error && !survey) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
          {error}
        </div>
      </div>
    )
  }

  if (!survey) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{survey.title}</CardTitle>
          <CardDescription>{survey.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 text-sm text-green-500 bg-green-50 border border-green-200 rounded-md">
                {success}
              </div>
            )}

            {survey.questions?.map((question, index) => renderQuestion(question, index))}

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/surveys')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="flex-1"
              >
                {submitting ? 'Submitting...' : 'Submit Survey'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SurveyForm
