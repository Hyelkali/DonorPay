import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Modal,
  CircularProgress,
} from "@mui/material";
import { Wallet as WalletIcon } from "@mui/icons-material";
import { auth } from '../../firebaseConfig'; // Adjust the path as necessary
import { firebaseOnAuthStateChanged } from "../../firebaseConfig";

const Wallet = ({ wallet, onWithdraw }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Fetch user email from Firebase
  useEffect(() => {
    const unsubscribe = firebaseOnAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); // Set user email from Firebase
      } else {
        setUserEmail(""); // User is signed out
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const handleWithdraw = () => {
    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0 || numericAmount > wallet.balance) {
      alert("Invalid amount.");
      return;
    }

    setLoading(true);

    const handler = window.PaystackPop.setup({
      key: "pk_test_b7119ababa4c222d181f6f412c19d84f41763541",
      email: userEmail, // Use email from Firebase
      amount: numericAmount * 100,
      currency: "NGN",
      callback: (response) => {
        alert("Withdrawal Successful: " + response.reference);
        onWithdraw(numericAmount);
        setLoading(false);
        setAmount("");
        setModalOpen(false);
      },
      onClose: () => {
        alert("Transaction cancelled.");
        setLoading(false);
      },
    });

    handler.openIframe();
  };

  return (
    <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <WalletIcon sx={{ marginRight: 1 }} />
          <Typography variant="h5">Wallet Balance</Typography>
        </Box>
        <Typography variant="h4">₦{wallet?.balance || 0}</Typography>
        <Button
          variant="contained"
          onClick={() => setModalOpen(true)}
          sx={{ marginTop: 2 }}
        >
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
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Withdraw Funds
          </Typography>
          <TextField
            label="Enter Amount (NGN)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleWithdraw}
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Withdraw"}
          </Button>
        </Box>
      </Modal>
    </Card>
  );
};

export default Wallet;
