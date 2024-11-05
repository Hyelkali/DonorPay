import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Donor from "../assets/donor.png";

const HeroSection = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // Check screen size

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
        alignItems: 'center',
        p: 2,
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      {/* Image Section */}
      <CardMedia
        component="img"
        image={Donor} // Replace with actual image URL
        alt="Payment System"
        sx={{
          borderRadius: '12px',
          width: isSmallScreen ? '100%' : '60%',
          maxHeight: 1000,
          objectFit: 'cover',
          mb: isSmallScreen ? 2 : 0,
        }}
      />

      {/* Text Section */}
      <CardContent
        sx={{
          textAlign: isSmallScreen ? 'center' : 'left',
          p: isSmallScreen ? 1 : 4,
        }}
      >
        <Typography variant="h5" gutterBottom>
        DonorPay provides a secure, cost-effective payment system for non-profits to collect donations across multiple channels. Enhance donor engagement with automated receipts and access to donation history. Ensure data privacy with advanced security measures. Provide real-time reporting and detailed transaction tracking to monitor fund usage effectively.
        </Typography>        
      </CardContent>
    </Card>
  );
  <Footer />
};

export default HeroSection;
