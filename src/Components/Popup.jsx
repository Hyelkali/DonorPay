// src/Components/Popup.jsx
import React from "react";

const Popup = ({ message, onClose }) => {
  return (
    <div style={popupStyles.overlay}>
      <div style={popupStyles.popup}>
        <p>{message}</p>
        <button onClick={onClose} style={popupStyles.closeButton}>Close</button>
      </div>
    </div>
  );
};

const popupStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Popup;

// import React, { useEffect } from "react";

// const Popup = ({ message, onClose, type }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, 3000); // Popup will disappear after 3 seconds

//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div style={{ ...styles.popup, backgroundColor: type === "error" ? "#ffcccc" : "#d4edda" }}>
//       <p style={styles.message}>{message}</p>
//     </div>
//   );
// };

// // Styles for the Popup component
// const styles = {
//   popup: {
//     position: "fixed",
//     top: "20px",
//     right: "20px",
//     color: "#333",
//     padding: "20px 25px", // Spacious padding
//     borderRadius: "10px", // Rounded corners for a card-like effect
//     boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)", // Softer shadow for depth
//     zIndex: 1000,
//     transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
//     opacity: 0, // Start as invisible
//     transform: "translateX(100%)", // Move out of view to the right initially
//     maxWidth: "300px", // Limit width for a more compact design
//     fontFamily: "'Roboto', sans-serif", // Modern font
//   },
//   message: {
//     margin: 0, // Remove default margin for <p> tag
//     fontSize: "16px",
//     lineHeight: "1.4",
//     fontWeight: "500",
//     color: "#4a4a4a", // Darker gray for message text
//   },
// };

// export default Popup;
