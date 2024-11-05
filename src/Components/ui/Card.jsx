// ./ui/Card.jsx
import React from 'react';

export const Card = ({ children }) => (
  <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', margin: '8px 0' }}>
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>{children}</div>
);

export const CardTitle = ({ children }) => (
  <h3 style={{ margin: 0 }}>{children}</h3>
);

export const CardDescription = ({ children }) => (
  <p style={{ color: '#666' }}>{children}</p>
);

export const CardContent = ({ children }) => (
  <div style={{ padding: '8px 0' }}>{children}</div>
);

export const CardFooter = ({ children }) => (
  <div style={{ borderTop: '1px solid #ddd', paddingTop: '8px' }}>{children}</div>
);
export default Card;