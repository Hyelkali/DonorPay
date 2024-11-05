// ./ui/Dialog.jsx
import React from 'react';

export const Dialog = ({ children }) => (
  <div>{children}</div>
);

export const DialogContent = ({ children }) => (
  <div>{children}</div>
);

export const DialogHeader = ({ children }) => (
  <div>{children}</div>
);

export const DialogTitle = ({ children }) => (
  <h2>{children}</h2>
);

export const DialogDescription = ({ children }) => (
  <p>{children}</p>
);
