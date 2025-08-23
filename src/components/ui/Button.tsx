import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const { isRTL } = useLanguage();

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-[var(--brand-green)] hover:bg-[var(--brand-green)]/90 text-[var(--bg-primary)] border-none shadow-lg hover:shadow-xl transition-all duration-200',
    secondary: 'bg-white/5 hover:bg-white/10 text-white focus:ring-red-900 backdrop-blur-sm',
    outline: 'border border-[var(--brand-green)]/35 text-white hover:border-[var(--brand-green)] hover:bg-[var(--brand-green)]/15 backdrop-blur-sm transition-all duration-200',
    ghost: 'text-white/70 hover:text-white hover:bg-white/5 focus:ring-red-800',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className={`loading-spinner ${isRTL ? 'ml-2 mr-0' : 'mr-2'}`} />
      )}
      {children}
    </button>
  );
};