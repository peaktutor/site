// components/ui/Textarea.tsx
"use client";

import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, error, helperText, fullWidth = false, ...props }, ref) => {
    const textareaClasses = `
      block rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      transition-colors duration-200 ease-in-out
      text-gray-900 placeholder:text-gray-400
      ${error ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}
      ${fullWidth ? 'w-full' : ''}
      px-4 py-3 min-h-[100px]
      ${className}
    `;

    return (
      <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}
        <textarea ref={ref} className={textareaClasses} {...props} />
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

Textarea.displayName = 'Textarea';

export default Textarea;