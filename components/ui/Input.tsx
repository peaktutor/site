// components/ui/Input.tsx
"use client";

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className = '', 
    label, 
    error, 
    helperText, 
    fullWidth = false, 
    icon,
    iconPosition = 'left',
    ...props 
  }, ref) => {
    const inputClasses = `
      block rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      transition-colors duration-200 ease-in-out
      text-gray-900 placeholder:text-gray-400
      ${error ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'} 
      ${fullWidth ? 'w-full' : ''} 
      ${icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : 'px-4'}
      py-2.5
      ${className}
    `;

    return (
      <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {icon}
            </div>
          )}
          <input ref={ref} className={inputClasses} {...props} />
          {icon && iconPosition === 'right' && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              {icon}
            </div>
          )}
        </div>
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
        )}
        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;