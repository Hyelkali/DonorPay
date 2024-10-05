import React from 'react';

export const Wallet = ({ balance }) => {
  return (
    <div>
      <h2>Wallet</h2>
      <p>Balance: ${balance}</p>
    </div>
  );
};
