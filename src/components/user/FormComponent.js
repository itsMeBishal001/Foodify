import React from 'react';
import { Formik, Form } from 'formik';

const FormComponent = ({ initialValues, validationSchema, onSubmit, children }) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          {children}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
