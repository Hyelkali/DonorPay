import React from 'react';

export const TransactionHistory = ({ transactions }) => {
  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {transaction.amount} - {transaction.type} on {transaction.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};
