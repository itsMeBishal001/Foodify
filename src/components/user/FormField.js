// FormField.js
import React from 'react';
import { Field, ErrorMessage } from 'formik';

const FormField = ({ label, name, type, as = 'input', options }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm mb-1">
        {label}
      </label>
      {as === 'select' ? (
        <Field as={as} name={name} className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:border-indigo-500">
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      ) : (
        <Field
          type={type}
          name={name}
          className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none focus:border-indigo-500"
        />
      )}
      <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
    </div>
  );
};

export default FormField;
