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
  BottomNavigationAction,
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
import { useToast } from "../Components/ui/use-toast";

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
        variant: "destructive",
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
        variant: "destructive",
      });
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/payment-methods"
      );
      if (!response.ok) throw new Error("Failed to fetch payment methods");
      const data = await response.json();
      setPaymentMethods(data);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      addToast({
        title: "Error",
        description: "Failed to fetch payment methods. Please try again.",
        variant: "destructive",
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
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
  {/* Sidebar Drawer */}
  <Drawer
    variant={window.innerWidth >= 768 ? "persistent" : "temporary"}
    anchor="left"
    open={window.innerWidth >= 768 || open}
    onClose={() => setOpen(false)} // Close drawer on mobile when not needed
    sx={{
      width: { xs: 0, md: drawerWidth }, // Hide drawer on mobile
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
        display: { xs: "none", md: "block" }, // Show only on larger screens
      },
    }}
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

  {/* Main Content Area */}
  <Box
    sx={{
      flexGrow: 1,
      p: 3,
      width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` }, // Full width on mobile
      marginLeft: { md: `${drawerWidth}px` }, // Offset for desktop view
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Avatar src="/profile.jpg" alt="User Profile" sx={{ width: 60, height: 60 }} />
      <Typography sx={{ ml: 2 }}>Hello, {userData?.name}</Typography>
      <Box>
        <IconButton>
          <Brightness4Icon />
        </IconButton>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
      </Box>
    </Box>

    {/* Balance Card */}
    <Box sx={{ backgroundColor: "#01389b", color: "white", p: 3, borderRadius: 2, mt: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography>Total Balance</Typography>
        <IconButton>
          <VisibilityIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
        ₦ ****
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          sx={{ backgroundColor: "#0047bc", borderRadius: 5, color: "white", flexGrow: 1, mr: 1 }}
        >
          Income: ₦ ***
        </Button>
        <Button
          sx={{ backgroundColor: "#6b003d", borderRadius: 5, color: "white", flexGrow: 1 }}
        >
          Expense: ₦ ***
        </Button>
      </Box>
    </Box>
      <> </>
      <> </>
      <> </>
      <> </>
      <> </>
      <> </>
      <> </>
      <> </>
      <> </>
      <> </>
    {/* Dynamic Component Display */}
    <Fade in={fadeIn} timeout={300}>
      <Box sx={{ mt: 4 }}>
        {activeComponent === "welcome" && <Welcome />}
        {activeComponent === "wallet" && <Wallet wallet={wallet} />}
        {activeComponent === "deposit" && <PaymentForm paymentMethods={paymentMethods} />}
        {activeComponent === "transactions" && <TransactionHistory transactions={transactions} />}
        {activeComponent === "settings" && <UserProfile userData={userData} />}
      </Box>
    </Fade>

    {/* Bottom Navigation for mobile view */}
    <BottomNavigation
      showLabels
      value={bottomNavValue}
      onChange={(event, newValue) => {
        setBottomNavValue(newValue);
        const componentMap = ["wallet", "deposit", "transactions", "settings"];
        handleComponentChange(componentMap[newValue]);
      }}
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        display: { xs: "flex", md: "none" },
      }}
    >
   
      <BottomNavigationAction label="Wallet" icon={<AccountBalanceWallet />} />
      <BottomNavigationAction label="Deposit" icon={<Payment />} />
      <BottomNavigationAction label="Transactions" icon={<History />} />
      <BottomNavigationAction label="Settings" icon={<Settings />} />
    </BottomNavigation>
  </Box>
</Box>

  );
};

export default Dashboard;

const Welcome = () => (
  <Box>
    <Typography variant="h4">Welcome to the Dashboard</Typography>
  </Box>
);
