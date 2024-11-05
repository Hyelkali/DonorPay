// src/components/ui/Button.js
import React from 'react';

const Button = ({ children, onClick, style, type = 'button' }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
