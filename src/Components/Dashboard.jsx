import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
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
  Fade,
  BottomNavigation,
  BottomNavigationAction
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountBalanceWallet,
  Payment,
  Settings,
  History,
  Home
} from "@mui/icons-material";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Wallet } from "./Payment/Wallet";
import { TransactionHistory } from "./Payment/TransactionHistory";
import { UserProfile } from "./Payment/UserProfile";
import { PaymentForm } from "./Payment/PaymentForm";
import { useToast } from "../Components/ui/use-toast";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [wallet, setWallet] = useState({ balance: 100 });
  const [transactions, setTransactions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { addToast } = useToast();
  const [open, setOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("welcome");
  const [fadeIn, setFadeIn] = useState(true);
  const [bottomNavValue, setBottomNavValue] = useState("welcome");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) setUserData(userSnap.data());

      const transactionsRef = collection(
        db,
        `users/${auth.currentUser.uid}/transactions`
      );
      const transactionSnap = await getDocs(transactionsRef);
      setTransactions(transactionSnap.docs.map((doc) => doc.data()));

      fetchPayments();
      fetchWallet();
      fetchPaymentMethods();
    };
    fetchData();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/payments");
      if (!response.ok) throw new Error("Failed to fetch payments");
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      addToast({
        title: "Error",
        description: "Failed to fetch payments. Please try again.",
        variant: "destructive"
      });
    }
  };

  const fetchWallet = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/wallet");
      if (!response.ok) throw new Error("Failed to fetch wallet");
      const data = await response.json();
      setWallet(data);
    } catch (error) {
      console.error("Error fetching wallet:", error);
      addToast({
        title: "Error",
        description: "Failed to fetch wallet balance. Please try again.",
        variant: "destructive"
      });
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/payment-methods");
      if (!response.ok) throw new Error("Failed to fetch payment methods");
      const data = await response.json();
      setPaymentMethods(data);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      addToast({
        title: "Error",
        description: "Failed to fetch payment methods. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleComponentChange = (component) => {
    setFadeIn(false);
    setTimeout(() => {
      setActiveComponent(component);
      setFadeIn(true);
    }, 300);
    setOpen(false);
  };

  const handleLogout = async () => {
    navigate("/");

    try {
      await signOut(auth);
      addToast({
        title: "Success",
        description: "Logged out successfully."
      });
    } catch (error) {
      console.error("Error logging out:", error);
      addToast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        className="drawer"
        open={open || window.innerWidth >= 768}
        sx={{
          "& .MuiDrawer-paper": {
            width: window.innerWidth >= 768 ? 240 : 0,
            boxSizing: "border-box",
            display: { xs: "none", sm: "block" }
          }
        }}
      >
        <Box sx={{ width: 240, textAlign: "center", mt: 2 }}>
          <Typography variant="h6" align="center" sx={{ p: 2 }}>
            User Dashboard
          </Typography>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Avatar
              src="/profile.jpg"
              alt="User Profile"
              sx={{ width: 80, height: 80, mb: 1 }}
            />
            <Typography variant="body1" align="center">
              {userData?.firstName || userData?.surname}
            </Typography>
          </Box>
          <Divider sx={{ my: 4 }} />
          <List>
            <ListItem button onClick={() => handleComponentChange("welcome")}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => handleComponentChange("wallet")}>
              <ListItemIcon>
                <AccountBalanceWallet />
              </ListItemIcon>
              <ListItemText primary="Wallet" />
            </ListItem>
            <ListItem button onClick={() => handleComponentChange("deposit")}>
              <ListItemIcon>
                <Payment />
              </ListItemIcon>
              <ListItemText primary="Deposit" />
            </ListItem>
            <ListItem
              button
              onClick={() => handleComponentChange("transactions")}
            >
              <ListItemIcon>
                <History />
              </ListItemIcon>
              <ListItemText primary="Transactions" />
            </ListItem>
            <ListItem button onClick={() => handleComponentChange("settings")}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                color="warning"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Navbar for small screens */}
      <Box sx={{ p: 2, flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          {userData?.name}
          <Avatar
            src="/profile.jpg"
            alt="User Profile"
            sx={{ width: 40, height: 40 }}
          />
        </Box>

        {/* Main Content Area */}
        <Container maxWidth="md" sx={{ mt: 8 }}>
          <Fade in={fadeIn}>
            <Box>
              {/* Display "Welcome, {userData?.name}" only on 'welcome' component */}
              {activeComponent === "welcome" && (
                <>
                  <Typography variant="h4" gutterBottom>
                    Welcome back, {userData?.name}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Account Balance: ${wallet.balance}
                  </Typography>
                </>
              )}
              <Box mt={4}>
                {activeComponent === "welcome" && (
                  <Typography variant="h5">
                    Welcome to your dashboard, {userData?.firstName}!
                  </Typography>
                )}
                {activeComponent === "wallet" && (
                  <Wallet balance={wallet.balance} />
                )}
                {activeComponent === "deposit" && <PaymentForm />}
                {activeComponent === "transactions" && (
                  <TransactionHistory transactions={transactions} />
                )}
                {activeComponent === "settings" && (
                  <UserProfile user={userData} />
                )}
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Bottom Navigation for mobile */}
      <BottomNavigation
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          display: { xs: "flex", sm: "none" }
        }}
        value={bottomNavValue}
        onChange={(event, newValue) => {
          setBottomNavValue(newValue);
          handleComponentChange(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          value="welcome"
          icon={<Home />}
          sx={{
            color: "white",
            textShadow:
              "0 0 10px cyan, 0 0 20px cyan, 0 0 40px cyan, 0 0 80px cyan"
          }}
        />
        <BottomNavigationAction
          label="Wallet"
          value="wallet"
          icon={<AccountBalanceWallet />}
          sx={{
            color: "white",
            textShadow:
              "0 0 10px cyan, 0 0 20px cyan, 0 0 40px cyan, 0 0 80px cyan"
          }}
        />
        <BottomNavigationAction
          label="Deposit"
          value="deposit"
          icon={<Payment />}
          sx={{
            color: "white",
            textShadow:
              "0 0 10px cyan, 0 0 20px cyan, 0 0 40px cyan, 0 0 80px cyan"
          }}
        />
        <BottomNavigationAction
          label="Transactions"
          value="transactions"
          icon={<History />}
          sx={{
            color: "white",
            textShadow:
              "0 0 10px cyan, 0 0 20px cyan, 0 0 40px cyan, 0 0 80px cyan"
          }}
        />
        <BottomNavigationAction
          label="Settings"
          value="settings"
          icon={<Settings />}
          sx={{
            color: "white",
            textShadow:
              "0 0 10px cyan, 0 0 20px cyan, 0 0 40px cyan, 0 0 80px cyan"
          }}
        />
      </BottomNavigation>

     
    </Box>
  );
};

export default Dashboard;
