import React from "react";
import { useEffect } from "react";


const Popup = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Popup will disappear after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{ ...styles.popup, transform: "translateX(0)", opacity: 1 }}>
      <p style={styles.message}>{message}</p>
    </div>
  );
};

// Styles for the Popup component
const styles = {
  popup: {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "#ffffff",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", // Soft gradient background
    color: "#333",
    padding: "20px 25px", // Spacious padding
    borderRadius: "10px", // Rounded corners for a card-like effect
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)", // Softer shadow for depth
    border: "1px solid #ddd", // Subtle border
    zIndex: 1000,
    transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
    opacity: 0, // Start as invisible
    transform: "translateX(100%)", // Move out of view to the right initially
    maxWidth: "300px", // Limit width for a more compact design
    fontFamily: "'Roboto', sans-serif", // Modern font
  },
  message: {
    margin: 0, // Remove default margin for <p> tag
    fontSize: "16px",
    lineHeight: "1.4",
    fontWeight: "500",
    color: "#4a4a4a", // Darker gray for message text
  },
};

export default Popup;
