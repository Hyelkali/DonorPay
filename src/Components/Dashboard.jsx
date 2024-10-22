import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Fade,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { setDoc, doc } from "firebase/firestore";
import { useAuth } from "../../src/Components/Context/AuthContext";
import { useToast } from "../hook/useToast";
import Main from "./Dashboard/Main";
import Wallet from "./Dashboard/Wallet";
import Deposit from "./Dashboard/Deposit";
import Transaction from "./Dashboard/Transaction";
import DashSettings from "./Dashboard/DashSettings";
import { db } from "../firebaseConfig"; // Import your Firebase configuration
import { Home, CreditCard, PiggyBank, BarChart2, Settings } from "lucide-react"; // Import Lucide icons

const Dashboard = () => {
  const { userData, wallet, setWallet } = useAuth();
  const { addToast } = useToast();
  const [activeComponent, setActiveComponent] = useState("Wallet"); // Set default to Wallet
  const [fadeIn, setFadeIn] = useState(true);
  const [transactions, setTransactions] = useState([]); // Added transactions state

  const handleDeposit = async (amount) => {
    try {
      const newBalance = wallet.balance + amount;

      // Update the wallet in Firestore
      await setDoc(doc(db, "wallets", userData.uid), { balance: newBalance });

      // Update the local state
      setWallet({ balance: newBalance });

      // Add transaction to local state
      setTransactions((prev) => [
        { id: Date.now(), type: "Deposit", amount, date: new Date().toLocaleString() },
        ...prev,
      ]);

      // Notify user of success
      addToast("Deposit successful!", { appearance: "success" });
    } catch (error) {
      console.error("Error depositing amount:", error);
      addToast("Error depositing amount. Please try again.", { appearance: "error" });
    }
  };

  const handleWithdrawal = async (amount) => {
    try {
      if (wallet.balance < amount) {
        addToast("Insufficient balance for withdrawal.", { appearance: "error" });
        return;
      }

      const newBalance = wallet.balance - amount;

      // Update the wallet in Firestore
      await setDoc(doc(db, "wallets", userData.uid), { balance: newBalance });

      // Update the local state
      setWallet({ balance: newBalance });

      // Add transaction to local state
      setTransactions((prev) => [
        { id: Date.now(), type: "Withdrawal", amount, date: new Date().toLocaleString() },
        ...prev,
      ]);

      // Notify user of success
      addToast("Withdrawal successful!", { appearance: "success" });
    } catch (error) {
      console.error("Error withdrawing amount:", error);
      addToast("Error withdrawing amount. Please try again.", { appearance: "error" });
    }
  };

  const changeActiveComponent = (component) => {
    setActiveComponent(component);
    setFadeIn(false);
    setTimeout(() => {
      setFadeIn(true);
    }, 300);
  };

  // Render the appropriate active component
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <Main userName={userData?.name} />;
      case "Wallet":
        return <Wallet balance={wallet?.balance || 0} onWithdraw={handleWithdrawal} />; // Pass withdrawal handler
      case "Deposit":
        return <Deposit onDeposit={handleDeposit} />;
      case "Transaction":
        return <Transaction transactions={transactions} />;
      case "Setting":
        return <DashSettings user={userData} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Navigation Bar for Desktop */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard {userData?.name}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flex: 1 }}>
        {/* Left Sidebar for Desktop */}
        <nav className="hidden md:flex flex-col justify-between w-64 bg-gray-800 text-white p-4">
          <div className="space-y-4">
            {[{ name: "Home", icon: Home },
              { name: "Wallet", icon: CreditCard },
              { name: "Deposit", icon: PiggyBank },
              { name: "Transaction", icon: BarChart2 },
              { name: "Setting", icon: Settings }].map((item) => (
                <button
                  key={item.name}
                  className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-colors ${activeComponent === item.name ? "bg-blue-600" : "hover:bg-gray-700"}`}
                  onClick={() => changeActiveComponent(item.name)}
                >
                  <item.icon className="w-6 h-6" />
                  <span>{item.name}</span>
                </button>
              ))}
          </div>
        </nav>

        {/* Main Content Area */}
        <Container maxWidth="md" sx={{ mt: 2, flex: 1 }}>
          <Fade in={fadeIn}>
            <Box>
              {renderActiveComponent()}
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Bottom Navbar for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
        <div className="flex justify-between">
          {[{ name: "Home", icon: Home },
            { name: "Wallet", icon: CreditCard },
            { name: "Deposit", icon: PiggyBank },
            { name: "Transaction", icon: BarChart2 },
            { name: "Setting", icon: Settings }].map((item) => (
              <button
                key={item.name}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeComponent === item.name ? "text-blue-400" : "hover:text-gray-300"}`}
                onClick={() => changeActiveComponent(item.name)}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs mt-1">{item.name}</span>
              </button>
            ))}
        </div>
      </nav>
    </Box>
  );
};

export default Dashboard;
