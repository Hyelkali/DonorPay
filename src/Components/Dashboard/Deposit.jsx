// src/Dashboard/Deposit.jsx

import React from "react";
import PaymentForm from "./PaymentForm";

const Deposit = ({ onDeposit }) => (
  <PaymentForm onDeposit={onDeposit} />
);

export default Deposit;
