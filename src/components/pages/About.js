import React from "react";
import { FiBookOpen } from "react-icons/fi";

const About = () => {
  return (
    <div className="h-[82.8vh] flex flex-col justify-center items-center pt-20 font-sans">
      <div className="text-center">
        <FiBookOpen className="text-6xl text-blue-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4 font-display">Welcome to Our Journey</h1>
        <p className="text-lg text-gray-700 font-sans">
          We're on a mission of constant learning and growth, building this app
          with love and dedication.
        </p>
        <p className="text-lg text-gray-700 font-sans">
          Join us as we explore the exciting world of React and development!
        </p>
      </div>
    </div>
  );
};

export default About;
