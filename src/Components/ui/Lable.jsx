// src/Components/ui/label.jsx
import React from 'react';

const Label = ({ htmlFor, children, className = "", required = false }) => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-gray-700 ${className}`}
  >
    {children} 
    {required && <span className="text-red-500">*</span>}
  </label>
);

export default Label;
