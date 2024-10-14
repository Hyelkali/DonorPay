import React, { useEffect, useState, useCallback } from "react";
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
  Sun,
  Fade,
  BottomNavigation,
  BottomNavigationAction,
  CircularProgress,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountBalanceWallet,
  Payment,
  Settings,
  History,
  Home as HomeIcon,
  Brightness4 as Brightness4Icon,
  Notifications as NotificationsIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Wallet } from "./Payment/Wallet";
import { TransactionHistory } from "./Payment/TransactionHistory";
import { UserProfile } from "./Payment/UserProfile";
import { PaymentForm } from "./Payment/PaymentForm";
import { useToast } from "./ui/use-toast";

const drawerWidth = 250;

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
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) setUserData(userSnap.data());

        const transactionsRef = collection(
          db,
          `users/${auth.currentUser.uid}/transactions`
        );
        const transactionSnap = await getDocs(transactionsRef);
        setTransactions(transactionSnap.docs.map((doc) => doc.data()));

        await fetchPayments();
        await fetchWallet();
        await fetchPaymentMethods();
      } catch (error) {
        console.error("Error fetching data:", error);
        addToast({
          title: "Error",
          description: "Failed to load data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [addToast]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchPayments = async () => {
    // Fetch payments logic here
  };

  const fetchWallet = async () => {
    // Fetch wallet logic here
  };

  const fetchPaymentMethods = async () => {
    // Fetch payment methods logic here
  };

  const handleComponentChange = useCallback((component) => {
    setFadeIn(false);
    setTimeout(() => {
      setActiveComponent(component);
      setFadeIn(true);
    }, 300);
    setOpen(false);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      navigate("/");
      addToast({
        title: "Success",
        description: "Logged out successfully.",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      addToast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  }, [navigate, addToast]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={isMobile ? open : true}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ width: drawerWidth, textAlign: "center", mt: 0 }}>
          <Typography variant="h6" align="center" sx={{ p: 2 }}>
            User Dashboard
          </Typography>
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar src="/profile.jpg" alt="User Profile" sx={{ width: 80, height: 80, mb: 1 }} />
            <Typography variant="body1" align="center">
              {userData?.firstName || userData?.surname}
            </Typography>
          </Box>
          <Divider sx={{ my: 4 }} />
          <List>
            <ListItem button onClick={() => handleComponentChange("welcome")}>
              <ListItemIcon>
                <HomeIcon />
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
            <ListItem button onClick={() => handleComponentChange("transactions")}>
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
              <Button variant="contained" color="warning" onClick={handleLogout}>
                Logout
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1, p: 3, marginLeft: { md: `${drawerWidth}px` } }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Fade in={fadeIn}>
            <Container>
              {/* Components rendering based on state */}
              {activeComponent === "welcome" && <div>Welcome</div>}
              {activeComponent === "wallet" && <Wallet wallet={wallet} />}
              {activeComponent === "transactions" && <TransactionHistory transactions={transactions} />}
              {activeComponent === "deposit" && <PaymentForm paymentMethods={paymentMethods} />}
              {activeComponent === "settings" && <UserProfile />}
            </Container>
          </Fade>
        )}

        {isMobile && (
          <BottomNavigation
            value={bottomNavValue}
            onChange={(event, newValue) => setBottomNavValue(newValue)}
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => handleComponentChange("welcome")} />
            <BottomNavigationAction label="Wallet" icon={<AccountBalanceWallet />} onClick={() => handleComponentChange("wallet")} />
            <BottomNavigationAction label="Deposit" icon={<Payment />} onClick={() => handleComponentChange("deposit")} />
            <BottomNavigationAction label="Transactions" icon={<History />} onClick={() => handleComponentChange("transactions")} />
          </BottomNavigation>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
