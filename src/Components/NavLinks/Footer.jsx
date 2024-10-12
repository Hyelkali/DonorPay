import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import InfoModal from '../InfoModal'; // Import the modal component
import Subscription from './Subscription';
import './Footer.css';

const Footer = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  // Define sections and links with unique titles
  const sections = ["About DonorPay", "For Donors", "For Fundraisers", "Connect With Us"];
  const links = {
    "About DonorPay": [
      { title: "Our Story", content: "Details about our story..." },
      { title: "How It Works", content: "Explanation of how it works..." },
      { title: "Testimonials", content: "User testimonials..." }
    ],
    "For Donors": [
      { title: "Find Causes", content: "How to find causes..." },
      { title: "Giving Guide", content: "Guidance on giving..." },
      { title: "Tax Deductions", content: "Information about tax deductions..." }
    ],
    "For Fundraisers": [
      { title: "Start a Campaign", content: "How to start a campaign..." },
      { title: "Fundraising Tips", content: "Tips for fundraising..." },
      { title: "Success Stories", content: "Successful fundraising stories..." }
    ],
    "Connect With Us": [
      { title: "Contact Support", content: "How to contact support..." },
      { title: "Facebook", content: "Link to our Facebook page..." },
      { title: "Twitter", content: "Link to our Twitter account..." }
    ],
  };

  const handleOpenModal = (title, content) => {
    console.log("Opening modal with:", { title, content }); // Log to verify correct title and content
    setModalContent({ title, content });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <footer className="footer">
      <Box className="footerDiv">
        <Grid container spacing={3}>
          {sections.map((section, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Typography variant="h6" className="fth4">{section}</Typography>
              <ul className="ftul">
                {links[section].map((link, i) => (
                  <li key={i}>
                    <Link
                      to="#"
                      className="ftlnk"
                      onClick={() => handleOpenModal(link.title, link.content)} // Open modal on click
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <div className="lastDonor" style={{ textAlign: 'center', marginTop: '20px' }}>
          < Subscription />
          <Typography variant="body2">&copy; 2024 DonorPay. All rights reserved.</Typography>
        </div>
      </Box>
      <InfoModal 
        open={openModal} 
        handleClose={handleCloseModal} 
        title={modalContent.title} 
        content={modalContent.content} 
      />
      
    </footer>
  );
};

export default Footer;
