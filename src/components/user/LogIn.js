import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define validation schema with Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
  role: Yup.string().required('Required')
});

const LogIn = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <div className="text-2xl font-bold mb-4">Sign In</div>
        <div className="text-sm mb-4">Sign in to your account</div>
        <div className="flex justify-center mb-4 space-x-4">
          <button className="px-4 py-2 text-xs text-gray-500 border border-gray-300 rounded-md">
            Sign in with Google
          </button>
          <button className="px-4 py-2 text-xs text-gray-500 border border-gray-300 rounded-md">
            Sign in with Apple
          </button>
        </div>
        <Formik
          initialValues={{ email: '', password: '', role: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
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
              <div className="text-right text-sm text-blue-500 cursor-pointer">
                Forgot password?
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none"
              >
                Sign in
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center text-sm mt-4">
          <span>Don’t have an account? </span>
          <a href="/register" className="text-blue-500">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
