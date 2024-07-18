import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; 

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

  return (
    <div className="flex items-center justify-center pt-20 min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <div className="text-2xl font-bold mb-4">Register</div>
        <div className="text-sm mb-4">Create a new account</div>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setTimeout(() => {
              setSubmitting(false); 
              navigate('/login'); 
            }, 500); 
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
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
