import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { authAPI } from '../utils/api'  // Import the authAPI

const SignUp = () => {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    full_name: '',  // Changed from fullName to match API schema
    email: '',
    contact: '',     // Added contact field
    password: '',
    confirmPassword: ''  // This is for client-side validation only
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setIsLoading(false)
      return
    }

    // Prepare data for API (remove confirmPassword)
    const signupData = {
      email: formData.email,
      full_name: formData.full_name,
      contact: formData.contact,
      password: formData.password
    }

    try {
      // Use the new authAPI.signup function
      await authAPI.signup(signupData)
      
      // If signup is successful, auto-login
      try {
        await authAPI.login({
          email: formData.email,
          password: formData.password
        })
        
        setSuccessMessage('Account created successfully! Redirecting...')
        setShowSuccess(true)
        
        setTimeout(() => {
          setShowSuccess(false)
          navigate('/')
        }, 2000)
        
      } catch (loginError) {
        // Signup worked but auto-login failed
        setSuccessMessage('Account created! Please check your email to verify and login.')
        setShowSuccess(true)
        
        setTimeout(() => {
          setShowSuccess(false)
          navigate('/login')
        }, 3000)
      }
      
    } catch (err) {
      console.error('Signup error:', err)
      if (err.message.includes('400')) {
        setError('Invalid data. Please check your information.')
      } else if (err.message.includes('Network error')) {
        setError('Network error. Please check your connection.')
      } else {
        setError(err.message || 'Signup failed. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = () => {
    console.log('Google sign up')
    // Handle Google OAuth here
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 min-h-screen flex items-center">
      {/* Success popup */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50">
          <div className="flex items-center gap-3 bg-green-500 text-white px-4 py-3 shadow-lg rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div className="text-sm font-medium">{successMessage}</div>
            <button onClick={() => setShowSuccess(false)} className="ml-2 text-white opacity-90 hover:opacity-100">✕</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left: Form Section */}
        <div className="w-full flex justify-center lg:justify-start">
          <div className="w-full max-w-md">
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-4xl font-bold text-pink-500 mb-3">Create Account</h2>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Sign Up Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full name</label>
                <input 
                  type="text" 
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number *</label>
                <input 
                  type="tel" 
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your phone number"
                  required
                  maxLength="10"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password * (min 8 characters)</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  placeholder="Create a strong password"
                  required
                  minLength="8"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password *</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink500 focus:border-transparent transition-all duration-200"
                  placeholder="Confirm your password"
                  required
                  minLength="8"
                  disabled={isLoading}
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
            
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-3 text-gray-500 text-sm">Or </div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            
            {/* Social Login */}
            <button
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 px-4 mb-6 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-pink-500 font-semibold hover:text-pink-600 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="text-xs text-gray-500 text-center mt-6">
              By creating an account, you agree to our{' '}
              <a href="#" className="underline hover:text-gray-700">Terms of Service</a> and{' '}
              <a href="#" className="underline hover:text-gray-700">Privacy Policy</a>.
            </div>
          </div>
        </div>

        {/* Right: Image Section */}
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img 
              src={assets.sign} 
              alt="Sign Up" 
              className="w-full max-w-lg h-auto object-contain transform hover:scale-105 transition-transform duration-300" 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp