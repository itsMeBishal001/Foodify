import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  const handlePhoneClick = () => {
    window.location.href = "tel:" + phoneNumber;
  };
  return (
    <div className="flex flex-col">
      <div className="flex-grow"></div>
      <div className="bg-gray-800 text-white py-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          <div className="flex flex-col md:flex-row items-center">
            <h5 className="text-sm text-center md:text-left mb-2 md:mb-0">
              Contact Us:
            </h5>
            <div className="flex items-center ml-4">
              <FiMail className="mr-2" size={18} />
              <a href="mailto:dattabishal001@gmail.com" className="text-white">
                dattabishal001@gmail.com
              </a>
            </div>
            <div className="flex items-center ml-4">
              <FiPhone className="mr-2" size={18} />
              <span
                className="text-white cursor-pointer"
                onClick={handlePhoneClick}
              >
                Click to call
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <h2 className="text-lg text-center md:text-left font-bold">
              Bishal Datta
            </h2>
            <p className="text-sm text-center md:text-left">
              A Web Developer based in India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
