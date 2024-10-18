import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  AccountBalanceWallet as WalletIcon,
  AddCircle as AddCircleIcon,
  Send as SendIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useToast } from "../ui/use-toast"; 
import { db, auth } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import PaystackPop from "@paystack/inline-js";

const banks = [
  "Access Bank", "FCMB", "First Bank", "Guaranty Trust Bank", 
  "Zenith Bank", "UBA", "Ecobank", "Standard Chartered Bank", 
  "Union Bank", "Wema Bank", "Sterling Bank", "Polaris Bank", 
  "Heritage Bank", "Fidelity Bank", "Keystone Bank", "Opay", "Moniepoint"
];

const Wallet = ({ wallet, setWallet }) => {
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankDetails, setBankDetails] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const { addToast } = useToast();

  const toggleBalanceVisibility = () => setShowBalance(!showBalance);

  const handleVerifyAccount = () => {
    if (accountNumber && selectedBank) {
      const mockApiResponse = {
        bankName: selectedBank,
        accountNumber,
        accountHolderName: "John Doe",
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

  const handleAddMoney = () => {
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_test_b7119ababa4c222d181f6f412c19d84f41763541",
      amount: parseFloat(amount) * 100, // Convert to kobo
      email: auth.currentUser?.email,
      onSuccess: (transaction) => {
        setWallet((prev) => ({
          ...prev,
          balance: prev.balance + parseFloat(amount),
        }));
        setSnackMessage(`Successfully added ₦${amount} to wallet.`);
        setSnackOpen(true);
      },
      onCancel: () => {
        addToast({
          title: "Payment Cancelled",
          description: "You cancelled the payment.",
          variant: "warning",
        });
      },
    });
  };

  return (
    <Card
      sx={{
        background: "linear-gradient(135deg, #0052D4, #4364F7)",
        borderRadius: 3,
        padding: 2,
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
      }}
    >
      <CardContent>
        <IconButton
          onClick={toggleBalanceVisibility}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "#fff",
            "&:hover": { color: "#FFD700" },
          }}
        >
          {showBalance ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>

        <Box display="flex" alignItems="center" mb={2}>
          <WalletIcon fontSize="large" sx={{ mr: 1 }} />
          <Typography variant="h5" fontWeight="bold">
            Total Balance
          </Typography>
        </Box>

        <Typography variant="h4" gutterBottom>
          {showBalance ? `₦${wallet.balance}` : "₦*******"}
        </Typography>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Button
            startIcon={<AddCircleIcon />}
            onClick={handleAddMoney}
            sx={{ backgroundColor: "#1565C0", color: "#fff", "&:hover": { backgroundColor: "#1E88E5" } }}
          >
            Add Money
          </Button>
          <Button
            startIcon={<SendIcon />}
            onClick={handleWithdraw}
            sx={{ backgroundColor: "#FFB300", color: "#fff", "&:hover": { backgroundColor: "#FFCA28" } }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Withdraw"}
          </Button>
        </Box>

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
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />

        {bankDetails && (
          <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc" }}>
            <Typography variant="h6">Verified Bank Details</Typography>
            <Typography>Bank: {bankDetails.bankName}</Typography>
            <Typography>Account Number: {bankDetails.accountNumber}</Typography>
            <Typography>Account Holder: {bankDetails.accountHolderName}</Typography>
          </Box>
        )}

        <Snackbar open={snackOpen} onClose={() => setSnackOpen(false)} autoHideDuration={3000}>
          <Alert onClose={() => setSnackOpen(false)} severity="success">
            {snackMessage}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default Wallet;
