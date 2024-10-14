import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useToast } from "../ui/use-toast";
import { db, auth } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const banks = [
  "Access Bank", "FCMB", "First Bank", "Guaranty Trust Bank",
  "Zenith Bank", "UBA", "Ecobank", "Standard Chartered Bank",
  "Union Bank", "Wema Bank", "Sterling Bank", "Polaris Bank",
  "Heritage Bank", "Fidelity Bank", "Keystone Bank", "Opay", "Moniepoint"
];

const Withdraw = ({ wallet, setWallet }) => {
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankDetails, setBankDetails] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleVerifyAccount = () => {
    if (accountNumber && selectedBank) {
      const mockApiResponse = {
        bankName: selectedBank,
        accountNumber,
        accountHolderName: "John Doe"
      };
      setBankDetails(mockApiResponse);
    } else {
      addToast({
        title: "Error",
        description: "Please select a bank and enter an account number.",
        variant: "destructive",
      });
    }
  };

  const handleWithdraw = async () => {
    if (!auth.currentUser) {
      addToast({
        title: "Error",
        description: "User not authenticated.",
        variant: "destructive",
      });
      return;
    }

    if (!amount || !selectedBank || !accountNumber) {
      addToast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const withdrawalAmount = parseFloat(amount);
    if (withdrawalAmount <= 0 || withdrawalAmount > wallet.balance) {
      addToast({
        title: "Error",
        description: "Invalid withdrawal amount.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, `users/${auth.currentUser.uid}/transactions`), {
        type: "withdrawal",
        amount: withdrawalAmount,
        bank: selectedBank,
        accountNumber,
        timestamp: new Date(),
      });

      setWallet((prev) => ({
        ...prev,
        balance: prev.balance - withdrawalAmount,
      }));

      setSnackMessage(`Successfully withdrawn ₦${withdrawalAmount} to ${selectedBank}.`);
      setSnackOpen(true);
      resetFields();
    } catch (error) {
      console.error("Transaction failed:", error);
      addToast({
        title: "Error",
        description: "Transaction failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetFields = () => {
    setAmount("");
    setSelectedBank("");
    setAccountNumber("");
    setBankDetails(null);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">Withdraw Funds</Typography>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      />
      <TextField
        label="Select Bank"
        select
        value={selectedBank}
        onChange={(e) => setSelectedBank(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      >
        {banks.map((bank) => (
          <MenuItem key={bank} value={bank}>
            {bank}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Account Number"
        type="text"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleVerifyAccount}
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Verify Account"}
      </Button>

      {bankDetails && (
        <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc" }}>
          <Typography variant="h6">Verified Bank Details</Typography>
          <Typography>Bank: {bankDetails.bankName}</Typography>
          <Typography>Account Number: {bankDetails.accountNumber}</Typography>
          <Typography>Account Holder: {bankDetails.accountHolderName}</Typography>
        </Box>
      )}

      <Button
        variant="contained"
        color="secondary"
        onClick={handleWithdraw}
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Withdraw"}
      </Button>

      <Snackbar
        open={snackOpen}
        onClose={() => setSnackOpen(false)}
        autoHideDuration={3000}
      >
        <Alert onClose={() => setSnackOpen(false)} severity="success">
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

