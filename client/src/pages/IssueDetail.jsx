import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

const IssueDetail = () => {
  const { id } = useParams()
  const { user, isAdmin } = useAuth()
  const [issue, setIssue] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusUpdate, setStatusUpdate] = useState({
    status: '',
    comment: ''
  })
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchIssue()
  }, [id])

  const fetchIssue = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/issues/${id}`)
      // The API service returns response.data.data, which contains { issue }
      const issueData = response.issue || response
      setIssue(issueData)
      setStatusUpdate({ status: issueData.status || 'open', comment: '' })
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to load issue')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (e) => {
    e.preventDefault()
    
    if (statusUpdate.status === 'resolved' && !statusUpdate.comment) {
      setError('A comment is required when marking an issue as resolved')
      return
    }

    try {
      setUpdating(true)
      await api.put(`/issues/${id}/status`, statusUpdate)
      await fetchIssue() // Refresh issue data
      setStatusUpdate({ ...statusUpdate, comment: '' })
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to update status')
    } finally {
      setUpdating(false)
    }
  }

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
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Loading issue...</p>
      </div>
    )
  }

  if (error && !issue) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
          {error}
        </div>
        <Link to="/issues" className="inline-block mt-4">
          <Button variant="outline">Back to Issues</Button>
        </Link>
      </div>
    )
  }

  if (!issue) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/issues" className="inline-block mb-4">
        <Button variant="outline">← Back to Issues</Button>
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Issue Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl">{issue.title}</CardTitle>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(issue.status)}`}>
                  {issue.status ? issue.status.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ') : 'Unknown'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{issue.description}</p>
              </div>

              {issue.imageUrl && (
                <div>
                  <h3 className="font-semibold mb-2">Image</h3>
                  <img 
                    src={issue.imageUrl} 
                    alt="Issue" 
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{formatCategory(issue.category)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">
                    {issue.location?.address}
                    {issue.location?.city && `, ${issue.location.city}`}
                    {issue.location?.state && `, ${issue.location.state}`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submitted By</p>
                  <p className="font-medium">{issue.submittedBy?.name || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submitted On</p>
                  <p className="font-medium">{formatDate(issue.createdAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status History */}
          {issue.statusHistory && issue.statusHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Status History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {issue.statusHistory.map((history, index) => (
                    <div key={index} className="border-l-2 border-gray-300 pl-4">
                      <div className="flex justify-between items-start">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(history.status)}`}>
                          {history.status ? history.status.split('-').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ') : 'Unknown'}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(history.updatedAt)}
                        </span>
                      </div>
                      {history.comment && (
                        <p className="text-sm text-gray-700 mt-2">{history.comment}</p>
                      )}
                      {history.updatedBy?.name && (
                        <p className="text-xs text-gray-500 mt-1">
                          By: {history.updatedBy.name}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Admin Actions Sidebar */}
        {isAdmin && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Update Status</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStatusUpdate} className="space-y-4">
                  {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="status">New Status</Label>
                    <select
                      id="status"
                      value={statusUpdate.status}
                      onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comment">
                      Comment {statusUpdate.status === 'resolved' && '(Required)'}
                    </Label>
                    <textarea
                      id="comment"
                      value={statusUpdate.comment}
                      onChange={(e) => setStatusUpdate({ ...statusUpdate, comment: e.target.value })}
                      placeholder="Add a comment about this status change..."
                      rows={4}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={updating}>
                    {updating ? 'Updating...' : 'Update Status'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default IssueDetail
