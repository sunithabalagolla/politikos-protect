import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select } from '../components/ui/select'
import { INDIAN_STATES, CITIES_BY_STATE } from '../data/locations'
import { formatPhoneNumber, isValidPhoneNumber, isValidEmail, getPasswordStrength } from '../utils/formatters'

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    state: '',
    city: '',
    gender: ''
  })
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [availableCities, setAvailableCities] = useState([])
  const [passwordStrength, setPasswordStrength] = useState(0)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  // Update available cities when state changes
  useEffect(() => {
    if (formData.state) {
      setAvailableCities(CITIES_BY_STATE[formData.state] || [])
      // Reset city if state changes
      if (formData.city && !CITIES_BY_STATE[formData.state]?.includes(formData.city)) {
        setFormData(prev => ({ ...prev, city: '' }))
      }
    } else {
      setAvailableCities([])
    }
  }, [formData.state])

  // Update password strength when password changes
  useEffect(() => {
    if (formData.password) {
      setPasswordStrength(getPasswordStrength(formData.password))
    } else {
      setPasswordStrength(0)
    }
  }, [formData.password])

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Format phone number as user types
    if (name === 'phoneNumber') {
      const formatted = formatPhoneNumber(value)
      setFormData({
        ...formData,
        [name]: formatted
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setFieldErrors({})

    const errors = {}

    // Validate required fields
    if (!formData.firstName.trim()) errors.firstName = 'First name is required'
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone number is required'
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid 10-digit phone number'
    }
    if (!formData.state) errors.state = 'State is required'
    if (!formData.city) errors.city = 'City is required'
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms & Conditions')
      return
    }

    if (!captchaVerified) {
      setError('Please verify the CAPTCHA')
      return
    }

    // If there are validation errors, show them
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setError('Please fix the errors above')
      return
    }

    setLoading(true)

    // Prepare registration data
    const registrationData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      state: formData.state,
      city: formData.city,
      gender: formData.gender
    }

    const result = await register(registrationData)

    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  const handleGoogleLogin = () => {
    console.log('Google login clicked - Authentication will be implemented later')
  }

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked - Authentication will be implemented later')
  }

  const handleCaptchaVerify = () => {
    // Simple mock CAPTCHA - will be replaced with real CAPTCHA later
    setCaptchaVerified(true)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Side - Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <div className="max-w-lg space-y-8 animate-fade-in">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-2xl">
                <span className="text-3xl">🏛️</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">Politikos Protect</span>
                <span className="text-sm text-white/80">Civic Engagement Platform</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight">
                Empower Your Voice
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Join thousands of citizens making a difference in their communities through active civic participation
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm text-white/80">Active Citizens</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-white/80">Issues Resolved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm text-white/80">Communities</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-2xl">🏛️</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                  Politikos Protect
                </span>
              </div>
            </Link>
          </div>

          <div className="space-y-2 mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Get started</h2>
            <p className="text-gray-600">Create your account to join the community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-shake">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-semibold text-gray-900">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`h-11 px-4 text-base rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                    fieldErrors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {fieldErrors.firstName && (
                  <p className="text-xs text-red-600">{fieldErrors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-semibold text-gray-900">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`h-11 px-4 text-base rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                    fieldErrors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {fieldErrors.lastName && (
                  <p className="text-xs text-red-600">{fieldErrors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-900">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`h-11 px-4 text-base rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                  fieldErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {fieldErrors.email && (
                <p className="text-xs text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-900">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="98765 43210"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`h-11 px-4 text-base rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                  fieldErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                maxLength="14"
              />
              {fieldErrors.phoneNumber && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  {fieldErrors.phoneNumber}
                </p>
              )}
            </div>

            {/* State & City */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-semibold text-gray-900">
                  State <span className="text-red-500">*</span>
                </Label>
                <Select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`h-11 text-base rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                    fieldErrors.state ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {INDIAN_STATES.map(state => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </Select>
                {fieldErrors.state && (
                  <p className="text-xs text-red-600">{fieldErrors.state}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-semibold text-gray-900">
                  City <span className="text-red-500">*</span>
                </Label>
                <Select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!formData.state}
                  className={`h-11 text-base rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                    fieldErrors.city ? 'border-red-500' : 'border-gray-300'
                  } ${!formData.state ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                >
                  <option value="">Select City</option>
                  {availableCities.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </Select>
                {fieldErrors.city && (
                  <p className="text-xs text-red-600">{fieldErrors.city}</p>
                )}
                {!formData.state && (
                  <p className="text-xs text-gray-500">Please select a state first</p>
                )}
              </div>
            </div>

            {/* Gender (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm font-semibold text-gray-900">
                Gender <span className="text-gray-400 text-xs">(Optional)</span>
              </Label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full h-11 px-4 text-base border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all bg-white"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-900">
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`h-11 px-4 pr-12 text-base rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                    fieldErrors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-xs text-red-600">{fieldErrors.password}</p>
              )}
              {formData.password && !fieldErrors.password && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          passwordStrength < 40 ? 'bg-red-500' :
                          passwordStrength < 70 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600">
                      {passwordStrength < 40 ? 'Weak' :
                       passwordStrength < 70 ? 'Medium' :
                       'Strong'}
                    </span>
                  </div>
                </div>
              )}
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Must be at least 8 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-900">
                Confirm Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`h-11 px-4 pr-12 text-base rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                    fieldErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="text-xs text-red-600">{fieldErrors.confirmPassword}</p>
              )}
              {formData.confirmPassword && formData.password === formData.confirmPassword && !fieldErrors.confirmPassword && (
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Passwords match
                </p>
              )}
            </div>

            {/* CAPTCHA */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">
                Verification <span className="text-red-500">*</span>
              </Label>
              <div className="border-2 border-gray-300 rounded-xl p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="captcha"
                      checked={captchaVerified}
                      onChange={handleCaptchaVerify}
                      className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="captcha" className="text-sm text-gray-700">
                      I'm not a robot
                    </label>
                  </div>
                  <div className="text-xs text-gray-400">
                    <div className="flex flex-col items-end">
                      <span className="font-semibold">reCAPTCHA</span>
                      <span className="text-[10px]">Privacy - Terms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-0.5"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-700 underline font-medium">
                  Terms & Conditions
                </a>
                {' '}and{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-700 underline font-medium">
                  Privacy Policy
                </a>
                {' '}<span className="text-red-500">*</span>
              </label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-base mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating your account...
                </span>
              ) : (
                'Create Account'
              )}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-50 text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                onClick={handleGoogleLogin}
                variant="outline"
                className="h-11 border-2 border-gray-200 hover:border-gray-300 hover:bg-white font-medium transition-all duration-200 flex items-center justify-center gap-2 rounded-xl"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-gray-700">Google</span>
              </Button>

              <Button
                type="button"
                onClick={handleFacebookLogin}
                variant="outline"
                className="h-11 border-2 border-gray-200 hover:border-gray-300 hover:bg-white font-medium transition-all duration-200 flex items-center justify-center gap-2 rounded-xl"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-gray-700">Facebook</span>
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
