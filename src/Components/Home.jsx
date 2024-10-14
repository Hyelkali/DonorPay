"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UserPlus,
  Heart,
  DollarSign,
  Shield,
  Globe,
  Sun,
  Moon,
  Menu,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card, { CardContent, CardHeader } from "@/components/ui/Card";
import InfoModal from "./InfoModal";
import Subscription from "./NavLinks/Subscription";
import Navbar from "./NavLinks/Navbar";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });
  const location = useLocation();

  const footerLinks = {
    About: [
      {
        title: "Our Mission",
        content:
          "DonorPay helps non-profit organizations streamline donations securely and efficiently, empowering charitable causes to thrive.",
      },
    ],
    Help: [
      {
        title: "What is DonorPay?",
        content:
          "DonorPay is an online platform that allows non-profits to receive and manage donations securely with transparency for both donors and organizations.",
      },
      {
        title: "How do I donate using DonorPay?",
        content:
          "You can donate by selecting a cause, entering payment details, and confirming the transaction. We support various payment methods, including cards and digital wallets.",
      },
      {
        title: "Is DonorPay secure?",
        content:
          "Yes. We use advanced encryption and secure gateways to protect your financial information.",
      },
    ],
  };

  const handleOpenModal = (title, content) => {
    setModalContent({ title, content });
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const activeRoute = (route) => (location.pathname === route ? "active" : "");

  useEffect(() => {
    console.log("Dark mode:", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
    document.body.classList.toggle("light-mode", !darkMode);
  }, [darkMode]);

  const navItems = [
    { name: "Home", href: "/", icon: <Heart /> },
    { name: "About", href: "/about", icon: <Globe /> },
    { name: "Donate", href: "/donate", icon: <DollarSign /> },
  ];

  const isLargeScreen = window.innerWidth >= 768;

  return (
    <div className={`firstDiv ${darkMode ? "dark" : ""}`}>
      <header className="header flex justify-between items-center py-4 px-6">
        <h1 className="donorPay text-2xl font-bold">DonorPay</h1>
        <div className="actions flex items-center gap-4">
          <button onClick={toggleDarkMode} className="toggleMode">
            {darkMode ? <Moon className="toggleIcon" /> : <Sun className="toggleIcon" />}
          </button>

          {isLargeScreen ? (
            <nav className="navbar flex gap-4 items-center">
              {navItems.map((item, index) => (
                <Button key={index} asChild variant={index === 0 ? "default" : "contained"}>
                  <Link to={item.href} className={`btnlinks ${activeRoute(item.href)}`}>
                    {item.icon}
                    {item.name}
                  </Link>
                </Button>
              ))}
            </nav>
          ) : (
            <div className="relative">
              <button onClick={toggleMenu} className="relative z-10">
                <Menu className="w-6 h-6" />
              </button>
              {isMenuOpen && (
                <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 z-20">
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item, index) => (
                      <Button key={index} asChild variant="ghost">
                        <Link to={item.href} className="flex items-center gap-2">
                          {item.icon}
                          {item.name}
                        </Link>
                      </Button>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="mainCntr">
        <section className="mainSect relative">
          <div className="video-background absolute inset-0 z-0 overflow-hidden">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src="/path-to-your-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="relative z-10 text-center text-white p-6 bg-black bg-opacity-50">
            <h2 className="text-3xl font-bold mb-4">Empower Change with Every Donation</h2>
            <p className="text-lg">Join our global community of givers today.</p>
          </div>
        </section>

        <section className="mainSect2">
          <h3>Why Choose DonorPay?</h3>
          <div className="trstedGrid">
            {[
              { title: "Trusted Platform", icon: <Heart /> },
              { title: "Easy Transfers", icon: <DollarSign /> },
              { title: "Secure Payments", icon: <Shield /> },
            ].map((item, index) => (
              <Card key={index} className="cardSect2">
                <CardHeader className="flex items-center">
                  {item.icon}
                  <h4>{item.title}</h4>
                </CardHeader>
                <CardContent>
                  <p>
                    {item.title === "Trusted Platform"
                      ? "Join millions of donors trusting us to connect them with verified causes."
                      : item.title === "Easy Transfers"
                      ? "Send donations easily with just a few clicks."
                      : "Your payment details are fully secured."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mainSect4">
          <h3>Ready to Make a Difference?</h3>
          <Button size="lg" asChild>
            <Link to="/register">Get Started</Link>
          </Button>
        </section>
      </main>

      <footer className="footer">
        <div className="footerDiv">
          {Object.keys(footerLinks).map((section, index) => (
            <div key={index}>
              <h4>{section}</h4>
              <ul>
                {footerLinks[section].map((link, i) => (
                  <li key={i}>
                    <button onClick={() => handleOpenModal(link.title, link.content)}>
                      {link.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Subscription />
          <p>&copy; 2024 DonorPay. All rights reserved.</p>
        </div>
      </footer>

      <InfoModal open={openModal} handleClose={handleCloseModal} title={modalContent.title} content={modalContent.content} />
    </div>
  );
};

export default Home;
