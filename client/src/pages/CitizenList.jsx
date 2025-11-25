import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import api from '../services/api'

const CitizenList = () => {
  const { isAdmin } = useAuth()
  const [citizens, setCitizens] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    if (isAdmin) {
      fetchCitizens()
    }
  }, [isAdmin, page, search])

  const fetchCitizens = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      params.append('page', page)
      params.append('limit', 20)

      const response = await api.get(`/admin/citizens?${params.toString()}`)
      setCitizens(response.citizens || response)
      setTotalPages(response.pagination?.pages || 1)
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to load citizens')
    } finally {
      setLoading(false)
    }
  }

  const handleRoleUpdate = async (citizenId, newRole) => {
    setError('')
    setSuccess('')

    try {
      await api.put(`/admin/citizens/${citizenId}/role`, { role: newRole })
      setSuccess('Role updated successfully!')
      fetchCitizens() // Refresh list
    } catch (err) {
      setError(err.message || 'Failed to update role')
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setPage(1)
    fetchCitizens()
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
      <h1 className="text-3xl font-bold mb-6">Manage Citizens</h1>

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

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <form onSubmit={handleSearchSubmit} className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">Search</Label>
              <Input
                id="search"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      {/* Citizens List */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading citizens...</p>
        </div>
      )}

      {!loading && citizens.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>All Citizens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Role</th>
                    <th className="text-left py-3 px-4">Joined</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {citizens.map((citizen) => (
                    <tr key={citizen._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{citizen.name}</td>
                      <td className="py-3 px-4">{citizen.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          citizen.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {citizen.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {new Date(citizen.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={citizen.role}
                          onChange={(e) => handleRoleUpdate(citizen._id, e.target.value)}
                          className="text-sm rounded-md border border-input bg-background px-2 py-1"
                        >
                          <option value="citizen">Citizen</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && citizens.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-gray-500">
            No citizens found.
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="flex items-center px-4">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

export default CitizenList
