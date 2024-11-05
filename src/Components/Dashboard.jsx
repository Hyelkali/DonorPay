'use client'

import React, { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, updatePassword } from 'firebase/auth'
import { getFirestore, doc, getDoc, updateDoc, collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { FaHome, FaWallet, FaMoneyBillWave, FaExchangeAlt, FaCog, FaBell, FaEye, FaEyeSlash, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { usePaystackPayment } from 'react-paystack'

const firebaseConfig = {
  apiKey: "AIzaSyC4m4DZwh6NzhCpv-Uvzd6N-3kDknu3QGY",
  authDomain: "snappy-cistern-434310-j1.firebaseapp.com",
  projectId: "snappy-cistern-434310-j1",
  storageBucket: "snappy-cistern-434310-j1.appspot.com",
  messagingSenderId: "310484394792",
  appId: "1:310484394792:web:06a6680b2f25f62b9f661d",
  measurementId: "G-TBY6QZT640"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState('home')
  const [balance, setBalance] = useState(0)
  const [showBalance, setShowBalance] = useState(true)
  const [transactions, setTransactions] = useState([])
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAccount, setWithdrawAccount] = useState('')
  const [currentPin, setCurrentPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmNewPin, setConfirmNewPin] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        const userDocRef = doc(db, 'users', user.uid)
        const unsubscribeUser = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setBalance(doc.data().balance || 0)
          }
        })
        
        const q = query(collection(db, 'transactions'), where('userId', '==', user.uid), orderBy('timestamp', 'desc'))
        const unsubscribeTransactions = onSnapshot(q, (snapshot) => {
          setTransactions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })

        const notifQuery = query(collection(db, 'notifications'), where('userId', '==', user.uid), orderBy('timestamp', 'desc'))
        const unsubscribeNotifications = onSnapshot(notifQuery, (snapshot) => {
          setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })

        return () => {
          unsubscribeUser()
          unsubscribeTransactions()
          unsubscribeNotifications()
        }
      } else {
        setUser(null)
        setBalance(0)
        setTransactions([])
        setNotifications([])
      }
    })

    return () => unsubscribe()
  }, [])

  const handleWithdraw = async () => {
    if (!withdrawAmount || !withdrawAccount) {
      toast.error('Please enter withdrawal amount and account')
      return
    }
    if (balance < parseFloat(withdrawAmount)) {
      toast.error('Insufficient balance')
      return
    }
    try {
      const newBalance = balance - parseFloat(withdrawAmount)
      await updateDoc(doc(db, 'users', user.uid), { balance: newBalance })
      const transactionRef = await addDoc(collection(db, 'transactions'), {
        userId: user.uid,
        type: 'withdrawal',
        amount: parseFloat(withdrawAmount),
        account: withdrawAccount,
        timestamp: new Date(),
        status: 'pending'
      })
      toast.success('Withdrawal initiated')
      
      // Simulate withdrawal process
      setTimeout(async () => {
        await updateDoc(doc(db, 'transactions', transactionRef.id), { status: 'completed' })
        await addDoc(collection(db, 'notifications'), {
          userId: user.uid,
          message: `Withdrawal of $${withdrawAmount} completed`,
          timestamp: new Date()
        })
        toast.success('Withdrawal completed')
      }, 5000)
    } catch (error) {
      console.error('Error during withdrawal:', error)
      toast.error('Withdrawal failed')
    }
  }

  const handleDeposit = async (response) => {
    try {
      const newBalance = balance + parseFloat(depositAmount)
      await updateDoc(doc(db, 'users', user.uid), { balance: newBalance })
      const transactionRef = await addDoc(collection(db, 'transactions'), {
        userId: user.uid,
        type: 'deposit',
        amount: parseFloat(depositAmount),
        timestamp: new Date(),
        status: 'completed',
        paystackReference: response.reference
      })
      await addDoc(collection(db, 'notifications'), {
        userId: user.uid,
        message: `Deposit of $${depositAmount} successful`,
        timestamp: new Date()
      })
      setDepositAmount('')
      toast.success('Deposit successful')
    } catch (error) {
      console.error('Error during deposit:', error)
      toast.error('Deposit failed')
    }
  }

  const handleChangePin = async () => {
    if (newPin !== confirmNewPin) {
      toast.error('New PINs do not match')
      return
    }
    try {
      await updateDoc(doc(db, 'users', user.uid), { pin: newPin })
      setCurrentPin('')
      setNewPin('')
      setConfirmNewPin('')
      toast.success('PIN changed successfully')
    } catch (error) {
      console.error('Error changing PIN:', error)
      toast.error('Failed to change PIN')
    }
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match')
      return
    }
    try {
      await updatePassword(user, newPassword)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
      toast.success('Password changed successfully')
    } catch (error) {
      console.error('Error changing password:', error)
      toast.error('Failed to change password')
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const config = {
    reference: (new Date()).getTime().toString(),
    email: user?.email,
    amount: parseFloat(depositAmount) * 100, // Paystack amount is in kobo
    publicKey: 'pk_test_b7119ababa4c222d181f6f412c19d84f41763541',
  }

  const initializePayment = usePaystackPayment(config)

  const onSuccess = (reference) => {
    handleDeposit(reference)
  }

  const onClose = () => {
    toast.error('Payment cancelled')
  }

  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Account Overview</h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold dark:text-white">${showBalance ? balance.toFixed(2) : '****'}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Current Balance</p>
                </div>
                <button onClick={() => setShowBalance(!showBalance)} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  {showBalance ? <FaEyeSlash className="text-gray-600 dark:text-gray-300" /> : <FaEye className="text-gray-600 dark:text-gray-300" />}
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Transactions</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={transactions.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tickFormatter={(timestamp) => new Date(timestamp.toDate()).toLocaleDateString()} />
                    <YAxis />
                    <Tooltip labelFormatter={(label) => new Date(label.toDate()).toLocaleString()} />
                    <Legend />
                    <Line type="monotone" dataKey="amount" name="Amount" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )
      case 'wallet':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Wallet</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold dark:text-white">${showBalance ? balance.toFixed(2) : '****'}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Available Balance</p>
                </div>
                <button onClick={() => setShowBalance(!showBalance)} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  {showBalance ? <FaEyeSlash className="text-gray-600 dark:text-gray-300" /> : <FaEye className="text-gray-600 dark:text-gray-300" />}
                </button>
              </div>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Withdrawal Amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                  type="text"
                  placeholder="Withdrawal Account"
                  value={withdrawAccount}
                  onChange={(e) => setWithdrawAccount(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <button onClick={handleWithdraw} className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Withdraw</button>
              </div>
            </div>
          </div>
        )
      case 'deposit':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Deposit</h2>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Deposit Amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <button onClick={() => initializePayment(onSuccess, onClose)} className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700">Deposit with Paystack</button>
            </div>
          </div>
        )
      case 'transactions':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Transaction History</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
                  <div>
                    <p className="font-semibold dark:text-white">{transaction.type}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(transaction.timestamp.toDate()).toLocaleString()}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Status: {transaction.status}</p>
                  </div>
                  <p className={`font-bold ${transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'}`}>
                    {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      case 'settings':
        return (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Change PIN</h2>
              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="Current PIN"
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white  dark:border-gray-600"
                />
                <input
                  type="password"
                  placeholder="New PIN"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                  type="password"
                  placeholder="Confirm New PIN"
                  value={confirmNewPin}
                  onChange={(e) => setConfirmNewPin(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <button onClick={handleChangePin} className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Change PIN</button>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Change Password</h2>
              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <button onClick={handleChangePassword} className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Change Password</button>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-700" />}
              </button>
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100">
                <FaBell />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{notifications.length}</span>
                )}
              </button>
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-full h-full rounded-full" />
                ) : (
                  <span className="text-xl font-semibold text-gray-700 dark:text-gray-200">{user.displayName ? user.displayName.charAt(0) : 'U'}</span>
                )}
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="flex">
                <div className="hidden md:flex md:flex-shrink-0">
                  <div className="flex flex-col w-64">
                    <nav className="mt-5 flex-1 px-2 bg-white dark:bg-gray-800 space-y-1">
                      <button onClick={() => setView('home')} className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md ${view === 'home' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}`}>
                        <FaHome className="mr-3 h-6 w-6" /> Home
                      </button>
                      <button onClick={() => setView('wallet')} className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md ${view === 'wallet' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}`}>
                        <FaWallet className="mr-3 h-6 w-6" /> Wallet
                      </button>
                      <button onClick={() => setView('deposit')} className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md ${view === 'deposit' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}`}>
                        <FaMoneyBillWave className="mr-3 h-6 w-6" /> Deposit
                      </button>
                      <button onClick={() => setView('transactions')} className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md ${view === 'transactions' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}`}>
                        <FaExchangeAlt className="mr-3 h-6 w-6" /> Transactions
                      </button>
                      <button onClick={() => setView('settings')} className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md ${view === 'settings' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}`}>
                        <FaCog className="mr-3 h-6 w-6" /> Settings
                      </button>
                      <button onClick={() => auth.signOut()} className="w-full flex items-center px-2 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-900 dark:hover:text-red-100 rounded-md">
                        <FaSignOutAlt className="mr-3 h-6 w-6" /> Sign Out
                      </button>
                    </nav>
                  </div>
                </div>
                <div className="flex-1 ml-4">
                  {renderView()}
                </div>
              </div>
            </div>
          </div>
        </main>
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg">
          <div className="flex justify-around">
            <button onClick={() => setView('home')} className="p-2 text-gray-600 dark:text-gray-300"><FaHome /></button>
            <button onClick={() => setView('wallet')} className="p-2 text-gray-600 dark:text-gray-300"><FaWallet /></button>
            <button onClick={() => setView('deposit')} className="p-2 text-gray-600 dark:text-gray-300"><FaMoneyBillWave /></button>
            <button onClick={() => setView('transactions')} className="p-2 text-gray-600 dark:text-gray-300"><FaExchangeAlt /></button>
            <button onClick={() => setView('settings')} className="p-2 text-gray-600 dark:text-gray-300"><FaCog /></button>
          </div>
        </nav>
        {showNotifications && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg max-w-md w-full max-h-96 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Notifications</h2>
              {notifications.map((notification) => (
                <div key={notification.id} className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                  <p className="dark:text-white">{notification.message}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(notification.timestamp.toDate()).toLocaleString()}</p>
                </div>
              ))}
              <button onClick={() => setShowNotifications(false)} className="mt-4 w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
