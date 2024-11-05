"use client";

import React, { useState } from 'react';
import Footer from "./Footer"
import { Heart, Globe, Shield } from "lucide-react";
import Navbar from './Navbar';
import Button from "@/components/ui/Button"; // Adjust import path as necessary
import DonorPayVideo from "../../Video/DonorPay.mp4";
// import 'index.css';


const About = () => {
  const [darkMode, setDarkMode] = useState(false);


  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark", darkMode);
    document.bodyElement.classList.toggle("light-mode", !darkMode);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800">
       <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">About DonorPay</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Empowering Change Through Generosity
        </p>
      </header>
      <main className="max-w-5xl mx-auto w-full">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            At DonorPay, our mission is to connect generous donors with trusted
            causes around the world. We believe that every contribution can make
            a significant difference, and we strive to create a platform that
            empowers individuals to give back to their communities.
          </p>
        </section>
        <video
          autoPlay
          loop
          muted
          playsInline
          controls
          className="w-full h-64 object-cover rounded-lg"
        >
          <source src={DonorPayVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Our Values</h2>
          <div className="flex flex-wrap justify-center gap-8 mt-6">
            <div className="flex flex-col items-center max-w-xs text-center">
              <Heart className="w-12 h-12 text-primary-color" />
              <h3 className="mt-2 text-lg font-medium text-gray-800 dark:text-gray-200">Compassion</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                We believe in the power of kindness and empathy in making a difference.
              </p>
            </div>
            <div className="flex flex-col items-center max-w-xs text-center">
              <Globe className="w-12 h-12 text-primary-color" />
              <h3 className="mt-2 text-lg font-medium text-gray-800 dark:text-gray-200">Inclusivity</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Our platform welcomes everyone to join the cause and support those in need.
              </p>
            </div>
            <div className="flex flex-col items-center max-w-xs text-center">
              <Shield className="w-12 h-12 text-primary-color" />
              <h3 className="mt-2 text-lg font-medium text-gray-800 dark:text-gray-200">Transparency</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                We ensure that every donation is handled with integrity and accountability.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">Get Involved</h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Join us in our mission to make the world a better place. Whether
            you want to donate, volunteer, or spread the word, every action
            counts!
          </p>
          <Button size="lg" asChild>
            <a href="/register" className="mt-2  center text-white bg-primary-color hover:bg-blue-300 rounded-lg px-3 py-1.5">
              Join Us Today
            </a>
          </Button>
        </section>
      </main>
    </div>
  );
};

export default About;
