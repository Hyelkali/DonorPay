import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, Link, Alert } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Ensure the correct path

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to manage error messages
  const navigate = useNavigate();

  const demoEmail= "admin@gmail.com";
  const demoPass= "12345@Nath";


  const handleLogin = async () => {
    try {
      if(email===demoEmail || password===demoPass){
        navigate('/dashboard');
      }
      setError(null); // Reset the error state before attempting login
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Navigate to the dashboard on successful login
    } catch (error) {
      // Customize the error handling based on the error message
      if (error.code === 'auth/user-not-found') {
        setError('No account found with this email. Would you like to create one?');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
      console.error('Login failed:', error);
    }
  };

  return (
    <Container
      component={Paper}
      elevation={6}
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        backgroundImage: 'url(https://your-image-url.com)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          width: { xs: '90%', sm: '400px' },
          padding: 3,
          borderRadius: 2,
          backgroundColor: 'white',
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        {/* Display error alert if there is an error */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleLogin} fullWidth>
          Login
        </Button>
        <Box mt={2} textAlign="center">
          <Link component={RouterLink} to="/forgot-password" variant="body2">
            Forgot Password?
          </Link>
        </Box>
        <Box mt={1} textAlign="center">
          <Link component={RouterLink} to="/register" variant="body2"> {/* Ensure this points to the correct signup route */}
            Don't have an account? Sign Up
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
