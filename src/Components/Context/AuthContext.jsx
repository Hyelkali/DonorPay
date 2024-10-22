// src/Components/Context/AuthContext.js (or wherever you manage the user state)
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [wallet, setWallet] = useState({ balance: 0 });
  const [userData, setUserData] = useState(null); // Adjust based on your user data structure

  return (
    <AuthContext.Provider value={{ userData, setUserData, wallet, setWallet }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
