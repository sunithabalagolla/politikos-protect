import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { email, password } = formData

    if (!email || !password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    const result = await login(email, password)

    if (result.success) {
      if (result.user?.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Animated Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-indigo-400/30 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <div className="max-w-md space-y-8">
            {/* Animated Illustration */}
            <div className="relative">
              {/* Person investigating/solving issues */}
              <div className="relative w-full h-96 flex items-center justify-center">
                {/* Building/City Background */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-4 opacity-30">
                  <div className="w-16 h-32 bg-white/20 rounded-t-lg animate-float" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-20 h-40 bg-white/20 rounded-t-lg animate-float" style={{animationDelay: '1s'}}></div>
                  <div className="w-16 h-36 bg-white/20 rounded-t-lg animate-float" style={{animationDelay: '1.5s'}}></div>
                </div>

                {/* Main Character - Person with magnifying glass */}
                <div className="relative z-10">
                  {/* Person */}
                  <div className="relative">
                    {/* Head */}
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full mx-auto mb-2 shadow-2xl animate-float"></div>
                    
                    {/* Body */}
                    <div className="w-24 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl mx-auto shadow-2xl animate-float" style={{animationDelay: '0.2s'}}>
                      {/* Arms */}
                      <div className="absolute -left-6 top-8 w-16 h-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transform -rotate-45 animate-float" style={{animationDelay: '0.3s'}}></div>
                      <div className="absolute -right-6 top-8 w-16 h-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transform rotate-45 animate-float" style={{animationDelay: '0.4s'}}></div>
                    </div>

                    {/* Legs */}
                    <div className="flex gap-2 justify-center mt-2">
                      <div className="w-6 h-16 bg-gradient-to-b from-indigo-500 to-blue-600 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
                      <div className="w-6 h-16 bg-gradient-to-b from-indigo-500 to-blue-600 rounded-full animate-float" style={{animationDelay: '0.6s'}}></div>
                    </div>
                  </div>

                  {/* Magnifying Glass */}
                  <div className="absolute -right-16 top-12 animate-float" style={{animationDelay: '0.7s'}}>
                    <div className="w-16 h-16 border-4 border-yellow-300 rounded-full bg-white/20 backdrop-blur-sm"></div>
                    <div className="w-2 h-12 bg-yellow-300 rounded-full transform rotate-45 origin-top-left ml-12 -mt-4"></div>
                  </div>

                  {/* Issue Icons floating around */}
                  <div className="absolute -left-20 top-0 text-4xl animate-float" style={{animationDelay: '1s'}}>📝</div>
                  <div className="absolute -right-24 top-20 text-4xl animate-float" style={{animationDelay: '1.5s'}}>🔍</div>
                  <div className="absolute left-20 -top-10 text-4xl animate-float" style={{animationDelay: '2s'}}>✅</div>
                  <div className="absolute -left-16 bottom-10 text-4xl animate-float" style={{animationDelay: '2.5s'}}>💡</div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center space-y-4 animate-fade-in">
              <h1 className="text-4xl font-bold leading-tight">
                Welcome Back to <br />
                <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  Politikos People Center
                </span>
              </h1>
              <p className="text-lg text-blue-100">
                Continue your journey in making your community better through civic engagement
              </p>
              <div className="flex items-center justify-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">1000+</div>
                  <div className="text-sm text-blue-200">Active Citizens</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-blue-200">Issues Solved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏛️</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Politikos
                </span>
                <span className="text-xs text-gray-500 font-medium">PEOPLE CENTER</span>
              </div>
            </Link>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-600">Login to access your civic dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 animate-shake">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">New to Politikos?</span>
              </div>
            </div>

            <Link to="/register">
              <Button 
                type="button"
                variant="outline"
                className="w-full h-12 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 font-semibold transition-all duration-300"
              >
                Create an Account
              </Button>
            </Link>
          </form>

          <p className="text-center text-sm text-gray-500">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
