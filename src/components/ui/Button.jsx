import React from 'react';

export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  type = 'button',
  disabled = false,
  ...props 
}) {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-lg transition-colors min-h-[44px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-brand-500 hover:bg-brand-600 text-white focus:ring-brand-500 disabled:bg-brand-300",
    secondary: "bg-brand-50 hover:bg-brand-100 text-brand-700 focus:ring-brand-500",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500",
    danger: "bg-danger-500 hover:bg-danger-600 text-white focus:ring-danger-500 disabled:bg-danger-300",
    outline: "bg-transparent border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-brand-500"
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
