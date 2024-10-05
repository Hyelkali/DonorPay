"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Home as HomeIcon,
  Info,
  Mail,
  LogIn,
  UserPlus,
  Sun,
  Moon,
  Heart,
  DollarSign,
  Shield,
  Globe
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card"; // Combined import
import CardContent from "@/components/ui/Card"; // Combined import
import CardHeader from "@/components/ui/Card"; // Combined import
import InfoModal from "./InfoModal"; // Correct import
import Loader from "@/components/Loader"; // Import the Loader component
import { Swiper, SwiperSlide } from "swiper/react"; // Core Swiper and SwiperSlide components
import "swiper/swiper-bundle.css"; // Core Swiper styles
import "swiper/css/navigation"; // Optional navigation styles
import "swiper/css/pagination";
const Home = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBouncingComplete, setIsBouncingComplete] = useState(false); // Track if bouncing is complete
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });

  const footerLinks = {
    About: [{ title: "Our Mission", content: "About our mission." }],
    Help: [{ title: "FAQs", content: "Frequently asked questions." }]
    // Add more sections as needed
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 960);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // Simulate data fetching
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsBouncingComplete(true); // Set to true after loading
      await new Promise((resolve) => setTimeout(resolve, 600)); // Wait for the final bounce animation
      setIsLoading(false);
    };

    fetchData();

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const navItems = [
    { name: "Home", icon: <HomeIcon className="navlinks" />, href: "/" },
    { name: "About", icon: <Info className="navlinks" />, href: "/about" },
    { name: "Contact", icon: <Mail className="navlinks" />, href: "/contact" },
    { name: "Log In", icon: <LogIn className="navlinks" />, href: "/login" },
    {
      name: "Sign Up",
      icon: <UserPlus className="navlinks" />,
      href: "/register"
    }
  ];

  const handleOpenModal = (title, content) => {
    setModalContent({ title, content });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (isLoading) {
    return <Loader className={isBouncingComplete ? "bounce-complete" : ""} />;
  }

  return (
    <div className={`firstDiv ${darkMode ? "dark" : ""}`}>
      <header className="header flex justify-between items-center py-4 px-6">
        <div className="don">
          <h1 className="donorPay text-2xl font-bold">DonorPay</h1>
        </div>

        <div className="actions flex items-center gap-4">
          <button onClick={toggleDarkMode} className="toggleMode">
            {darkMode ? (
              <Moon className="toggleIcon" />
            ) : (
              <Sun className="toggleIcon" />
            )}
          </button>

          {isLargeScreen ? (
            <nav className="navbar flex gap-4 items-center">
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "contained"}
                  asChild
                >
                  <Link to={item.href} className="btnlinks flex items-center ">
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
                <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 z-20">
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item, index) => (
                      <Button key={index} variant="ghost" asChild>
                        <Link
                          to={item.href}
                          className="flex items-center gap-2"
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      </Button>
                    ))}
                    <button
                      onClick={toggleDarkMode}
                      className="flex items-center gap-2"
                    >
                      {darkMode ? (
                        <Moon className="toggleIcon" />
                      ) : (
                        <Sun className="toggleIcon" />
                      )}
                      <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
                    </button>
                  </nav>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
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
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              loop={true}
              pagination={{ clickable: true }} // Pagination for mobile navigation
            >
              {/* Each SwiperSlide represents a carousel item */}
              <SwiperSlide>
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Children in need"
                  className="w-full h-fit object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://plus.unsplash.com/premium_photo-1663099731021-0356791304f0?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Community support"
                  className="w-full h-fit object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://plus.unsplash.com/premium_photo-1664298513288-456716b3023f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Empowering the poor"
                  className="w-full h-fit object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://files.oaiusercontent.com/file-FaHltfFKD93hwQbxP5D5HD7B?se=2024-10-04T04%3A19%3A22Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D48005c15-17d8-41e1-8994-38b5745c8211.webp&sig=LahSVIP2Ph1c3IJgMzrK6AsDoh2JVH/3eqGWu0yCsSI%3D"
                  alt="Empowering the poor"
                  className="w-full h-fit object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://images.unsplash.com/photo-1541976844346-f18aeac57b06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEyfHxwb29yJTIwcGVvcGxlfGVufDB8fDB8fHww"
                  alt="Giving Hope"
                  className="w-full h-fit object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://images.unsplash.com/photo-1562548930-1a79a12becc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG92ZXJ0eSUyMGNoaWxkcmVufGVufDB8fDB8fHww"
                  alt="Children living in poverty"
                  className="w-full h-fit object-cover"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  src="https://images.unsplash.com/photo-1519222970733-f546218fa6d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fHBvb3IlMjBmYW1pbHklMjBjb25zdHJ1Y3Rpb258ZW58MHx8MHx8fHw%3D"
                  alt="Building shelters for the poor"
                  className="w-full h-fit object-cover"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  src="https://images.unsplash.com/photo-1543353071-873f17a7a088?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG92ZXJ0eXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Poor children in need"
                  className="w-full h-fit object-cover"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  src="https://images.unsplash.com/photo-1530058386473-62466a678330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHBvb3IlMjBjb21tdW5pdHl8ZW58MHx8MHx8fHw%3D"
                  alt="Empowering the underprivileged"
                  className="w-full h-fit object-cover"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hhcml0eSUyMHdvcmt8ZW58MHx8MHx8fA%3D%3D"
                  alt="Volunteering for community work"
                  className="w-full h-fit object-cover"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  src="https://images.unsplash.com/photo-1579425493788-3c9f2d049735?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2l2aW5nJTIwZm9vZCUyMHRvJTIwcG9vcnxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Giving food to the poor"
                  className="w-full h-fit object-cover"
                />
              </SwiperSlide>

              {/* Add more slides if needed */}
            </Swiper>
          </div>
        </section>

        <section className="mainSect2">
          <h3 className="whyChos">Why Choose DonorPay?</h3>
          <div className="trstedGrid">
            {[
              {
                title: "Trusted Platform",
                icon: <Heart className="w-8 h-8 mb-4 text-blue-500" />
              },
              {
                title: "Easy Transfers",
                icon: <DollarSign className="w-8 h-8 mb-4 text-green-500" />
              },
              {
                title: "Secure Payments",
                icon: <Shield className="w-8 h-8 mb-4 text-red-500" />
              }
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
                icon: <DollarSign className="donationsPro" />
              },
              {
                value: "1M+",
                label: "Active Users",
                icon: <UserPlus className="activeUr" />
              },
              {
                value: "10K+",
                label: "Causes Supported",
                icon: <Heart className="causes" />
              },
              {
                value: "100+",
                label: "Countries Reached",
                icon: <Globe className="countries" />
              }
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
