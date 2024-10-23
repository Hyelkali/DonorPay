import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Modal,
  CircularProgress,
} from "@mui/material";
import { Wallet as WalletIcon } from "@mui/icons-material";
import { auth, db, firebaseOnAuthStateChanged } from "../../firebaseConfig"; 
import { doc, getDoc } from "../../firebaseConfig";

const Wallet = ({ wallet, setWallet, onWithdraw }) => { // Accept setWallet as a prop
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [storedPin, setStoredPin] = useState("2345");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = firebaseOnAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setStoredPin(data.transactionPin || "2345");
          }
        } catch (error) {
          console.error("Error fetching PIN:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleWithdraw = () => {
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0 || numericAmount > wallet) {
      alert("Invalid amount.");
      return;
    }
    setPinModalOpen(true);
  };

  const verifyPinAndProceed = () => {
    if (pin === storedPin) {
      setLoading(true);
      const numericAmount = Number(amount);
      setWallet(wallet - numericAmount); // Update the wallet balance
      setLoading(false);
      alert("Withdrawal successful!"); // Optional success message
      setModalOpen(false); // Close the withdrawal modal
      setPinModalOpen(false); // Close the PIN modal
      setAmount(""); // Clear the amount input
      setPin(""); // Clear the PIN input
    } else {
      alert("Invalid PIN. Please try again.");
      setPin("");
    }
  };

  return (
    <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <WalletIcon sx={{ marginRight: 1 }} />
          <Typography variant="h5">Wallet Balance</Typography>
        </Box>
        <Typography variant="h4">₦{wallet}</Typography>
        <Button
          variant="contained"
          onClick={() => setModalOpen(true)}
          sx={{ marginTop: 2 }}
        >
          Withdraw
        </Button>
      </CardContent>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Withdraw Funds
          </Typography>
          <TextField
            label="Enter Amount (NGN)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleWithdraw}
            fullWidth
          >
            Proceed to PIN Verification
          </Button>
        </Box>
      </Modal>

      <Modal open={pinModalOpen} onClose={() => setPinModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Enter Transaction PIN
          </Typography>
          <TextField
            label="4-digit PIN"
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            inputProps={{ maxLength: 4 }}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            onClick={verifyPinAndProceed}
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Verify and Withdraw"}
          </Button>
        </Box>
      </Modal>
    </Card>
  );
};

export default Wallet;

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Box,
//   TextField,
//   Modal,
//   CircularProgress,
// } from "@mui/material";
// import { Wallet as WalletIcon } from "@mui/icons-material";
// import { auth, db, firebaseOnAuthStateChanged } from "../../firebaseConfig"; 
// import { doc, getDoc } from "../../firebaseConfig";

// const Wallet = ({ wallet, onWithdraw }) => {
//   const [amount, setAmount] = useState("");
//   const [pin, setPin] = useState(""); // PIN input state
//   const [storedPin, setStoredPin] = useState("2345"); // Stored PIN from Firestore
//   const [loading, setLoading] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false); // Amount modal
//   const [pinModalOpen, setPinModalOpen] = useState(false); // PIN modal
//   const [userEmail, setUserEmail] = useState("");

//   // Fetch user email and stored PIN on load
//   useEffect(() => {
//     const unsubscribe = firebaseOnAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUserEmail(user.email);

//         try {
//           const userDocRef = doc(db, "users", user.uid);
//           const userDoc = await getDoc(userDocRef);
//           if (userDoc.exists()) {
//             const data = userDoc.data();
//             console.log("Stored PIN:", data.transactionPin); // Debugging log
//             setStoredPin(data.transactionPin || "2345"); // Store the PIN
//           }
//         } catch (error) {
//           console.error("Error fetching PIN:", error); // Handle errors
//         }
//       }
//     });

//     return () => unsubscribe(); // Cleanup subscription
//   }, []);

//   const handleWithdraw = () => {
//     const numericAmount = Number(amount);

//     if (!numericAmount || numericAmount <= 0 || numericAmount > wallet ) {
//       alert("Invalid amount.");
//       return;
//     }

//     setPinModalOpen(true); // Open PIN modal
//   };

//   const verifyPinAndProceed = () => {
//     console.log("Entered PIN:", pin); // Debugging log
//     console.log("Stored PIN:", storedPin); // Debugging log

//     if (pin === storedPin) {
//       setLoading(true);
//       name - amount;
//         } else {
//       alert("Invalid PIN. Please try again."); // Error message if PIN is wrong
//       setPin(""); // Clear the PIN input
//     }
//   };
//   const name = JSON.parse(localStorage.getItem('name')) || '';
//   return (
//     <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3 }}>
//       <CardContent>
//         <Box display="flex" alignItems="center">
//           <WalletIcon sx={{ marginRight: 1 }} />
//           <Typography variant="h5">Wallet Balance</Typography>
//         </Box>
//         <Typography variant="h4">₦{name || wallet}</Typography>
//         <Button
//           variant="contained"
//           onClick={() => setModalOpen(true)}
//           sx={{ marginTop: 2 }}
//         >
//           Withdraw
//         </Button>
//       </CardContent>

//       {/* Withdrawal Amount Modal */}
//       <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 300,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="h6" sx={{ marginBottom: 2 }}>
//             Withdraw Funds
//           </Typography>
//           <TextField
//             label="Enter Amount (NGN)"
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             fullWidth
//             sx={{ marginBottom: 2 }}
//           />
//           <Button
//             variant="contained"
//             onClick={handleWithdraw}
//             fullWidth
//           >
//             Proceed to PIN Verification
//           </Button>
//         </Box>
//       </Modal>

//       {/* PIN Verification Modal */}
//       <Modal open={pinModalOpen} onClose={() => setPinModalOpen(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 300,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="h6" sx={{ marginBottom: 2 }}>
//             Enter Transaction PIN
//           </Typography>
//           <TextField
//             label="4-digit PIN"
//             type="password"
//             value={pin}
//             onChange={(e) => setPin(e.target.value)}
//             inputProps={{ maxLength: 4 }}
//             fullWidth
//             sx={{ marginBottom: 2 }}
//           />
//           <Button
//             variant="contained"
//             onClick={verifyPinAndProceed}
//             disabled={loading}
//             fullWidth
//           >
//             {loading ? <CircularProgress size={24} /> : "Verify and Withdraw"}
//           </Button>
//         </Box>
//       </Modal>
//     </Card>
//   );
// };

// export default Wallet;
