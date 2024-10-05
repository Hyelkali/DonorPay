import React, { useState } from 'react'; // Import useState from React

export const PaymentMethods = ({ paymentMethods, onAddPaymentMethod, onRemovePaymentMethod }) => {
  const [newMethod, setNewMethod] = useState({ type: '', last4: '', expirationDate: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    onAddPaymentMethod(newMethod);
    setNewMethod({ type: '', last4: '', expirationDate: '' });
  };

  return (
    <div>
      <h2>Payment Methods</h2>
      <ul>
        {paymentMethods.map(method => (
          <li key={method.id}>
            {method.type} ending in {method.last4}
            <button onClick={() => onRemovePaymentMethod(method.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={newMethod.type}
          onChange={(e) => setNewMethod({ ...newMethod, type: e.target.value })}
          placeholder="Type (credit/debit)"
          required
        />
        <input
          type="text"
          value={newMethod.last4}
          onChange={(e) => setNewMethod({ ...newMethod, last4: e.target.value })}
          placeholder="Last 4 Digits"
          required
        />
        <input
          type="text"
          value={newMethod.expirationDate}
          onChange={(e) => setNewMethod({ ...newMethod, expirationDate: e.target.value })}
          placeholder="Expiration Date"
          required
        />
        <button type="submit">Add Payment Method</button>
      </form>
    </div>
  );
};
