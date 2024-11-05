import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './Context/AuthContext';
import Layout from './Components/Layout';
import Home from './Components/Home';
import About from './Components/NavLinks/About';
import Contact from './Components/NavLinks/Contact';
import Login from "./Components/login";
import Dashboard from './Components/Dashboard';
import Subscription from './Components/NavLinks/Subscription';
import NotFound from './Components/NotFound';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>Something went wrong. Please try again later.</h1>
          <button onClick={() => window.location.href = '/'}>Go to Home</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Custom Theme Configuration
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

// Main App Component
const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </ErrorBoundary>
    </AuthProvider>
  </ThemeProvider>
);

export default App;