import React, { useState } from 'react';

export const PaymentForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [beneficiaries, setBeneficiaries] = useState([{ id: '', name: '', amount: '' }]);

  const handleAddBeneficiary = () => {
    setBeneficiaries([...beneficiaries, { id: '', name: '', amount: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(parseFloat(amount), beneficiaries);
    setAmount('');
    setBeneficiaries([{ id: '', name: '', amount: '' }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Make a Payment</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      {beneficiaries.map((beneficiary, index) => (
        <div key={index}>
          <input
            type="text"
            value={beneficiary.name}
            onChange={(e) => {
              const newBeneficiaries = [...beneficiaries];
              newBeneficiaries[index].name = e.target.value;
              setBeneficiaries(newBeneficiaries);
            }}
            placeholder="Beneficiary Name"
            required
          />
          <input
            type="number"
            value={beneficiary.amount}
            onChange={(e) => {
              const newBeneficiaries = [...beneficiaries];
              newBeneficiaries[index].amount = e.target.value;
              setBeneficiaries(newBeneficiaries);
            }}
            placeholder="Beneficiary Amount"
            required
          />
        </div>
      ))}
      <button type="button" onClick={handleAddBeneficiary}>Add Beneficiary</button>
      <button type="submit">Submit Payment</button>
    </form>
  );
};
