import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  
  const { t, isRTL } = useLanguage();
  const { login, signup } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password, formData.name);
      }
      onClose();
    } catch (error) {
      setErrors({ general: 'Authentication failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-card max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors duration-200"
        >
          <X size={24} />
        </button>

        <div className="mb-6">
          <h2 className={`text-2xl font-bold text-white mb-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
            {isLogin ? t('auth.login') : t('auth.signup')}
          </h2>
          <p className={`text-white/70 ${isRTL ? 'font-arabic text-right' : ''}`}>
            {isLogin ? 'Welcome back to fead.app' : 'Create your fead.app account'}
          </p>
        </div>

        {errors.general && (
          <div className="mb-4 p-3 glass-card border border-red-500/30 rounded-lg text-red-400 text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} text-white/60`} size={20} />
              <Input
                label={t('auth.name')}
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
                className={isRTL ? 'pr-10' : 'pl-10'}
                placeholder="John Doe"
              />
            </div>
          )}

          <div className="relative">
            <Mail className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} text-white/60`} size={20} />
            <Input
              label={t('auth.email')}
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              className={isRTL ? 'pr-10' : 'pl-10'}
              placeholder="john@example.com"
            />
          </div>

          <div className="relative">
            <Lock className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} text-white/60`} size={20} />
            <Input
              label={t('auth.password')}
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              showPasswordToggle
              className={isRTL ? 'pr-10' : 'pl-10'}
              placeholder="••••••••"
            />
          </div>

          {!isLogin && (
            <div className="relative">
              <Lock className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} text-white/60`} size={20} />
              <Input
                label={t('auth.confirmPassword')}
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                error={errors.confirmPassword}
                showPasswordToggle
                className={isRTL ? 'pr-10' : 'pl-10'}
                placeholder="••••••••"
              />
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
            className="w-full btn-primary"
          >
            {loading ? t('auth.loading') : (isLogin ? t('auth.login') : t('auth.signup'))}
          </Button>
        </form>

        {isLogin && (
          <div className="mt-4 text-center">
            <a href="#" className="text-purple-400 hover:text-purple-300 text-sm transition-colors duration-200">
              {t('auth.forgotPassword')}
            </a>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className={`text-white/70 text-sm ${isRTL ? 'font-arabic' : ''}`}>
            {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
            <button
              onClick={toggleMode}
              className="text-purple-400 hover:text-purple-300 ml-1 transition-colors duration-200"
            >
              {isLogin ? t('auth.signupLink') : t('auth.loginLink')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};