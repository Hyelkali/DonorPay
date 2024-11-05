import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [email, setEmail] = useState('');

  // Define sections and links with unique titles
  const sections = [
    {
      title: "About DonorPay",
      links: [
        { title: "Our Story", content: "DonorPay was founded in 2020 with a mission to make charitable giving easier and more transparent..." },
        { title: "How It Works", content: "DonorPay connects donors directly with verified charities. Simply choose a cause, make a donation, and track your impact..." },
        { title: "Testimonials", content: "\"DonorPay has revolutionized how I give to charities. It's so easy and transparent!\" - Jane D., Loyal Donor" }
      ]
    },
    {
      title: "Get Involved",
      links: [
        { title: "Donate Now", content: "Ready to make a difference? Choose from our curated list of causes and donate with just a few clicks." },
        { title: "Volunteer", content: "We're always looking for passionate volunteers to help with various projects. Sign up today!" },
        { title: "Partner With Us", content: "Are you a charity looking to expand your reach? Learn about our partnership opportunities." }
      ]
    },
    {
      title: "Resources",
      links: [
        { title: "FAQ", content: "Find answers to commonly asked questions about donations, tax receipts, and more." },
        { title: "Blog", content: "Stay updated with the latest news in philanthropy and learn about the impact of your donations." },
        { title: "Contact Us", content: "Need help? Our support team is available 24/7 to assist you with any questions or concerns." }
      ]
    }
  ];

  const handleOpenModal = (title, content) => {
    setModalContent({ title, content });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Implement subscription logic here
    console.log(`Subscribed with email: ${email}`);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-sections">
          {sections.map((section, index) => (
            <div key={index} className="footer-section">
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <button onClick={() => handleOpenModal(link.title, link.content)}>
                      {link.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-subscription">
          <h4>Stay Connected</h4>
          <p>Subscribe to our newsletter for updates on how your donations are making a difference.</p>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 DonorPay. All rights reserved.</p>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      {openModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{modalContent.title}</h2>
            <p>{modalContent.content}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;