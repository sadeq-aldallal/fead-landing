import React, { useState, useEffect } from 'react'
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../ui/Button'
import { FormData, FormErrors } from '../../types/auth'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'signin' | 'signup'
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultMode = 'signin' 
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>(defaultMode)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const { t, isRTL } = useLanguage()
  const { signIn, signUp, resetPassword, loading } = useAuth()

  // Sync internal mode state with defaultMode prop when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode)
    }
  }, [defaultMode, isOpen])

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation (not for reset mode)
    if (mode !== 'reset') {
      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }

      // Signup specific validations - DISABLED: Users must request demo first
      /* if (mode === 'signup') {
        if (!formData.fullName?.trim()) {
          newErrors.fullName = 'Full name is required'
        }

        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password'
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match'
        }
      } */
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setErrors({})
    setSuccessMessage('')

    try {
      if (mode === 'signin') {
        const { error } = await signIn(formData.email, formData.password)
        if (error) {
          setErrors({ general: getErrorMessage(error) })
        } else {
          onClose()
        }
      // DISABLED: Signup functionality - Users must request demo first
      /* 
      else if (mode === 'signup') {
        const { error } = await signUp(formData.email, formData.password, formData.fullName)
        if (error) {
          setErrors({ general: getErrorMessage(error) })
        } else {
          setSuccessMessage('Account created successfully! You are now signed in.')
          setTimeout(() => {
            onClose()
          }, 2000)
        }
      } 
      */ 
      } else if (mode === 'reset') {
        const { error } = await resetPassword(formData.email)
        if (error) {
          setErrors({ general: getErrorMessage(error) })
        } else {
          setSuccessMessage('Password reset email sent! Check your inbox.')
          setTimeout(() => {
            setMode('signin')
            setSuccessMessage('')
          }, 3000)
        }
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get user-friendly error messages
  const getErrorMessage = (error: any): string => {
    if (!error?.message) return 'An error occurred. Please try again.'
    
    const message = error.message.toLowerCase()
    
    if (message.includes('invalid login credentials')) {
      return 'Invalid email or password. Please check your credentials.'
    }
    if (message.includes('email already registered')) {
      return 'An account with this email already exists. Try signing in instead.'
    }
    if (message.includes('weak password')) {
      return 'Password is too weak. Please choose a stronger password.'
    }
    if (message.includes('invalid email')) {
      return 'Please enter a valid email address.'
    }
    if (message.includes('signup disabled')) {
      return 'Account registration is currently disabled.'
    }
    
    return error.message
  }

  // Reset form when switching modes
  const switchMode = (newMode: 'signin' | 'signup' | 'reset') => {
    setMode(newMode)
    setFormData({
      email: formData.email, // Keep email when switching
      password: '',
      confirmPassword: '',
      fullName: '',
      rememberMe: false
    })
    setErrors({})
    setSuccessMessage('')
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors duration-200"
          disabled={isSubmitting}
        >
          <X size={24} />
        </button>

        <div className="mb-6">
          <h2 className={`text-2xl font-bold text-white mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
            {mode === 'signin' && 'Sign In'}
            {/* {mode === 'signup' && 'Create Account'} */}
            {mode === 'reset' && 'Reset Password'}
          </h2>
          <p className={`text-white/70 ${isRTL ? 'font-arabic text-right' : ''}`}>
            {mode === 'signin' && 'Welcome back to fead.app'}
            {/* {mode === 'signup' && 'Join fead.app today'} */}
            {mode === 'reset' && 'Enter your email to reset your password'}
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
            {successMessage}
          </div>
        )}

        {/* General Error */}
        {errors.general && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-start">
            <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name - Signup only */}
          {mode === 'signup' && (
            <div>
              <label className={`block text-sm font-medium text-white/70 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-white/60" size={20} />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full pl-10 pr-3 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] focus:border-transparent transition-colors duration-200 ${errors.fullName ? 'border-red-500/50' : ''}`}
                  placeholder="John Doe"
                  disabled={isSubmitting}
                />
              </div>
              {errors.fullName && (
                <p className="text-sm text-red-400 mt-1">{errors.fullName}</p>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <label className={`block text-sm font-medium text-white/70 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-white/60" size={20} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full pl-10 pr-3 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] focus:border-transparent transition-colors duration-200 ${errors.email ? 'border-red-500/50' : ''}`}
                placeholder="john@example.com"
                disabled={isSubmitting}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-400 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password - Not for reset mode */}
          {mode !== 'reset' && (
            <div>
              <label className={`block text-sm font-medium text-white/70 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-white/60" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-10 pr-10 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] focus:border-transparent transition-colors duration-200 ${errors.password ? 'border-red-500/50' : ''}`}
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-white/60 hover:text-white/90"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-400 mt-1">{errors.password}</p>
              )}
            </div>
          )}

          {/* Confirm Password - Signup only */}
          {mode === 'signup' && (
            <div>
              <label className={`block text-sm font-medium text-white/70 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-white/60" size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full pl-10 pr-10 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] focus:border-transparent transition-colors duration-200 ${errors.confirmPassword ? 'border-red-500/50' : ''}`}
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-white/60 hover:text-white/90"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-400 mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {/* Remember Me - Signin only */}
          {mode === 'signin' && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="w-4 h-4 text-[var(--brand-green)] bg-white/5 border-white/20 rounded focus:ring-[var(--brand-green)] focus:ring-2"
                disabled={isSubmitting}
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-white/70">
                Remember me
              </label>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            loading={isSubmitting || loading}
            disabled={isSubmitting || loading}
            className="w-full bg-[var(--brand-green)] hover:bg-[var(--brand-green)]/90 text-white border-none shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isSubmitting || loading ? 'Please wait...' : (
              <>
                {mode === 'signin' && 'Sign In'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'reset' && 'Send Reset Email'}
              </>
            )}
          </Button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 space-y-4">
          {/* Forgot Password - Signin only */}
          {mode === 'signin' && (
            <div className="text-center">
              <button
                onClick={() => switchMode('reset')}
                className="text-[var(--brand-green)] hover:text-[var(--brand-green)]/80 text-sm transition-colors duration-200"
                disabled={isSubmitting}
              >
                Forgot your password?
              </button>
            </div>
          )}

          {/* Mode Switch */}
          <div className="text-center">
            <p className={`text-white/70 text-sm ${isRTL ? 'font-arabic' : ''}`}>
              {mode === 'signin' && "Don't have an account? "}
              {mode === 'signup' && "Already have an account? "}
              {mode === 'reset' && "Remember your password? "}
              
              <button
                onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
                className="text-[var(--brand-green)] hover:text-[var(--brand-green)]/80 transition-colors duration-200"
                disabled={isSubmitting}
              >
                {mode === 'signin' && 'Sign up here'}
                {mode === 'signup' && 'Sign in here'}
                {mode === 'reset' && 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}