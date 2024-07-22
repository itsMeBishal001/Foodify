import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import * as Yup from 'yup';
import GoogleSignInButton from './GoogleSignInButton';
import signInWithGoogle from './signInWithGoogle';
import FormComponent from './FormComponent';
import { ErrorMessage, Field } from 'formik';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  role: Yup.string().required('Required')
});

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (values, setSubmitting) => {
    const { email, password, firstName, lastName, role } = values;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: firstName,
          lastName: lastName,
          role: role,
          photo: ""
        });
      }
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
        <div className="text-2xl font-bold mb-4">Register</div>
        <div className="text-sm mb-4">Create a new account</div>
        <GoogleSignInButton onClick={handleGoogleSignIn} />
        <FormComponent
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <div>
            <label htmlFor="firstName" className="block text-sm mb-1">
              First Name
            </label>
            <Field
              type="text"
              name="firstName"
              className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:border-indigo-500"
            />
            <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm mb-1">
              Last Name
            </label>
            <Field
              type="text"
              name="lastName"
              className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:border-indigo-500"
            />
            <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
          </div>
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
            <label htmlFor="confirmPassword" className="block text-sm mb-1">
              Confirm Password
            </label>
            <Field
              type="password"
              name="confirmPassword"
              className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:border-indigo-500"
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
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
          <span>Already have an account? </span>
          <a href="/login" className="text-blue-500">
            Sign in here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
