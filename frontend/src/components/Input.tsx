import React, { ChangeEvent } from 'react';

// Definição da interface para as props do componente Input.
interface InputProps {
  type: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

// Componente funcional Input.
const Input: React.FC<InputProps> = ({
  type,
  value,
  placeholder,
  required = false,
  className = '',
  onChange,
}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      required={required}
      className={`border rounded py-2 px-4 text-textod hover:border-green-500 focus:outline-none focus:border-green-500 text-sm ${className}`}
      onChange={onChange}
    />
  );
};

export default Input;
