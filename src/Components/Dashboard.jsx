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
  Fade,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountBalanceWallet,
  Payment,
  Settings,
  History,
  Home as HomeIcon
} from "@mui/icons-material";
import { auth, db } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useToast } from "../Components/ui/use-toast";
import Main from "./Dashboard/Main";
import Wallet from "./Dashboard/Wallet";
import Deposit from "./Dashboard/Deposit";
import Transactions from "./Dashboard/Transactions";
import DashSettings from "./Dashboard/DashSettings";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [wallet, setWallet] = useState({ balance: 100 });
  const [transactions, setTransactions] = useState([]);
  const { addToast } = useToast();
  const [open, setOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("welcome");
  const [fadeIn, setFadeIn] = useState(true);
  const [bottomNavValue, setBottomNavValue] = useState("welcome");
  const navigate = useNavigate();
  const [totalDeposited, setTotalDeposited] = useState(0);
  const isDesktop = useMediaQuery("(min-width:768px)");

  useEffect(() => {
    const fetchData = async () => {
      // Fetch user data from Firebase
      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
      setUserData(userDoc.data());
    };
    fetchData();
  }, [addToast]);

  const handleComponentChange = (component) => {
    setFadeIn(false);
    setTimeout(() => {
      setActiveComponent(component);
      setFadeIn(true);
    }, 300);
    setOpen(false);
  };

  const handleDeposit = (amount) => {
    setTotalDeposited((prev) => prev + parseFloat(amount));
    setWallet((prev) => ({
      ...prev,
      balance: prev.balance + parseFloat(amount),
    }));
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Redirect to home after logout
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open || isDesktop}
        sx={{
          "& .MuiDrawer-paper": {
            width: isDesktop ? 240 : 0,
            boxSizing: "border-box",
            display: { xs: "none", sm: "block" },
          },
        }}
      >
        <Box sx={{ width: 240, textAlign: "center", mt: 2 }}>
          <Typography variant="h6" align="center" sx={{ p: 2 }}>
            User Dashboard
          </Typography>
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="body1" align="center">
              {userData?.firstName || userData?.surname}
            </Typography>
          </Box>
          <Divider sx={{ my: 4 }} />
          <List>
            {[
              { label: "Home", icon: <HomeIcon />, value: "welcome" },
              { label: "Wallet", icon: <AccountBalanceWallet />, value: "wallet" },
              { label: "Deposit", icon: <Payment />, value: "deposit" },
              { label: "Transactions", icon: <History />, value: "transactions" },
              { label: "Settings", icon: <Settings />, value: "settings" },
            ].map(({ label, icon, value }) => (
              <ListItem button key={label} onClick={() => handleComponentChange(value)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            ))}
            <ListItem>
              <Button variant="contained" color="warning" onClick={handleLogout}>
                Logout
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box sx={{ p: 2, flexGrow: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {userData?.name}
          <Avatar src="/profile.jpg" alt="User Profile" sx={{ width: 40, height: 40 }} />
        </Box>

        <Container maxWidth="md" sx={{ mt: 8 }}>
          <Fade in={fadeIn}>
            <Box>
              {activeComponent === "welcome" && <Main userName={userData?.name} />}
              {activeComponent === "wallet" && <Wallet balance={wallet.balance} />}
              {activeComponent === "deposit" && <Deposit onDeposit={handleDeposit} />}
              {activeComponent === "transactions" && <Transactions transactions={transactions} />}
              {activeComponent === "settings" && <DashSettings user={userData} />}
            </Box>
          </Fade>
        </Container>
      </Box>

      <BottomNavigation
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          display: { xs: "flex", sm: "none" },
        }}
        value={bottomNavValue}
        onChange={(event, newValue) => {
          setBottomNavValue(newValue);
          handleComponentChange(newValue);
        }}
      >
        {[
          { label: "Home", value: "welcome", icon: <HomeIcon /> },
          { label: "Wallet", value: "wallet", icon: <AccountBalanceWallet /> },
          { label: "Deposit", value: "deposit", icon: <Payment /> },
          { label: "Transactions", value: "transactions", icon: <History /> },
          { label: "Settings", value: "settings", icon: <Settings /> },
        ].map(({ label, value, icon }) => (
          <BottomNavigationAction key={label} label={label} value={value} icon={icon} />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default Dashboard;
