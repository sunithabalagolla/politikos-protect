import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const GovernanceDecisions = () => {
  const { isAdmin, user } = useAuth() 
  const [decisions, setDecisions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)


  const [editingDecision, setEditingDecision] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    proposedBy: '',
    category: 'Other',
    priority: 'Medium',
    notes: ''
  })

  const categories = ['Policy', 'Budget', 'Event', 'Partnership', 'Infrastructure', 'Other']
  const priorities = ['Low', 'Medium', 'High', 'Critical']
  const statuses = ['Proposed', 'In Deliberation', 'Voting', 'Approved', 'Rejected', 'Implemented']
  const stages = ['Deliberation', 'Consensus', 'Documentation', 'Implementation']

  useEffect(() => {
    if (isAdmin) {
      fetchDecisions()
    }
  }, [isAdmin])

  const fetchDecisions = async () => {
    try {
      setLoading(true)
      const response = await api.get('/governance/admin/decisions')
      setDecisions(response.decisions || [])
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to load governance decisions')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      if (editingDecision) {
        await api.put(`/governance/admin/decisions/${editingDecision._id}`, formData)
        setSuccess('Governance decision updated successfully!')
      } else {
        await api.post('/governance/admin/decisions', formData)
        setSuccess('Governance decision created successfully!')
      }
      
      setFormData({
        title: '',
        description: '',
        proposedBy: '',
        category: 'Other',
        priority: 'Medium',
        notes: ''
      })
      setShowForm(false)
      setEditingDecision(null)
      fetchDecisions()
    } catch (err) {
      setError(err.message || 'Failed to save governance decision')
    }
  }

  const handleEdit = (decision) => {
    setEditingDecision(decision)
    setFormData({
      title: decision.title,
      description: decision.description,
      proposedBy: decision.proposedBy,
      category: decision.category,
      priority: decision.priority,
      notes: decision.notes || ''
    })
    setShowForm(true)
  }

  const handleStatusUpdate = async (decisionId, updates) => {
    try {
      await api.put(`/governance/admin/decisions/${decisionId}`, updates)
      setSuccess('Decision updated successfully!')
      fetchDecisions()
    } catch (err) {
      setError(err.message || 'Failed to update decision')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      proposedBy: '',
      category: 'Other',
      priority: 'Medium',
      notes: ''
    })
    setShowForm(false)
    setEditingDecision(null)
  }

  const getStatusColor = (status) => {
    const colors = {
      'Proposed': 'bg-blue-100 text-blue-800',
      'In Deliberation': 'bg-yellow-100 text-yellow-800',
      'Voting': 'bg-purple-100 text-purple-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Implemented': 'bg-gray-100 text-gray-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority) => {
    const colors = {
      'Low': 'bg-gray-100 text-gray-800',
      'Medium': 'bg-blue-100 text-blue-800',
      'High': 'bg-orange-100 text-orange-800',
      'Critical': 'bg-red-100 text-red-800'
    }
    return colors[priority] || 'bg-gray-100 text-gray-800'
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-red-600">Access Denied. Admin privileges required.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Governance Decisions</h1>
          <p className="text-gray-600 mt-2">Track and manage Sangha decisions through the 3-stage process</p>
        </div>
        <Button onClick={() => setShowForm(true)} disabled={showForm}>
          Add New Decision
        </Button>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 text-sm text-green-500 bg-green-50 border border-green-200 rounded-md mb-6">
          {success}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingDecision ? 'Edit' : 'Add'} Governance Decision</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  rows="4"
                  required
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="proposedBy">Proposed By *</Label>
                  <Input
                    id="proposedBy"
                    value={formData.proposedBy}
                    onChange={(e) => setFormData({...formData, proposedBy: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  rows="3"
                  placeholder="Additional notes or context..."
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {editingDecision ? 'Update' : 'Create'} Decision
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Decisions List */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading governance decisions...</p>
        </div>
      )}

      {!loading && decisions.length > 0 && (
        <div className="space-y-6">
          {decisions.map((decision) => (
            <Card key={decision._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{decision.title}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Proposed by {decision.proposedBy} • {new Date(decision.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(decision.status)}`}>
                      {decision.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(decision.priority)}`}>
                      {decision.priority}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{decision.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Category: <span className="font-medium">{decision.category}</span></p>
                    <p className="text-sm text-gray-600">Stage: <span className="font-medium">{decision.stage}</span></p>
                  </div>
                  <div>
                    {decision.consensusRate > 0 && (
                      <p className="text-sm text-gray-600">
                        Consensus Rate: <span className="font-medium">{decision.consensusRate}%</span>
                      </p>
                    )}
                    {decision.totalVotes > 0 && (
                      <p className="text-sm text-gray-600">
                        Votes: <span className="text-green-600">{decision.votesFor}</span> / 
                        <span className="text-red-600">{decision.votesAgainst}</span> 
                        (Total: {decision.totalVotes})
                      </p>
                    )}
                  </div>
                </div>

                {decision.notes && (
                  <div className="bg-gray-50 p-3 rounded-md mb-4">
                    <p className="text-sm text-gray-700">{decision.notes}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(decision)}>
                    Edit
                  </Button>
                  
                  {/* Quick Status Updates */}
                  {decision.status === 'Proposed' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusUpdate(decision._id, { status: 'In Deliberation', stage: 'Deliberation' })}
                    >
                      Start Deliberation
                    </Button>
                  )}
                  
                  {decision.status === 'In Deliberation' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusUpdate(decision._id, { status: 'Voting', stage: 'Consensus' })}
                    >
                      Move to Voting
                    </Button>
                  )}

                  {decision.status === 'Voting' && (
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Votes For"
                        className="w-24 h-8"
                        onChange={(e) => decision.tempVotesFor = parseInt(e.target.value) || 0}
                      />
                      <Input
                        type="number"
                        placeholder="Against"
                        className="w-24 h-8"
                        onChange={(e) => decision.tempVotesAgainst = parseInt(e.target.value) || 0}
                      />
                      <Button 
                        size="sm"
                        onClick={() => handleStatusUpdate(decision._id, { 
                          votesFor: decision.tempVotesFor || 0,
                          votesAgainst: decision.tempVotesAgainst || 0
                        })}
                      >
                        Update Votes
                      </Button>
                    </div>
                  )}

                  {decision.status === 'Approved' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusUpdate(decision._id, { status: 'Implemented', stage: 'Implementation' })}
                    >
                      Mark Implemented
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && decisions.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-gray-500">
            No governance decisions found. Add the first decision to get started.
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Export the component as default
export default GovernanceDecisions