"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, DollarSign, Shield } from "lucide-react";
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
    document.body.classList.toggle("dark-mode", darkMode);
    document.body.classList.toggle("light-mode", !darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
    <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex flex-col items-center justify-center flex-1 p-6 space-y-12 text-center">
        <section className="relative w-full max-w-4xl bg-black bg-opacity-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-white mb-4">
            Empower Change with Every Donation
          </h2>
          <p className="text-lg text-white">Join our global community of givers today.</p>
        </section>

        <section className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-8 p-6">          
          <h3 className="text-2xl font-semibold mb-8">Why Choose DonorPay?</h3>
          <div className="grid gap-6 md:grid-cols-3 items-center justify-center gap-8 p-8 w-8xl icons" >
            {[
              { title: "Trusted Platform", icon: <Heart size={48} /> },
              { title: "Easy Transfers", icon: <DollarSign size={48}/> },
              { title: "Secure Payments", icon: <Shield size={48} /> },
            ].map((item, index) => (
              <Card key={index} className="p-6">
                <CardHeader className="flex items-center justify-center space-x-3 mb-4">
                  {item.icon}
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                </CardHeader>
                <CardContent className="text-center">
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

        <section className="text-center">
          <h3 className="text-2xl font-semibold mb-6">Ready to Make a Difference?</h3>
          <Button size="lg" className="hover:bg-cyan-400" asChild>
            <Link to="/register" >Get Started</Link>
          </Button>
        </section>
      </main>

      <footer className="w-full bg-gray-800 text-white p-6">
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          {Object.keys(footerLinks).map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-bold mb-5">{section}</h4>
              <ul>
                {footerLinks[section].map((link, i) => (
                  <li key={i}>
                    <button size="xl"
                      className="p-3 bg-blue-800  rounded-lg hover:underline hover:bg-cyan-500 mb-4"
                      onClick={() => handleOpenModal(link.title, link.content)}
                    >
                      {link.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Subscription />
        <p className="text-center mt-8">&copy; 2024 DonorPay. All rights reserved.</p>
      </footer>

      <InfoModal
        open={openModal}
        handleClose={handleCloseModal}
        title={modalContent.title}
        content={modalContent.content}
      />
    </div>
  );
};

export default Home;
