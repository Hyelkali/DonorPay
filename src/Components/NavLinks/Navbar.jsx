"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Home as HomeIcon, Info, Mail, LogIn, UserPlus, Sun, Moon } from "lucide-react";
import Button from "@/components/ui/Button";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", icon: <HomeIcon className="navlinks" />, href: "/" },
    { name: "About", icon: <Info className="navlinks" />, href: "/about" },
    { name: "Contact", icon: <Mail className="navlinks" />, href: "/contact" },
    { name: "Member Login", icon: <LogIn className="navlinks" />, href: "/login" },
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 960);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const isActive = (href) => location.pathname === href;

  return (
    <header className="header flex justify-between items-center w-full bg-gray-100 dark:bg-gray-900 p-4">
      <div className="don">
        <h1 className="donorPay text-2xl font-bold">DonorPay</h1>
      </div>

      <div className="actions flex items-center gap-4">
        <button onClick={toggleDarkMode} className="toggleMode">
          {darkMode ? <Moon className="toggleIcon Switch to Light Mode" /> : <Sun className="toggleIcon Switch to Dark Mode" />}
        </button>

        {isLargeScreen ? (
          <nav className="navbar flex gap-4 items-center w-full justify-center">
            {navItems.map((item, index) => (
              <Button key={index} variant={isActive(item.href) ? "default" : "contained"} asChild>
                <Link
                  to={item.href}
                  className={`btnlinks flex items-center px-4 py-2 rounded-md ${
                    isActive(item.href)
                      ? "bg-blue-500 text-white"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>
        ) : (
          <div className="flex items-center relative">
            <button onClick={toggleMenu} className="relative z-10">
              <Menu className="w-6 h-6" />
            </button>

            {isMenuOpen && (
              <div className="absolute top-12 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 z-20">
                <nav className="flex flex-col gap-4">
                  {navItems.map((item, index) => (
                    <Button key={index} variant="ghost" asChild>
                      <Link
                        to={item.href}
                        className={`flex items-center gap-2 px-2 py-2 rounded-md ${
                          isActive(item.href)
                            ? "bg-blue-500 text-white"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    </Button>
                  ))}
                  <button onClick={toggleDarkMode} className="flex items-center gap-2">
                    {darkMode ? <Moon className="toggleIcon" /> : <Sun className="toggleIcon" />}
                    <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
                  </button>
                </nav>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
