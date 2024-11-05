// @/components/ui/alert.js
import React from 'react';

export const Alert = ({ children }) => (
  <div className="alert">
    {children}
  </div>
);

export const AlertTitle = ({ children }) => (
  <h4 className="alert-title">{children}</h4>
);

export const AlertDescription = ({ children }) => (
  <p className="alert-description">{children}</p>
);
