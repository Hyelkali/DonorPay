// src/Components/Verify.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Verify.css'; // Import styles

const Verify = () => {
  const [enteredCode, setEnteredCode] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for displaying the popup
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate verification process
    setTimeout(() => {
      if (enteredCode === '12345') {
        setVerificationStatus('success');
        setLoading(false);
        setShowPopup(true); // Show success popup

        // Redirect to dashboard after successful verification
        setTimeout(() => {
          setShowPopup(false);
          navigate('/dashboard');
        }, 3000); // Close popup after 3 seconds, then redirect
      } else {
        setVerificationStatus('error');
        setLoading(false);
        setShowPopup(true); // Show error popup

        // Hide error popup after 3 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      }
    }, 2000); // Simulate 2-second server processing delay
  };

  return (
    <div className="verify-container">
      <h2>Email Verification</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="code">Enter Verification Code:</label>
        <input
          type="text"
          id="code"
          name="code"
          value={enteredCode}
          onChange={(e) => setEnteredCode(e.target.value)}
          placeholder="Enter code from email"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Confirm'}
        </button>
      </form>

      {showPopup && (
        <div className={`popup ${verificationStatus} show`}>
          {verificationStatus === 'success' ? (
            <p>Verification successful! Redirecting to dashboard...</p>
          ) : (
            <p>Invalid verification code. Please try again.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Verify;
