// src/Components/Dashboard/Withdrawal.jsx
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const Withdrawal = ({ onWithdraw }) => {
  const [amount, setAmount] = useState('');

  const handleWithdraw = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      onWithdraw(parsedAmount);
      setAmount(''); // Clear input after withdrawal
    } else {
      alert('Please enter a valid amount.');
    }
  };

  return (
    <div>
      <h2>Withdrawal</h2>
      <TextField
        type="number"
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleWithdraw}>
        Withdraw
      </Button>
    </div>
  );
};

export default Withdrawal;
