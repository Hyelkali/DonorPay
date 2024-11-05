"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, DollarSign, Shield } from "lucide-react";
import Button from "@/components/ui/Button";
import Card, { CardContent, CardHeader } from "@/components/ui/Card";
import InfoModal from "./InfoModal";
import Subscription from "./NavLinks/Subscription";
import Navbar from "./NavLinks/Navbar";
import HeroSection from "./Herosection";

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
          "DonorPay helps non-profit organizations streamline donations securely and efficiently, empowering charitable causes to thrive."
      }
    ],
    Help: [
      {
        title: "DonorPay",
        content:
          "DonorPay is an online platform that allows non-profits to receive and manage donations securely with transparency for both donors and organizations."
      },
      {
        title: "How to donate",
        content:
          "You can donate by selecting a cause, entering payment details, and confirming the transaction. We support various payment methods, including cards and digital wallets."
      },
      {
        title: "Security",
        content:
          "Yes. We use advanced encryption and secure gateways to protect your financial information."
      }
    ]
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
           <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Happy children"
              className="w-full h-full object-cover brightness-50"
            />
          </div>
          <div className="relative text-center text-white space-y-4 p-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Empower Change with Every Donation
            </h1>
            <p className="text-xl md:text-2xl">
              Join our global community of givers today.
            </p>
            <Button size="lg" className="mt-4">
            <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </section>
       

        <section className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-8 p-6 text-black">
          <h3 className="text-2xl font-semibold mb-8">Why DonorPay?</h3>
          <HeroSection />
          <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: 'Trusted Platform', icon: <Heart size={48} />, description: 'Join millions of donors trusting us to connect them with verified causes.' },
          { title: 'Easy Transfers', icon: <DollarSign size={48} />, description: 'Send donations easily with just a few clicks.' },
          { title: 'Secure Payments', icon: <Shield size={48} />, description: 'Your payment details are fully secured with bank-level encryption.' }
        ].map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-col items-center space-y-3">
              <div className="p-2 bg-primary-foreground rounded-full">
                {item.icon}
              </div>
              <h4 className="text-lg font-semibold">{item.title}</h4>
            </CardHeader>
            <CardContent className="text-center">
              <p>{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
        </section>

        <section className="text-center">
          <h3 className="text-2xl font-semibold mb-6">
            Ready to Make a Difference?
          </h3>
          <Button size="lg" className="hover:bg-cyan-400" asChild>
            <Link to="/login">Get Started</Link>
          </Button>
        </section>
        <section className="my-12 container mx-auto">
      <h3 className="text-2xl font-semibold mb-8 text-center">Featured Causes</h3>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: 'Education for All', image: 'https://plus.unsplash.com/premium_photo-1663088981242-cfae415c5f97?q=80&w=1553&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=200&width=300', goal: 50000, raised: 35000 },
          { title: 'Clean Water Initiative', image: 'https://plus.unsplash.com/premium_photo-1678837556048-8809e355241b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=200&width=300', goal: 75000, raised: 60000 },
          { title: 'Hunger Relief Program', image: 'https://plus.unsplash.com/premium_photo-1679911009679-cac8028ef89d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=200&width=300', goal: 100000, raised: 80000 }
        ].map((cause, index) => (
          <Card key={index}>
            <img src={cause.image} alt={cause.title} className="w-full h-48 object-cover" />
            <CardHeader>
              <h4 className="text-lg font-semibold">{cause.title}</h4>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="h-2 bg-primary rounded-full"
                    style={{ width: `${(cause.raised / cause.goal) * 100}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ${cause.raised.toLocaleString()} raised of ${cause.goal.toLocaleString()} goal
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
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
                    <button
                      size="xl"
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
        <p className="text-center mt-8">
          &copy; 2024 DonorPay. All rights reserved.
        </p>
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