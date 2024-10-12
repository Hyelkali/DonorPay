import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Modal, Snackbar, Alert } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Make sure the path to your firebaseConfig is correct

const Subscription = () => {
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({ message: '', severity: 'success' });
  const [showNotification, setShowNotification] = useState(false);

  const handleSubscription = async () => {
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const collectionRef = collection(db, 'subscribers');
      await addDoc(collectionRef, { email });
      setError('');
      setOpen(false); // Close the modal after successful subscription
      setNotification({ message: 'Subscription successful!', severity: 'success' });
      setShowNotification(true); // Show success notification
    } catch (error) {
      console.error('Error subscribing:', error);
      setError('Failed to subscribe. Please try again later.');
      setNotification({ message: 'Failed to subscribe!', severity: 'error' });
      setShowNotification(true); // Show error notification
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseNotification = () => setShowNotification(false); // Close the notification

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Subscribe to Newsletter</Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: 400, margin: 'auto', mt: '10%', padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
          <Typography variant="h6" gutterBottom>
            Subscribe to Our Newsletter
          </Typography>
          <TextField 
            label="Email Address" 
            fullWidth 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            error={!!error}
            helperText={error}
          />
          <Button variant="contained" sx={{ mt: 2 }} fullWidth onClick={handleSubscription}>
            Subscribe
          </Button>
        </Box>
      </Modal>

      {/* Snackbar for success or error notifications */}
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Subscription;
