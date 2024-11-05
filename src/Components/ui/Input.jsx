// src/components/ui/Input.js
import React from 'react';

const Input = ({ value, onChange, type = 'text', placeholder, style }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        padding: '8px',
        fontSize: '1rem',
        width: '100%',
        borderRadius: '4px',
        border: '1px solid #ddd',
        ...style,
      }}
    />
  );
};

export default Input;
