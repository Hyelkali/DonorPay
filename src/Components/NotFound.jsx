// NotFound.jsx
import React from 'react';

const NotFound = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <button onClick={() => (window.location.href = '/')}>
      Go to Home
    </button>
  </div>
);

export default NotFound;
