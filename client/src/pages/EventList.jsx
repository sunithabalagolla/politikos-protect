import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import EventCard from '../components/events/EventCard'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

const EventList = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isAdmin } = useAuth()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await api.get('/events')
      setEvents(response.events || response)
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to load events')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Community Events</h1>
        {isAdmin && (
          <Link to="/events/new">
            <Button>Create New Event</Button>
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
          <p className="text-gray-600">Loading events...</p>
        </div>
      )}

      {!loading && events.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} onUpdate={fetchEvents} />
          ))}
        </div>
      )}

      {!loading && events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No upcoming events at this time.</p>
          <p className="text-gray-500">Check back later for new community events!</p>
        </div>
      )}
    </div>
  )
}

export default EventList
