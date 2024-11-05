import React from 'react';
import { Outlet } from 'react-router-dom';
// import Navbar from './NavLinks/Navbar';
import Footer from './NavLinks/Footer';

const Layout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;