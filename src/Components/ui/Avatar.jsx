// src/components/ui/Avatar.js
import React from 'react';

export const Avatar = ({ src, alt, fallback, style }) => (
  <div style={{
    borderRadius: '50%',
    overflow: 'hidden',
    width: '50px',
    height: '50px',
    ...style,
  }}>
    {src ? <AvatarImage src={src} alt={alt} /> : <AvatarFallback>{fallback}</AvatarFallback>}
  </div>
);

export const AvatarImage = ({ src, alt }) => (
  <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
);

export const AvatarFallback = ({ children }) => (
  <div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    color: '#555',
    fontSize: '1.2rem',
  }}>
    {children}
  </div>
);
export default Avatar;