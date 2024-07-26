import React from "react";
import { FiMail, FiPhone } from "react-icons/fi";

const Contact = () => {
  const phoneNumber = "+918159089218";

  const handlePhoneClick = () => {
    window.location.href = "tel:" + phoneNumber;
  };

  return (
    <div className="flex flex-col items-center justify-center h-[82.8vh] font-sans">
      <h1 className="text-3xl font-bold mb-4 font-display">Contact Us</h1>
      <div className="flex items-center mb-4">
        <FiMail className="mr-2" size={24} />
        <a href="mailto:dattabishal001@gmail.com" className="text-blue-500">
          dattabishal001@gmail.com
        </a>
      </div>
      <div className="flex items-center">
        <FiPhone className="mr-2" size={24} />
        <span
          className="text-blue-500 cursor-pointer"
          onClick={handlePhoneClick}
        >
          Click to call
        </span>
      </div>
    </div>
  );
};

export default Contact;
