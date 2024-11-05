import React, { useState, useEffect } from "react";
import { Card, CardContent, TextField, Button, Typography } from "@mui/material";
import { auth } from "../../firebaseConfig";

const Deposit = ({ onDeposit }) => {
  const [amount, setAmount] = useState('');

  useEffect(() => {
    // Sync the amount to localStorage whenever it updates
    const storedBalance = localStorage.getItem('walletBalance');
    if (storedBalance) setAmount(JSON.parse(storedBalance));
  }, []);

  const handleDeposit = () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: "pk_test_b7119ababa4c222d181f6f412c19d84f41763541",
      email: auth.currentUser.email,
      amount: amount * 100, 
      currency: "NGN",
      callback: (response) => {
        alert("Payment Successful: " + response.reference);

        const currentBalance = JSON.parse(localStorage.getItem('walletBalance')) || 0;
        const newBalance = currentBalance + Number(amount);

        localStorage.setItem('walletBalance', JSON.stringify(newBalance)); // Update balance in localStorage
        onDeposit(newBalance); // Optionally update parent component
      },
      onClose: () => alert("Transaction not completed."),
    });

    handler.openIframe();
  };

  return (
    <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Deposit Funds</Typography>
        <TextField
          label="Enter Amount (NGN)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={handleDeposit} fullWidth>
          Deposit
        </Button>
      </CardContent>
    </Card>
  );
};

export default Deposit;
