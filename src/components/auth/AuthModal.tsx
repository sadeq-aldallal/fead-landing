import React, { useState, useEffect } from 'react'
import { Mail, Lock, User, AlertCircle } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '@/components/ui/button';
import { Input } from '../ui/Input'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className={isRTL ? 'font-arabic text-right' : ''}>
            {mode === 'signin' && 'Sign In'}
            {/* {mode === 'signup' && 'Create Account'} */}
            {mode === 'reset' && 'Reset Password'}
          </DialogTitle>
          <DialogDescription className={isRTL ? 'font-arabic text-right' : ''}>
            {mode === 'signin' && 'Welcome back to fead.app'}
            {/* {mode === 'signup' && 'Join fead.app today'} */}
            {mode === 'reset' && 'Enter your email to reset your password'}
          </DialogDescription>
        </DialogHeader>

        {/* Success Message */}
        {successMessage && (
          <Alert className="mb-4 border-green-500/30 bg-green-500/10">
            <AlertDescription className="text-green-600 dark:text-green-400">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* General Error */}
        {errors.general && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {errors.general}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name - Signup only */}
          {mode === 'signup' && (
            <Input
              label="Full Name"
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="John Doe"
              disabled={isSubmitting}
              leftIcon={<User size={20} />}
              error={errors.fullName}
            />
          )}

          {/* Email */}
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            disabled={isSubmitting}
            autoComplete="email"
            leftIcon={<Mail size={20} />}
            error={errors.email}
          />

          {/* Password - Not for reset mode */}
          {mode !== 'reset' && (
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              disabled={isSubmitting}
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              leftIcon={<Lock size={20} />}
              showPasswordToggle={true}
              error={errors.password}
            />
          )}

          {/* Confirm Password - Signup only */}
          {mode === 'signup' && (
            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="••••••••"
              disabled={isSubmitting}
              autoComplete="new-password"
              leftIcon={<Lock size={20} />}
              showPasswordToggle={true}
              passwordVisible={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              error={errors.confirmPassword}
            />
          )}

          {/* Remember Me - Signin only */}
          {mode === 'signin' && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, rememberMe: checked as boolean })
                }
                disabled={isSubmitting}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            loading={isSubmitting || loading}
            disabled={isSubmitting || loading}
            className="w-full"
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
      </DialogContent>
    </Dialog>
  )
}