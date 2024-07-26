import React from "react";
import { FiMail, FiPhone, FiGithub, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  const handlePhoneClick = () => {
    window.location.href = "tel:+917586930061"; 
  };

  return (
    <footer className="bg-gray-900 text-white py-8 px-4 flex flex-col md:flex-row items-center justify-between font-sans">
      <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
        <div className="flex items-center mr-4">
          <FiMail className="mr-2" size={18} />
          <a href="mailto:dattabishal001@gmail.com" className="text-white hover:underline">
            dattabishal001@gmail.com
          </a>
        </div>
        <div className="flex items-center">
          <FiPhone className="mr-2" size={18} />
          <span className="text-white cursor-pointer hover:underline" onClick={handlePhoneClick}>
            Click to Call
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4 md:mt-0 text-center md:text-left">
        <h2 className="text-lg font-bold font-display">Bishal Datta</h2>
        <p className="text-sm font-sans">Software Developer based in India</p>
        <div className="flex items-center mt-2">
          <a href="https://github.com/itsmebishal001" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 mr-4">
            <FiGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/bishaldatta/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FiLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
