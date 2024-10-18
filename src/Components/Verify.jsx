// src/Components/Verify.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, sendVerificationEmail } from "../firebaseConfig"; // Use the correct alias if changed
import { MailCheck } from "lucide-react"; // Importing icon from Lucide React

const Verify = () => {
  const navigate = useNavigate();
  const [verificationSent, setVerificationSent] = useState(false);
  const [email, setEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      setEmail(user.email);

      if (user.emailVerified) {
        navigate("/dashboard"); // Redirect if already verified
      } else {
        setVerificationSent(true); // Notify that verification link is sent

        const checkVerification = setInterval(() => {
          user.reload().then(() => {
            if (user.emailVerified) {
              clearInterval(checkVerification);
              navigate("/dashboard"); // Redirect after verification
            }
          });
        }, 5000); // Check every 5 seconds

        return () => clearInterval(checkVerification); // Cleanup on unmount
      }
    } else {
      navigate("/login"); // Redirect if not signed in
    }
  }, [navigate]);

  const resendVerificationEmail = async () => {
    const user = auth.currentUser;
    if (user) {
      setResendLoading(true);
      try {
        await sendVerificationEmail(user); // Use the correct function here
        alert("Verification email resent!");
      } catch (error) {
        alert("Failed to resend email. Please try again.");
      }
      setResendLoading(false);
    }
  };

  return (
    <div className="verify-page" style={styles.page}>
      <div className="verify-card" style={styles.card}>
        <div style={styles.iconContainer}>
          <MailCheck size={60} color="#0f766e" />
        </div>

        <h2 style={styles.title}>Verify your email address</h2>

        <p style={styles.text}>
          Please click the link that was sent to <strong>{email}</strong> to verify your email.
        </p>

        <p style={styles.text}>Didn’t get the email?</p>

        <button
          onClick={resendVerificationEmail}
          style={resendLoading ? styles.resendButtonDisabled : styles.resendButton}
          disabled={resendLoading}
        >
          {resendLoading ? "Resending..." : "Click here to resend"}
        </button>
      </div>
    </div>
  );
};

// CSS-in-JS for styling
const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#0f172a", // Dark background
  },
  card: {
    width: "400px",
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "#1e293b", // Card background
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  iconContainer: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#e2e8f0", // Light text color
    marginBottom: "10px",
  },
  text: {
    color: "#94a3b8", // Grayish text color
    marginBottom: "10px",
  },
  resendButton: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#0f766e", // Teal button color
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  resendButtonDisabled: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#64748b", // Disabled button color
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "not-allowed",
  },
};

export default Verify;
