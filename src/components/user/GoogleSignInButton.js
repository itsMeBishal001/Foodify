import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const GoogleSignInButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-full py-2 mb-4 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
    >
      <FaGoogle size={20} className="mr-2" />
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
