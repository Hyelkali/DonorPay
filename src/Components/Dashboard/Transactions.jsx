// Transactions.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig"; // Adjust the import according to your file structure
import { collection, onSnapshot } from "firebase/firestore";
import TransactionHistory from "./TransactionHistory"; // Your existing component to display transactions

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const transactionsRef = collection(db, `users/${auth.currentUser.uid}/transactions`);

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(transactionsRef, (snapshot) => {
      const fetchedTransactions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTransactions(fetchedTransactions);
    }, (error) => {
      console.error("Error fetching transactions: ", error);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Transaction History</h2>
      <TransactionHistory transactions={transactions} />
    </div>
  );
};

export default Transactions;
