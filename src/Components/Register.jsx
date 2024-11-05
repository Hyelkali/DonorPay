import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { auth } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Added getDoc for checking existing users
import { db } from "../firebaseConfig";
import { Eye, EyeOff } from "lucide-react";
import Popup from "./Popup";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showError("Oops! Passwords do not match. Please try again.");
      return;
    }

    const passwordValid = validatePassword(password);
    if (!passwordValid) {
      showError("Password must contain at least 8 characters, including letters, numbers, and symbols.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: "", // Placeholder for name
        address: "",
      });

      await sendEmailVerification(user);
      showAlert(`A verification email has been sent to ${user.email}. Please verify your email.`);
      navigate("/verify");
    } catch (error) {
      handleFirebaseError(error.code);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          email: user.email,
          name: user.displayName,
          address: "",
        });
      }

      showAlert(`Welcome, ${user.displayName}! You are now logged in.`);
      navigate("/dashboard");
    } catch (error) {
      handleFirebaseError(error.code);
    }
  };

  const showError = (message) => {
    setError(message);
    setShowPopup(true);
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setError("");
    setAlertMessage("");
  };

  const handleFirebaseError = (errorCode) => {
    let message;
    switch (errorCode) {
      case "auth/invalid-email":
        message = "The email address is badly formatted.";
        break;
      case "auth/email-already-in-use":
        message = "The email address is already in use by another account.";
        break;
      case "auth/weak-password":
        message = "The password is too weak. Please choose a stronger password.";
        break;
      default:
        message = "An unexpected error occurred. Please check your connection and try again.";
    }
    showError(message);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    setPasswordStrength(passwordRegex.test(password) ? "Strong" : "Weak");
    return passwordRegex.test(password);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2>Register</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <label>
            Password <span style={styles.passwordHint}>{passwordStrength && `(${passwordStrength})`}</span>
          </label>
          <div style={styles.passwordContainer}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              required
              style={styles.input}
            />
            {isPasswordVisible ? (
              <EyeOff onClick={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon} />
            ) : (
              <Eye onClick={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon} />
            )}
          </div>

          <label>Confirm Password</label>
          <div style={styles.passwordContainer}>
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
            />
            {isConfirmPasswordVisible ? (
              <EyeOff onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} style={styles.eyeIcon} />
            ) : (
              <Eye onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} style={styles.eyeIcon} />
            )}
          </div>

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>

        <div style={styles.divider} />

        <GoogleButton onClick={handleGoogleSignIn} style={styles.googleButton} />

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>

      {showPopup && (error || alertMessage) && <Popup message={error || alertMessage} onClose={closePopup} />}
    </div>
  );
};
// Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
    width: "100%",
  },
  a:{
    color: "blue",
    backgroundColor: "#28a725",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  },
  button: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
  },
  divider: {
    margin: "20px 0",
    height: "1px",
    backgroundColor: "#ddd",
  },
  googleButton: {
    width: "100%",
    marginTop: "15px",
  },
 
  passwordHint: {
    fontSize: "12px",
    color: "#888",
  },
};

export default Register;
