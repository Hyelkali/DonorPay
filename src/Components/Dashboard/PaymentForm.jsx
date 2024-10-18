// src/Dashboard/PaymentForm.jsx

import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js"; // Import Stripe.js

const stripePromise = loadStripe("your_stripe_public_key"); // Replace with your Stripe public key

const PaymentForm = ({ onDeposit }) => {
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    if (!amount) {
      alert("Please enter a valid amount.");
      return;
    }

    const stripe = await stripePromise;

    // Assuming you have a backend endpoint for creating a payment intent
    const response = await fetch("your_backend_endpoint/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: parseFloat(amount) * 100 }), // Amount in cents
    });

    const { clientSecret } = await response.json();

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: "price_id", quantity: 1 }], // Replace with your price ID
      mode: "payment",
      successUrl: window.location.origin + "/success",
      cancelUrl: window.location.origin + "/cancel",
    });

    if (error) {
      console.error("Error:", error);
    } else {
      onDeposit(amount); // Call the onDeposit function passed as a prop
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Deposit Funds
      </Typography>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handlePayment}
        sx={{ width: "100%" }}
      >
        Deposit
      </Button>
    </Box>
  );
};

export default PaymentForm;
