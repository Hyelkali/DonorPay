import React, { useEffect, useState } from "react";
import "./Loader.css"; // Ensure this path is correct

const Loader = () => {
  const letters = "DonorPay".split("");
  const [isBouncingComplete, setIsBouncingComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBouncingComplete(true);
    }, 2000); // Time for the first letters to finish bouncing

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loader-wrapper">
      <div className="loader-container">
        {letters.map((letter, index) => (
          <span key={index} className={`loader-letter letter-${index}`}>
            {letter}
          </span>
        ))}
      </div>

      {isBouncingComplete && (
        <div className={`final-loader ${isBouncingComplete ? 'bounce-complete' : ''}`}>
          DONORPAY
        </div>
      )}
    </div>
  );
};

export default Loader;
