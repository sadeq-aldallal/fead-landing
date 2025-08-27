import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Input as ShadcnInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

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
        <Label className={cn(
          "text-sm font-medium",
          isRTL ? 'text-right' : 'text-left'
        )}>
          {label}
        </Label>
      )}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
            {leftIcon}
          </div>
        )}
        
        <ShadcnInput
          type={inputType}
          className={cn(
            error && 'border-destructive focus:ring-destructive',
            hasLeftIcon && 'pl-10',
            hasRightIcon && 'pr-10',
            isRTL && 'text-right',
            className
          )}
          {...props}
        />
        
        {/* Right Icon or Password Toggle */}
        {showPasswordToggle ? (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground z-10"
            onClick={togglePassword}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        ) : rightIcon ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
            {rightIcon}
          </div>
        ) : null}
      </div>
      {error && (
        <p className={cn(
          "text-sm text-destructive",
          isRTL ? 'text-right' : 'text-left'
        )}>
          {error}
        </p>
      )}
    </div>
  );
};