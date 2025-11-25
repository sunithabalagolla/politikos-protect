import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'

const EventCard = ({ event, onUpdate }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isRegistered = user && event.registeredCitizens?.some(
    citizen => citizen._id === user._id || citizen === user._id
  )

  const isFull = event.capacity && event.registeredCitizens?.length >= event.capacity

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    })
  }

  const formatEventType = (type) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const handleRegister = async () => {
    if (!user) {
      setError('Please login to register for events')
      return
    }

    try {
      setLoading(true)
      setError('')
      await api.post(`/events/${event._id}/register`)
      if (onUpdate) onUpdate()
    } catch (err) {
      setError(err.message || 'Failed to register for event')
    } finally {
      setLoading(false)
    }
  }

  const handleUnregister = async () => {
    try {
      setLoading(true)
      setError('')
      await api.delete(`/events/${event._id}/register`)
      if (onUpdate) onUpdate()
    } catch (err) {
      setError(err.message || 'Failed to unregister from event')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{event.title}</CardTitle>
            <CardDescription className="mt-1">
              {formatEventType(event.eventType)}
            </CardDescription>
          </div>
          {isRegistered && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Registered
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700 line-clamp-3">{event.description}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <span className="font-semibold w-20">Date:</span>
            <span className="text-gray-700">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-start">
            <span className="font-semibold w-20">Time:</span>
            <span className="text-gray-700">{event.time}</span>
          </div>
          <div className="flex items-start">
            <span className="font-semibold w-20">Location:</span>
            <span className="text-gray-700">
              {event.location?.venue}
              {event.location?.address && `, ${event.location.address}`}
            </span>
          </div>
          {event.capacity && (
            <div className="flex items-start">
              <span className="font-semibold w-20">Capacity:</span>
              <span className="text-gray-700">
                {event.registeredCitizens?.length || 0} / {event.capacity}
                {isFull && <span className="text-red-600 ml-2">(Full)</span>}
              </span>
            </div>
          )}
        </div>

        {error && (
          <div className="p-2 text-xs text-red-500 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        {user && (
          <div className="pt-2">
            {isRegistered ? (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleUnregister}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Unregister'}
              </Button>
            ) : (
              <Button 
                className="w-full"
                onClick={handleRegister}
                disabled={loading || isFull}
              >
                {loading ? 'Processing...' : isFull ? 'Event Full' : 'Register'}
              </Button>
            )}
          </div>
        )}

        {!user && (
          <p className="text-sm text-gray-500 text-center">
            Login to register for this event
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default EventCard
