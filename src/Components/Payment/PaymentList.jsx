import React from 'react';

export const PaymentList = ({ payments, onExecute }) => {
  return (
    <div>
      <h2>Payment List</h2>
      <ul>
        {payments.map(payment => (
          <li key={payment.id}>
            {payment.amount} - {payment.status}
            <button onClick={() => onExecute(payment.id)}>Execute</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
