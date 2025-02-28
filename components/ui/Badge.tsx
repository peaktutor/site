// components/ui/Badge.tsx
import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  outline?: boolean;
}

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  outline = false,
  className = '', 
  ...props 
}: BadgeProps) => {
  const variantClasses = outline 
    ? {
        default: 'bg-transparent text-gray-700 border border-gray-300',
        primary: 'bg-transparent text-blue-700 border border-blue-300',
        success: 'bg-transparent text-green-700 border border-green-300',
        warning: 'bg-transparent text-yellow-700 border border-yellow-300',
        error: 'bg-transparent text-red-700 border border-red-300',
        info: 'bg-transparent text-sky-700 border border-sky-300',
      }
    : {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-blue-100 text-blue-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
        info: 'bg-sky-100 text-sky-800',
      };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  const baseClasses = 'inline-flex items-center rounded-full font-medium';

  return (
    <span 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;