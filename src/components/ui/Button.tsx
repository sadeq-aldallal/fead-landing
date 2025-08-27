import React from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';
import { useLanguage } from '../../contexts/LanguageContext';
import { Loader2 } from 'lucide-react';

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

  // Map old variants to shadcn variants
  const mapVariant = (v: string) => {
    switch (v) {
      case 'primary': return 'default';
      case 'secondary': return 'secondary';
      case 'outline': return 'outline';
      case 'ghost': return 'ghost';
      default: return 'default';
    }
  };

  // Map old sizes to shadcn sizes
  const mapSize = (s: string) => {
    switch (s) {
      case 'sm': return 'sm';
      case 'md': return 'default';
      case 'lg': return 'lg';
      default: return 'default';
    }
  };

  return (
    <ShadcnButton
      variant={mapVariant(variant) as any}
      size={mapSize(size) as any}
      className={className}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className={`h-4 w-4 animate-spin ${isRTL ? 'ml-2' : 'mr-2'}`} />
      )}
      {children}
    </ShadcnButton>
  );
};