import { Field, ErrorMessage } from 'formik';
import React from 'react';

interface TextInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  touched?: boolean;
  error?: string;
  className?: string;
  placeholder?: string;
  prependIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const TextInput = ({ 
  id, 
  name, 
  label, 
  type = 'text',
  touched,
  error,
  className = '',
  placeholder = '',
  prependIcon: PrependIcon
}: TextInputProps) => {
  return (
    <div className="justify-items-start">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative w-full">
        {PrependIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <PrependIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <Field
          id={id}
          name={name}
          type={type}
          className={`mt-1 block w-full border p-2 rounded ${
            touched && error ? 'border-red-500' : 'border-gray-300'
          } ${PrependIcon ? 'pl-10' : ''} ${className}`}
          placeholder={placeholder}
        />
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export { TextInput };
