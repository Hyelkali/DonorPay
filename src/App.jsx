import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import ForgotPassword from './Components/ForgotPassword';
import About from './Components/NavLinks/About';
import Footer from './Components/NavLinks/Footer'
import InfoModal from './Components/InfoModal';
import Verify from './Components/Verify';
import Navbar from './Components/NavLinks/Navbar'
import Popup from './Components/Popup';
import Subscription from './Components/NavLinks/Subscription'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  }, 
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/footer",
    element: <Footer />,
  },
  {
    path: "/Popup",
    element: <Popup />
  },
  {
    path: "/infoModal",
    element: <InfoModal />,
  },
  {
    path: "/Navbar",
    element: <Navbar />,
  },
  {
    path: "/Subscription",
    element: <Subscription />,
  },
  {
    path: "/Verify",
    element: <Verify />
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

// Export App as default
export default App;
