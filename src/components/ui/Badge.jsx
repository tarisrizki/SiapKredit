import React from 'react';

export function Badge({ children, variant = 'gray', className = '' }) {
  const variants = {
    gray: "bg-gray-100 text-gray-800",
    brand: "bg-brand-100 text-brand-800",
    success: "bg-success-50 text-success-600 border border-success-200",
    warning: "bg-warning-50 text-warning-700 border border-warning-200",
    danger: "bg-danger-50 text-danger-600 border border-danger-200",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
