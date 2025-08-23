import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  passwordVisible?: boolean;
  onTogglePassword?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  showPasswordToggle = false,
  leftIcon,
  rightIcon,
  passwordVisible,
  onTogglePassword,
  type = 'text',
  className = '',
  ...props
}) => {
  const [internalShowPassword, setInternalShowPassword] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const showPassword = passwordVisible !== undefined ? passwordVisible : internalShowPassword;
  const togglePassword = onTogglePassword || (() => setInternalShowPassword(!internalShowPassword));
  const { isRTL } = useLanguage();

  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;
  
  // Calculate padding based on icons and RTL
  const hasLeftIcon = leftIcon || (!isRTL && showPasswordToggle);
  const hasRightIcon = rightIcon || (isRTL && showPasswordToggle) || (!isRTL && showPasswordToggle);

  return (
    <div className="space-y-1">
      {label && (
        <label className={`block text-sm font-medium text-white/70 ${isRTL ? 'text-right' : 'text-left'}`}>
          {label}
        </label>
      )}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-3 text-white/60 z-10">
            {leftIcon}
          </div>
        )}
        
        <input
          type={inputType}
          className={`
            w-full py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/30
            focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] focus:border-transparent
            transition-colors duration-200
            ${error ? 'border-red-500/50 focus:ring-red-500' : ''}
            ${hasLeftIcon ? 'pl-10' : 'pl-3'}
            ${hasRightIcon ? 'pr-10' : 'pr-3'}
            ${isRTL ? 'text-right' : 'text-left'}
            ${className}
          `}
          {...props}
        />
        
        {/* Right Icon or Password Toggle */}
        {showPasswordToggle ? (
          <button
            type="button"
            className="absolute right-3 top-3 text-white/60 hover:text-white/90 z-10"
            onClick={togglePassword}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        ) : rightIcon ? (
          <div className="absolute right-3 top-3 text-white/60 z-10">
            {rightIcon}
          </div>
        ) : null}
      </div>
      {error && (
        <p className={`text-sm text-red-400 ${isRTL ? 'text-right' : 'text-left'}`}>
          {error}
        </p>
      )}
    </div>
  );
};