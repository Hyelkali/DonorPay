// ./ui/Sheet.jsx
import React, { useState } from 'react';

export const Sheet = ({ children }) => <div>{children}</div>;

export const SheetTrigger = ({ onClick, children }) => (
  <button onClick={onClick} style={{ cursor: 'pointer', padding: '8px' }}>
    {children}
  </button>
);

export const SheetContent = ({ isOpen, onClose, children }) => (
  isOpen ? (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '300px',
      height: '100%',
      backgroundColor: '#fff',
      boxShadow: '-2px 0 5px rgba(0,0,0,0.3)',
      padding: '16px',
      zIndex: 1000
    }}>
      <button onClick={onClose} style={{ marginBottom: '16px', cursor: 'pointer' }}>Close</button>
      {children}
    </div>
  ) : null
);

export const SheetHeader = ({ children }) => <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>{children}</div>;

export const SheetTitle = ({ children }) => <h2>{children}</h2>;

export const SheetDescription = ({ children }) => <p style={{ color: '#666' }}>{children}</p>;


export default Sheet;
