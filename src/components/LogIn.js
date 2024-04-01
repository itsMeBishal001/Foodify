import { useState } from "react";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex flex-grow pt-20 bg-gray-100 ">
      <div className="mx-auto">
        <div className="font-bold text-xl mb-4">Sign In</div>
        <div className="text-sm mb-4">Sign in to your account</div>
        <div className="flex justify-center mb-4">
          <div className="text-xs text-gray-500 px-4 py-2 mr-2">
            Sign in with Google
          </div>
          <div className="text-xs text-gray-500 px-4 py-2">
            Sign in with Apple
          </div>
        </div>
        <div className="mb-4 border-r-2 bg-white px-6 py-4">
          <div className="mb-2 text-sm">Email address</div>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="border rounded-md bg-gray-100 border-gray-400 px-2 py-1 mb-2"
          />
          <div className="mb-2 text-sm">Password</div>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="border rounded-md bg-gray-100 border-gray-400 px-2 py-1 mb-2"
          />
          <div className="text-sm text-blue-500 cursor-pointer">
            Forgot password?
          </div>
          <button className="rounded-md text-sm font-medium bg-black text-white px-20 py-2 mt-4">
            Sign in
          </button>
        </div>
        <div className="text-center flex justify-center">
          <div className="text-xs">Don’t have an account? </div>
          <p className="text-xs text-blue-400">Register here</p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
