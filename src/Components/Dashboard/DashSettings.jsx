// src/Dashboard/Settings.jsx

import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
// import { Logout } from "lucide-react"; // Logout icon
import { auth, db } from "../../firebaseConfig"; // Firebase config
import { doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth"; // Firebase sign-out
import { useNavigate } from "react-router-dom"; // For navigation
import Avat from "../../assets/avat.png"; // Profile avatar

const DashSettings = ({ user }) => {
  const [pin, setPin] = useState(""); // State for the transaction PIN
  const [confirmPin, setConfirmPin] = useState(""); // State to confirm the PIN
  const navigate = useNavigate(); // Initialize navigation

  // Handle PIN update
  const handlePinChange = async () => {
    if (pin.length === 4 && pin === confirmPin) {
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userDocRef, { transactionPin: pin });
        alert("Transaction PIN updated successfully!");
        setPin("");
        setConfirmPin("");
      } catch (error) {
        console.error("Error updating PIN:", error);
        alert("Failed to update PIN. Please try again.");
      }
    } else {
      alert("Please ensure the PIN is 4 digits and matches.");
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <Box
      sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Profile Card */}
      <Card sx={{ width: "100%", maxWidth: 400, mb: 2 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Avatar
            src={Avat}
            alt="User Profile"
            sx={{ width: 60, height: 60, margin: "auto" }}
          />
          <Typography variant="h6">{user?.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </CardContent>
      </Card>

      {/* Transaction PIN Settings */}
      <Typography variant="h6">Transaction PIN Settings</Typography>
      <Divider sx={{ my: 2 }} />
      <TextField
        label="New Transaction PIN"
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        inputProps={{ maxLength: 4 }}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Confirm Transaction PIN"
        type="password"
        value={confirmPin}
        onChange={(e) => setConfirmPin(e.target.value)}
        inputProps={{ maxLength: 4 }}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handlePinChange} sx={{ mb: 2 }}>
        Update Transaction PIN
      </Button>

      {/* Logout Button */}
      <Button
        variant="contained"
        color="error"
        startIcon={<Logout />} // Icon added
        onClick={handleLogout}
        sx={{ mt: 2, width: "100%", textTransform: "none" }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default DashSettings;
