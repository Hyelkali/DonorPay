"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {

  Heart,
  DollarSign,
  Shield,

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

  
  useEffect(() => {
    console.log("Dark mode:", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
    document.body.classList.toggle("light-mode", !darkMode);
  }, [darkMode]);

 
  return (
    <div className={`firstDiv ${darkMode ? "dark" : ""}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <header className="">
       
      </header>

      <main className="mainCntr justify-center">
        <section className="mainSect relative">
          
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
