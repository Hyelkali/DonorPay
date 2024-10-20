// src/Dashboard/Deposit.jsx
import React from "react";
import { Button } from "@mui/material";
import { auth } from "../../firebaseConfig"; // Ensure this is imported

const Deposit = ({ onDeposit }) => {
  const handleDeposit = () => {
    const handler = window.PaystackPop.setup({
      key: "pk_test_b7119ababa4c222d181f6f412c19d84f41763541", // Replace with your Paystack public key
      email: auth.currentUser.email,
      amount: 1000 * 100, // Amount in kobo (1000 kobo = 10 naira)
      currency: "NGN", // Currency
      callback: function (response) {
        // Handle successful payment here
        alert("Payment Successful: " + response.reference);
        onDeposit(1000); // Call onDeposit to update your balance
      },
      onClose: function () {
        alert("Transaction was not completed, window closed.");
      },
    });

    handler.openIframe(); // Open Paystack payment dialog
  };

  return (
    <div>
      <h2>Deposit Funds</h2>
      <Button variant="contained" color="primary" onClick={handleDeposit}>
        Deposit
      </Button>
    </div>
  );
};

export default Deposit;