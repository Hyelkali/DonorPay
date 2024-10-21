// src/Dashboard/TransactionHistory.jsx
import React from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Grid, 
  Chip 
} from "@mui/material";

const TransactionHistory = ({ transactions }) => {
  return (
    <Box 
      sx={{ 
        padding: 3, 
        backgroundColor: "#f4f6f8", 
        minHeight: "100vh" 
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ marginBottom: 3, textAlign: "center", fontWeight: 600 }}
      >
        Transaction History
      </Typography>

      {transactions.length === 0 ? (
        <Typography 
          variant="h6" 
          color="text.secondary" 
          textAlign="center"
        >
          No transactions available.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {transactions.map((transaction) => (
            <Grid item xs={12} sm={6} md={4} key={transaction.id}>
              <Card 
                sx={{ 
                  borderRadius: 2, 
                  boxShadow: 2, 
                  backgroundColor: "#fff", 
                  overflow: "hidden" 
                }}
              >
                <CardContent>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ fontWeight: 600 }}
                  >
                    {transaction.description}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ marginBottom: 1 }}
                  >
                    {new Date(transaction.date).toLocaleDateString()}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="primary" 
                    sx={{ marginBottom: 2 }}
                  >
                    ₦{transaction.amount.toLocaleString()}
                  </Typography>
                  <Chip 
                    label={transaction.status} 
                    color={transaction.status === "Completed" ? "success" : "error"} 
                    sx={{ marginTop: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TransactionHistory;
