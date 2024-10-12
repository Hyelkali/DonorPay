"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UserPlus,
  Heart,
  DollarSign,
  Shield,
  Globe,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card"; // Combined import
import CardContent from "@/components/ui/Card"; // Combined import
import CardHeader from "@/components/ui/Card"; // Combined import
import InfoModal from "./InfoModal"; // Correct import
import Subscription from "./NavLinks/Subscription";
import Navbar from "./NavLinks/Navbar"; // Imported Navbar

const Home = () => {
  const [darkMode, setDarkMode] = useState(false); // Manage dark mode state here
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });
  const location = useLocation();

  const footerLinks = {
    About: [
      {
        title: "Our Mission",
        content:
          "DonorPay is dedicated to helping non-profit organizations streamline the process of receiving donations securely and efficiently. We believe in empowering donors and organizations by providing a seamless payment experience, making it easier for charitable causes to thrive.",
      },
    ],
    Help: [
      {
        title: "What is DonorPay?",
        content:
          "DonorPay is an online platform designed for non-profit organizations to easily receive and manage donations. It provides secure transactions and transparency for both organizations and donors.",
      },
      {
        title: "How do I donate using DonorPay?",
        content:
          "You can make donations by selecting a cause or organization, entering your payment details, and confirming the transaction. We support multiple payment methods, including credit cards, bank transfers, and digital wallets.",
      },
      {
        title: "Is DonorPay secure?",
        content:
          "Absolutely. We employ advanced encryption methods and secure gateways to ensure your payment details are protected at all times.",
      },
    ],
  };

  const handleOpenModal = (title, content) => {
    setModalContent({ title, content });
    setOpenModal(true);
  };
  useEffect(() => {
    console.log("Dark mode:", darkMode); // Debugging log
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
  
  const handleCloseModal = () => {
    setOpenModal(false);
};
  
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  }
  // Determine active route for Navbar
  const activeRoute = (route) => (location.pathname === route ? "active" : "");

  return (
     <div className={`firstDiv ${darkMode ? "dark" : ""}`}>
  <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />      
  <main className="mainCntr">
        <section className="mainSect relative">
          {/* Background Video */}
          <div className="video-background absolute inset-0 z-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover"
            >
              <source src="/path-to-your-video.mp4" type="video/mp4" />{" "}
              {/* Add your video here */}
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Overlay Content */}
          <div className="relative z-10 text-center text-white p-6 bg-black bg-opacity-50">
            <h2 className="empower text-3xl font-bold mb-4">
              Empower Change with Every Donation
            </h2>
            <p className="join text-lg">
              Join our global community of givers and make a difference today.
            </p>
          </div>

          {/* Image Carousel for Mobile */}
          <div className="carousel-container relative z-10 mt-6">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Children in need"
              className="w-full h-fit object-cover"
            />
          </div>
        </section>

        <section className="mainSect2">
          <h3 className="whyChos">Why Choose DonorPay?</h3>
          <div className="trstedGrid">
            {[
              {
                title: "Trusted Platform",
                icon: <Heart className="w-8 h-8 mb-4 text-blue-500" />,
              },
              {
                title: "Easy Transfers",
                icon: <DollarSign className="w-8 h-8 mb-4 text-green-500" />,
              },
              {
                title: "Secure Payments",
                icon: <Shield className="w-8 h-8 mb-4 text-red-500" />,
              },
            ].map((item, index) => (
              <Card key={index} className="cardSect2">
                <CardHeader>
                  <div className="cardHead1">
                    {item.icon}
                    <h4 className="cardHead2">{item.title}</h4>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="cardcntp1">
                    {item.title === "Trusted Platform"
                      ? "Join millions of donors who trust us to connect them with verified causes worldwide."
                      : item.title === "Easy Transfers"
                      ? "Send donations quickly and securely with just a few clicks."
                      : "Your financial information is protected with state-of-the-art encryption."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mainSect3">
          <h3 className="ourImpt">Our Impact</h3>
          <div className="sect3Div1">
            {[
              {
                value: "$50M+",
                label: "Donations Processed",
                icon: <DollarSign className="donationsPro" />,
              },
              {
                value: "1M+",
                label: "Active Users",
                icon: <UserPlus className="activeUr" />,
              },
              {
                value: "10K+",
                label: "Causes Supported",
                icon: <Heart className="causes" />,
              },
              {
                value: "100+",
                label: "Countries Reached",
                icon: <Globe className="countries" />,
              },
            ].map((item, index) => (
              <Card key={index} className="mapcard1">
                <CardContent className="cardcnt">
                  {item.icon}
                  <p className="cardcnt1">{item.value}</p>
                  <p className="cardcnt2">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mainSect4">
          <h3 className="ready">Ready to Make a Difference?</h3>
          <Button size="lg" asChild>
            <Link to="/register">Get Started</Link>
          </Button>
        </section>
      </main>

      <footer className="footer">
        <div className="footerDiv">
          <div className="ftDiv1">
            {Object.keys(footerLinks).map((section, index) => (
              <div key={index}>
                <h4 className="fth4">{section}</h4>
                <ul className="ftul">
                  {footerLinks[section].map((link, i) => (
                    <li key={i}>
                      <button
                        onClick={() =>
                          handleOpenModal(link.title, link.content)
                        }
                        className="ftlnk"
                      >
                        {link.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="lastDonor">
            <Subscription />
            <p>&copy; 2024 DonorPay. All rights reserved.</p>
          </div>
        </div>
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
