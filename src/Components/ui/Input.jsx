// Input.js
import React from 'react';

const Input = ({ type, placeholder, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="py-2 px-4 border border-gray-300 rounded"
      {...props}
    />
  );
};

export default Input;