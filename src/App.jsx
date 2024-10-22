import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthProvider } from './Components/Context/AuthContext';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import ForgotPassword from './Components/ForgotPassword';
import About from './Components/NavLinks/About';
import Footer from './Components/NavLinks/Footer';
import InfoModal from './Components/InfoModal';
import Verify from './Components/Verify';
import Navbar from './Components/NavLinks/Navbar';
import Popup from './Components/Popup';
import Subscription from './Components/NavLinks/Subscription';
import Contact from './Components/NavLinks/Contact';
import Wallet from './Components/Dashboard/Wallet';
import Transaction from './Components/Dashboard/Transaction';
import DashSettings from './Components/Dashboard/DashSettings';
import Deposit from './Components/Dashboard/Deposit';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children; 
  }
}

// Define the DashboardLayout component
const DashboardLayout = ({ wallet, handleDeposit, handleWithdrawal, showNavbar }) => {
  const [activeComponent, setActiveComponent] = useState('main'); // Default component

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'wallet':
        return <Wallet wallet={wallet} />;
      case 'deposit':
        return <Deposit handleDeposit={handleDeposit} />;
      case 'transaction':
        return <Transaction />;
      case 'settings':
        return <DashSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      {showNavbar && <Navbar setActiveComponent={setActiveComponent} />}
      {renderActiveComponent()}
    </div>
  );
};

// Define routes inside App component
const App = () => {
  const [wallet, setWallet] = useState({ balance: 0 });
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (type, amount) => {
    const newTransaction = {
      id: Date.now(),
      type,
      amount,
      date: new Date().toLocaleString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const handleDeposit = (amount) => {
    setWallet((prev) => ({ ...prev, balance: prev.balance + amount }));
    addTransaction('Deposit', amount);
  };

  const handleWithdrawal = (amount) => {
    setWallet((prev) => ({ ...prev, balance: prev.balance - amount }));
    addTransaction('Withdrawal', amount);
  };

  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/register', element: <Register /> },
    { path: '/contact', element: <Contact /> },
    { path: '/login', element: <Login /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/about', element: <About /> },
    { path: '/footer', element: <Footer /> },
    { path: '/popup', element: <Popup /> },
    { path: '/infomodal', element: <InfoModal /> },
    { path: '/navbar', element: <Navbar /> },
    { path: '/subscription', element: <Subscription /> },
    { path: '/verify', element: <Verify /> },
    {
      path: '/dashboard',
      element: (
        <DashboardLayout
          wallet={wallet}
          handleDeposit={handleDeposit}
          handleWithdrawal={handleWithdrawal}
          showNavbar={false} // Set this to false to hide the navbar
        />
      ),
    },
  ]);

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
