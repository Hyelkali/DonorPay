// src/Components/ui/Checkbox.jsx
import React from 'react';

const Checkbox = ({ checked, onChange, label, style }) => {
  return (
    <label style={{ display: 'flex', alignItems: 'center', ...style }}>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange} 
        style={{ marginRight: '8px' }}
      />
      {label}
    </label>
  );
};

export default Checkbox;
