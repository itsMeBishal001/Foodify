import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../firebase';
import * as Yup from 'yup';
import GoogleSignInButton from './GoogleSignInButton';
import signInWithGoogle from './signInWithGoogle';
import FormComponent from './FormComponent';
import FormField from './FormField';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
  role: Yup.string().required('Required')
});

const LogIn = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in successfully", {
        position: "top-center",
      });
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Failed to log in. Please check your credentials.", {
        position: "bottom-center",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      toast.success("User signed in with Google successfully!", {
        position: "top-center",
      });
      navigate("/profile");
    } catch (error) {
      toast.error("Google Sign-In failed. Please try again.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center pt-20 min-h-screen bg-gray-200">
      <ToastContainer />
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <div className="text-2xl font-bold mb-4">Log In</div>
        <div className="text-sm mb-4">Sign in to your account</div>
        <GoogleSignInButton onClick={handleGoogleSignIn} />
        <FormComponent
          initialValues={{
            email: '',
            password: '',
            role: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <FormField
            label="Email address"
            name="email"
            type="email"
          />
          <FormField
            label="Password"
            name="password"
            type="password"
          />
          <FormField
            label="I am a..."
            name="role"
            as="select"
            options={[
              { value: '', label: 'Select your role' },
              { value: 'restaurantOwner', label: 'Restaurant Owner' },
              { value: 'user', label: 'User' },
              { value: 'deliveryBoy', label: 'Delivery Boy' }
            ]}
          />
        </FormComponent>
        <div className="text-center text-sm mt-4">
          <span>Don't have an account? </span>
          <a href="/register" className="text-blue-500">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
