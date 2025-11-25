import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const GovernanceCouncil = () => {
  const { isAdmin } = useAuth()
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    term: '2024-2025',
    photo: '',
    bio: '',
    email: ''
  })

  const roles = [
    'Women Representative',
    'Youth Member',
    'Local Business Leader',
    'NGO/Academic Representative',
    'Civic Volunteer Lead',
    'PPC Coordinator'
  ]

  useEffect(() => {
    if (isAdmin) {
      fetchMembers()
    }
  }, [isAdmin])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const response = await api.get('/governance/admin/council')
      setMembers(response.members || [])
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to load council members')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      if (editingMember) {
        await api.put(`/governance/admin/council/${editingMember._id}`, formData)
        setSuccess('Council member updated successfully!')
      } else {
        await api.post('/governance/admin/council', formData)
        setSuccess('Council member created successfully!')
      }
      
      setFormData({
        name: '',
        role: '',
        term: '2024-2025',
        photo: '',
        bio: '',
        email: ''
      })
      setShowForm(false)
      setEditingMember(null)
      fetchMembers()
    } catch (err) {
      setError(err.message || 'Failed to save council member')
    }
  }

  const handleEdit = (member) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      role: member.role,
      term: member.term,
      photo: member.photo || '',
      bio: member.bio || '',
      email: member.email || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (memberId) => {
    if (!confirm('Are you sure you want to deactivate this council member?')) {
      return
    }

    try {
      await api.delete(`/governance/admin/council/${memberId}`)
      setSuccess('Council member deactivated successfully!')
      fetchMembers()
    } catch (err) {
      setError(err.message || 'Failed to deactivate council member')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      term: '2024-2025',
      photo: '',
      bio: '',
      email: ''
    })
    setShowForm(false)
    setEditingMember(null)
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Council Members</h1>
          <p className="text-gray-600 mt-2">Manage Local Sangha Council members</p>
        </div>
        <Button onClick={() => setShowForm(true)} disabled={showForm}>
          Add New Member
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
            <CardTitle>{editingMember ? 'Edit' : 'Add'} Council Member</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role *</Label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    required
                  >
                    <option value="">Select Role</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="term">Term</Label>
                  <Input
                    id="term"
                    value={formData.term}
                    onChange={(e) => setFormData({...formData, term: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="photo">Photo URL</Label>
                <Input
                  id="photo"
                  value={formData.photo}
                  onChange={(e) => setFormData({...formData, photo: e.target.value})}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  rows="3"
                  placeholder="Brief bio about the council member..."
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {editingMember ? 'Update' : 'Create'} Member
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Members List */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading council members...</p>
        </div>
      )}

      {!loading && members.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <Card key={member._id} className={!member.isActive ? 'opacity-50' : ''}>
              <CardContent className="pt-6">
                <div className="text-center">
                  {member.photo && (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                  )}
                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{member.role}</p>
                  <p className="text-xs text-gray-500 mb-2">Term: {member.term}</p>
                  {member.email && (
                    <p className="text-xs text-gray-500 mb-2">{member.email}</p>
                  )}
                  {member.bio && (
                    <p className="text-sm text-gray-700 mb-4">{member.bio}</p>
                  )}
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(member)}>
                      Edit
                    </Button>
                    {member.isActive && (
                      <Button size="sm" variant="outline" onClick={() => handleDelete(member._id)}>
                        Deactivate
                      </Button>
                    )}
                  </div>
                  {!member.isActive && (
                    <p className="text-xs text-red-500 mt-2">Inactive</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && members.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-gray-500">
            No council members found. Add the first member to get started.
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default GovernanceCouncil