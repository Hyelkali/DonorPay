// src/components/ui/Drawer.js
import React, { useState } from 'react';

export const Drawer = ({ children }) => <div>{children}</div>;

export const DrawerTrigger = ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
);

export const DrawerContent = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '300px',
      height: '100%',
      backgroundColor: '#fff',
      boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.3)',
    }}>
      <button onClick={onClose} style={{ margin: '16px' }}>Close</button>
      {children}
    </div>
  );
};

export const DrawerHeader = ({ children }) => (
  <div style={{ padding: '16px', borderBottom: '1px solid #ddd' }}>{children}</div>
);

export const DrawerTitle = ({ children }) => <h3>{children}</h3>;

export default Drawer;