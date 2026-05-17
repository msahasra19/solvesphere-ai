'use client';

import React from 'react';

interface InputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'glass';
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  variant = 'default',
  className = '',
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled,
  required,
  name,
}) => {
  const variants = {
    default: 'bg-dark-900/50 border-dark-700 focus:border-primary-500',
    glass: 'bg-white/5 backdrop-blur-md border-white/10 focus:border-primary-500',
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-dark-200 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          name={name}
          className={`w-full px-4 py-3 rounded-lg border text-dark-50 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 ${
            leftIcon ? 'pl-10' : ''
          } ${rightIcon ? 'pr-10' : ''} ${variants[variant]} ${
            error ? 'border-danger-500 focus:border-danger-500' : ''
          } ${className}`}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-danger-400 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;

// Made with Bob
