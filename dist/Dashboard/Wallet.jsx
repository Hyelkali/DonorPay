import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Box, TextField, Modal, CircularProgress } from "@mui/material";
import { Wallet as WalletIcon } from "@mui/icons-material";

const Wallet = () => {
  const [amount, setAmount] = useState('');
  const [wallet, setWallet] = useState(0); // Initial state from localStorage
  const [pin, setPin] = useState('');
  const [storedPin, setStoredPin] = useState("2345");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pinModalOpen, setPinModalOpen] = useState(false);

  useEffect(() => {
    // Retrieve wallet balance from localStorage when component loads
    const savedBalance = JSON.parse(localStorage.getItem('walletBalance')) || 0;
    setWallet(savedBalance);
  }, []);

  const handleWithdraw = () => {
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0 || numericAmount > wallet) {
      alert("Invalid amount.");
      return;
    }
    setPinModalOpen(true);
  };

  const verifyPinAndProceed = () => {
    if (pin === storedPin) {
      setLoading(true);
      const numericAmount = Number(amount);
      const newBalance = wallet - numericAmount;

      // Update wallet balance and localStorage
      setWallet(newBalance);
      localStorage.setItem('walletBalance', JSON.stringify(newBalance));

      setLoading(false);
      alert("Withdrawal successful!");
      setModalOpen(false);
      setPinModalOpen(false);
      setAmount('');
      setPin('');
    } else {
      alert("Invalid PIN. Please try again.");
      setPin('');
    }
  };

  return (
    <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <WalletIcon sx={{ marginRight: 1 }} />
          <Typography variant="h5">Wallet Balance</Typography>
        </Box>
        <Typography variant="h4">₦{wallet}</Typography>
        <Button variant="contained" onClick={() => setModalOpen(true)} sx={{ marginTop: 2 }}>
          Withdraw
        </Button>
      </CardContent>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Withdraw Funds</Typography>
          <TextField
            label="Enter Amount (NGN)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" onClick={handleWithdraw} fullWidth>
            Proceed to PIN Verification
          </Button>
        </Box>
      </Modal>

      <Modal open={pinModalOpen} onClose={() => setPinModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Enter Transaction PIN</Typography>
          <TextField
            label="4-digit PIN"
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            inputProps={{ maxLength: 4 }}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" onClick={verifyPinAndProceed} disabled={loading} fullWidth>
            {loading ? <CircularProgress size={24} /> : "Verify and Withdraw"}
          </Button>
        </Box>
      </Modal>
    </Card>
  );
};

export default Wallet;
