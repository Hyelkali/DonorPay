import React, { useState, useEffect } from 'react';
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const UserProfile = ({ onUpdateProfile }) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserInfo(userSnap.data());
        }
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await setDoc(userRef, userInfo, { merge: true });
    onUpdateProfile(userInfo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Profile</h2>
      <input
        type="text"
        value={userInfo.name}
        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={userInfo.email}
        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        placeholder="Email"
        required
      />
      <input
        type="text"
        value={userInfo.address}
        onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
        placeholder="Address"
        required
      />
      <button type="submit">Update Profile</button>
    </form>
  );
};
