"use client";
import React from 'react';

const Icons = {
  Loader: () => (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  Phone: () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient' | 'white' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  fullWidth?: boolean;
  withRing?: boolean;
  icon?: React.ReactNode;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  withRing = true,
  icon,
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-out active:scale-95';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl',
    xl: 'px-8 py-4 text-xl rounded-xl'
  };

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-blue-300 disabled:text-blue-300',
    gradient: 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 disabled:from-blue-400 disabled:to-blue-500',
    white: 'bg-white text-blue-600 hover:bg-blue-50 disabled:bg-gray-100 disabled:text-blue-400',
    ghost: 'text-gray-700 hover:bg-gray-100 hover:text-blue-600 disabled:text-gray-400'
  };

  const ringClasses = withRing ? 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' : '';
  const widthClasses = fullWidth ? 'w-full' : '';
  const stateClasses = (disabled || isLoading) ? 'cursor-not-allowed' : 'cursor-pointer';

  const allClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variants[variant]}
    ${ringClasses}
    ${widthClasses}
    ${stateClasses}
    ${className}
  `.trim();

  return (
    <button
      className={allClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="mr-2"><Icons.Loader /></span>
          <span className="opacity-90">Loading...</span>
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
      
      <div className="absolute inset-0 rounded-lg bg-white opacity-0 transition-opacity hover:opacity-10" />
    </button>
  );
};

export { Button, Icons };
export type { ButtonProps };