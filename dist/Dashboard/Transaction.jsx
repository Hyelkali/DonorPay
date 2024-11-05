import React from "react";
import { Card, CardContent, Typography, List, ListItem, Divider } from "@mui/material";

const Transaction = ({ transactions = [] }) => (
  <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3 }}>
    <CardContent>
      <Typography variant="h5" gutterBottom>Transaction History</Typography>
      <List>
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <React.Fragment key={tx.id}>
              <ListItem>
                {tx.type}: ₦{tx.amount} - {tx.date}
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <ListItem>No transactions available.</ListItem>
        )}
      </List>
    </CardContent>
  </Card>
);

export default Transaction;
