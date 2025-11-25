import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import api from '../../services/api'

const SurveyResults = () => {
  const { id } = useParams()
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResults()
  }, [id])

  const fetchResults = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/surveys/${id}/results`)
      setResults(response)
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to load survey results')
    } finally {
      setLoading(false)
    }
  }

  const renderQuestionResults = (question, questionResults) => {
    const { questionType } = question

    if (questionType === 'multiple-choice' || questionType === 'yes-no') {
      // Show distribution of answers
      const answerCounts = {}
      questionResults.forEach(answer => {
        answerCounts[answer] = (answerCounts[answer] || 0) + 1
      })

      const total = questionResults.length
      
      return (
        <div className="space-y-2">
          {Object.entries(answerCounts).map(([answer, count]) => {
            const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0
            return (
              <div key={answer} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{answer}</span>
                  <span className="font-medium">{count} ({percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    if (questionType === 'rating') {
      // Calculate average rating
      const ratings = questionResults.map(r => parseFloat(r)).filter(r => !isNaN(r))
      const average = ratings.length > 0 
        ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)
        : 'N/A'

      // Count distribution
      const ratingCounts = {}
      ratings.forEach(rating => {
        ratingCounts[rating] = (ratingCounts[rating] || 0) + 1
      })

      return (
        <div className="space-y-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Average Rating</p>
            <p className="text-3xl font-bold text-primary">{average}</p>
            <p className="text-sm text-gray-500">out of 5</p>
          </div>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = ratingCounts[rating] || 0
              const percentage = ratings.length > 0 
                ? ((count / ratings.length) * 100).toFixed(1)
                : 0
              return (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm w-12">{rating} stars</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm w-16 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    if (questionType === 'text') {
      // Show all text responses
      return (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {questionResults.length > 0 ? (
            questionResults.map((answer, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-md text-sm">
                {answer}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No responses yet</p>
          )}
        </div>
      )
    }

    return null
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Loading results...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md mb-4">
          {error}
        </div>
        <Link to="/surveys">
          <Button variant="outline">Back to Surveys</Button>
        </Link>
      </div>
    )
  }

  if (!results) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/surveys" className="inline-block mb-4">
        <Button variant="outline">← Back to Surveys</Button>
      </Link>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">{results.survey?.title}</CardTitle>
          <p className="text-gray-600">{results.survey?.description}</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Responses</p>
              <p className="text-3xl font-bold text-blue-600">{results.totalResponses || 0}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Questions</p>
              <p className="text-3xl font-bold text-green-600">{results.survey?.questions?.length || 0}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-xl font-bold text-purple-600 capitalize">{results.survey?.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {results.survey?.questions?.map((question, index) => {
          const questionResults = results.results?.[index]?.answers || []
          
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">
                  Question {index + 1}: {question.questionText}
                </CardTitle>
                <p className="text-sm text-gray-500 capitalize">
                  Type: {question.questionType.replace('-', ' ')} • 
                  {questionResults.length} response{questionResults.length !== 1 ? 's' : ''}
                </p>
              </CardHeader>
              <CardContent>
                {renderQuestionResults(question, questionResults)}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default SurveyResults
