import axios from 'axios'

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    // Return the data directly
    return response.data.data || response.data
  },
  (error) => {
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response

      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('token')
        window.location.href = '/login'
      }

      // Return error message from server
      const errorMessage = data.error?.message || 'An error occurred'
      return Promise.reject(new Error(errorMessage))
    } else if (error.request) {
      // Request made but no response
      return Promise.reject(new Error('Network error. Please try again.'))
    } else {
      // Something else happened
      return Promise.reject(new Error(error.message))
    }
  }
)

export default api
