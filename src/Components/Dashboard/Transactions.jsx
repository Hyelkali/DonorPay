// src/Dashboard/Transactions.jsx
import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const Transactions = ({ transactions }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Transaction History
      </Typography>
      <List>
        {transactions.map((transaction) => (
          <ListItem key={transaction.id}>
            <ListItemText
              primary={`Amount: ${transaction.amount / 100} NGN`}
              secondary={`Track ID: ${transaction.trackId} - Date: ${transaction.timestamp.toDate().toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Transactions;
