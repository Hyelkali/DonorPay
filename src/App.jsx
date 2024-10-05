import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import ForgotPassword from './Components/ForgotPassword';
import About from './Components/NavLinks/About';
import Footer from './Components/NavLinks/Footer'
import InfoModal
 from './Components/InfoModal';
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
    path: "/infoModal",
    element: <InfoModal />,
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

// Export App as default
export default App;
