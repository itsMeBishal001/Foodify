import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../firebase';
import * as Yup from 'yup';
import GoogleSignInButton from './GoogleSignInButton';
import signInWithGoogle from './signInWithGoogle';
import FormComponent from './FormComponent';
import { ErrorMessage, Field } from 'formik';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
  role: Yup.string().required('Required')
});

const LogIn = () => {

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      window.location.href = "/profile";
      toast.success("User logged in successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      toast.success("User Signed in with Google Successfully!!", {
        position: "top-center",
      });
      window.location.href = "/profile";
    } catch (error) {
      toast.error(error.message, {
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
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email address
            </label>
            <Field
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:border-indigo-500"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <Field
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:border-indigo-500"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm mb-1">
              I am a...
            </label>
            <Field as="select" name="role" className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:border-indigo-500">
              <option value="">Select your role</option>
              <option value="restaurantOwner">Restaurant Owner</option>
              <option value="user">User</option>
              <option value="deliveryBoy">Delivery Boy</option>
            </Field>
            <ErrorMessage name="role" component="div" className="text-red-500 text-xs mt-1" />
          </div>
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
