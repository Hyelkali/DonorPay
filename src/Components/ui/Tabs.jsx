// ./ui/Tabs.jsx
import React, { useState } from 'react';

export const Tabs = ({ children }) => <div>{children}</div>;

export const TabsList = ({ children }) => (
  <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #ddd' }}>{children}</div>
);

export const TabsTrigger = ({ label, onClick, isActive }) => (
  <button
    onClick={onClick}
    style={{
      padding: '8px 16px',
      cursor: 'pointer',
      backgroundColor: isActive ? '#ddd' : 'transparent',
      border: 'none',
      borderBottom: isActive ? '2px solid blue' : '2px solid transparent',
    }}
  >
    {label}
  </button>
);

export const TabsContent = ({ children, isActive }) => (
  isActive ? <div style={{ padding: '16px' }}>{children}</div> : null
);
