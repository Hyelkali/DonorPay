// src/Dashboard/Deposit.jsx
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Box 
} from "@mui/material";
import { auth } from "../../firebaseConfig"; // Ensure this is imported

const Deposit = ({ onDeposit }) => {
  const [amount, setAmount] = useState(""); // State for deposit amount

  const handleDeposit = () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: "pk_test_b7119ababa4c222d181f6f412c19d84f41763541", // Replace with your Paystack public key
      email: auth.currentUser.email,
      amount: amount * 100, // Convert Naira to kobo
      currency: "NGN",
      callback: function (response) {
        alert("Payment Successful: " + response.reference);
        onDeposit(Number(amount)); // Update wallet balance
      },
      onClose: function () {
        alert("Transaction was not completed, window closed.");
      },
    });

    handler.openIframe();
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh" 
      sx={{ backgroundColor: "#f4f6f8" }}
    >
      <Card 
        sx={{
          maxWidth: 400, 
          padding: 3, 
          boxShadow: 3, 
          borderRadius: 2,
          backgroundColor: "#fff"
        }}
      >
        <CardContent>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ marginBottom: 2, textAlign: "center", fontWeight: 600 }}
          >
            Deposit Funds
          </Typography>
          <TextField
            label="Enter Amount (NGN)"
            type="number"
            variant="outlined"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleDeposit}
            sx={{ 
              textTransform: "none", 
              fontSize: "1rem", 
              padding: "10px 0", 
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" }
            }}
          >
            Deposit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Deposit;
