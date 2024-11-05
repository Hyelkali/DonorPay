"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from './Navbar'
import emailjs from "emailjs-com"; // Import EmailJS

const Contact = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    document.body.classList.toggle("light-mode", !darkMode);
  }, [darkMode]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_gijhqwn", // Replace with your EmailJS service ID
        "template_9exub1v", // Replace with your EmailJS template ID
        formData,
        "j5gTxmOKyrxCeCdyP" // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          console.log("Message sent successfully:", result.text);
          setFormSubmitted(true); // Display success message
        },
        (error) => {
          console.log("Failed to send message:", error.text);
        }
      );
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Get in Touch
        </h2>

        {formSubmitted ? (
          <div className="text-center text-green-500 font-bold">
            Thank you! Your message has been sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-800 dark:text-gray-200"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 mt-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-800 dark:text-gray-200"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 mt-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-800 dark:text-gray-200"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full p-2 mt-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 rounded-md transition-all duration-300"
            >
              Send a Message
            </button>
          </form>
        )}

        <div className="flex items-center gap-4 mt-6">
          <Mail className="w-6 h-6 text-blue-500" />
          <a
            href="mailto:hyelnamuninathan@gmail.com"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 transition-colors duration-300"
          >
            hyelnamuninathan@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <Phone className="w-6 h-6 text-green-500" />
          <span className="text-gray-800 dark:text-gray-200">+234 903 010 7976</span>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <MapPin className="w-6 h-6 text-red-500" />
          <span className="text-gray-800 dark:text-gray-200">123 DonorPay-Payment, Abuja, Nigeria</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
