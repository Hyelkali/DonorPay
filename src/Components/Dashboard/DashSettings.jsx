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
import { auth, db } from "../../firebaseConfig"; // Make sure you import your Firebase config
import { doc, updateDoc } from "firebase/firestore";


const DashSettings = ({ user }) => {
  const [pin, setPin] = useState(""); // State for the transaction PIN
  const [confirmPin, setConfirmPin] = useState(""); // State to confirm the transaction PIN

  const handlePinChange = async () => {
    if (pin.length === 4 && pin === confirmPin) {
      const userDocRef = doc(db, "users", auth.currentUser.uid); // Adjust to your Firestore structure
      await updateDoc(userDocRef, { transactionPin: pin });
      alert("Transaction PIN updated successfully!");
      setPin("");
      setConfirmPin("");
    } else {
      alert("Please ensure the PIN is 4 digits and matches.");
    }
  };

  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Card sx={{ width: "100%", maxWidth: 400, mb: 2 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Avatar src="/profile.jpg" alt="User Profile" sx={{ width: 60, height: 60, margin: "auto" }} />
          <Typography variant="h6">{user?.name}</Typography>
          <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
        </CardContent>
      </Card>

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
      <Button variant="contained" color="primary" onClick={handlePinChange}>
        Update Transaction PIN
      </Button>
    </Box>
  );
};

export default DashSettings;
