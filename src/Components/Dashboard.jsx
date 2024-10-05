import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Divider,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Slide,
  Fade,
} from '@mui/material';
import { Menu as MenuIcon, AccountBalanceWallet, Payment, Settings, History } from '@mui/icons-material';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { PaymentForm } from './Payment/PaymentForm';
import { PaymentList } from './Payment/PaymentList';
import { Wallet } from './Payment/Wallet';
import { TransactionHistory } from './Payment/TransactionHistory';
import { UserProfile } from './Payment/UserProfile';
import { PaymentMethods } from './Payment/PaymentMethods';
import { useToast } from '../Components/ui/use-toast';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [wallet, setWallet] = useState({ balance: 0 });
  const [transactions, setTransactions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { addToast } = useToast();

  // Sidebar state
  const [open, setOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('wallet'); // Default to 'wallet' component
  const [fadeIn, setFadeIn] = useState(true); // State for content transition

  useEffect(() => {
    const fetchData = async () => {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }

      const transactionsRef = collection(db, `users/${auth.currentUser.uid}/transactions`);
      const transactionSnap = await getDocs(transactionsRef);
      const transactionList = transactionSnap.docs.map((doc) => doc.data());
      setTransactions(transactionList);

      fetchPayments();
      fetchWallet();
      fetchPaymentMethods();
    };

    fetchData();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/payments');
      if (!response.ok) throw new Error('Failed to fetch payments');
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
      addToast({
        title: "Error",
        description: "Failed to fetch payments. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchWallet = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/wallet');
      if (!response.ok) throw new Error('Failed to fetch wallet');
      const data = await response.json();
      setWallet(data);
    } catch (error) {
      console.error('Error fetching wallet:', error);
      addToast({
        title: "Error",
        description: "Failed to fetch wallet balance. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/payment-methods');
      if (!response.ok) throw new Error('Failed to fetch payment methods');
      const data = await response.json();
      setPaymentMethods(data);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      addToast({
        title: "Error",
        description: "Failed to fetch payment methods. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleComponentChange = (component) => {
    setFadeIn(false); // Fade out before component change
    setTimeout(() => {
      setActiveComponent(component);
      setFadeIn(true); // Fade in the new component
    }, 300); // Duration should match the fade-out time
    setOpen(false); // Close sidebar after selecting
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      addToast({
        title: "Success",
        description: "Logged out successfully.",
      });
    } catch (error) {
      console.error('Error logging out:', error);
      addToast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar Drawer with Slide Transition */}
      <Slide direction="right" in={open} mountOnEnter unmountOnExit>
        <Drawer variant="persistent" anchor="left" open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 250 }}>
            <Typography variant="h6" align="center" sx={{ p: 2 }}>User Dashboard</Typography>
            <Divider />
            <List>
              <ListItem button onClick={() => handleComponentChange('wallet')}>
                <ListItemIcon><AccountBalanceWallet /></ListItemIcon>
                <ListItemText primary="Wallet" />
              </ListItem>
              <ListItem button onClick={() => handleComponentChange('deposit')}>
                <ListItemIcon><Payment /></ListItemIcon>
                <ListItemText primary="Deposit" />
              </ListItem>
              <ListItem button onClick={() => handleComponentChange('transactions')}>
                <ListItemIcon><History /></ListItemIcon>
                <ListItemText primary="Transactions" />
              </ListItem>
              <ListItem button onClick={() => handleComponentChange('settings')}>
                <ListItemIcon><Settings /></ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Slide>

      {/* Navbar Toggle Button */}
      <Box sx={{ p: 2 }}>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(!open)}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Main Content Area with Fade Transition */}
      <Container maxWidth="md" sx={{ mt: 8, flexGrow: 1 }}>
        <Fade in={fadeIn}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Welcome, {userData?.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Wallet Balance: ${wallet.balance}
            </Typography>

            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>

            <Box mt={4}>
              {activeComponent === 'wallet' && <Wallet balance={wallet.balance} />}
              {activeComponent === 'deposit' && <PaymentForm onSubmit={handlePaymentSubmit} />}
              {activeComponent === 'transactions' && <TransactionHistory transactions={transactions} />}
              {activeComponent === 'settings' && <UserProfile user={userData} onUpdateProfile={() => {}} />}
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Dashboard;
