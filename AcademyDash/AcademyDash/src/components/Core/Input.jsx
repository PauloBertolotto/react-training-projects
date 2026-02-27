import React from "react";
import { Input as ShadcnInput } from "@/components/ui/input";

const Input = ({
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  readOnly,
  required,
  error,
  maxLength,
}) => {
  return (
    <div className="input-wrapper relative">
      <ShadcnInput
        className={`p-2 w-full rounded-md text-gray-900 placeholder:text-gray-400 bg-white
          border ${error ? "border-red-500" : "border-gray-300"} 
          focus:outline-none focus:ring-2 focus:ring-[var(--primary)]`}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        style={{
          paddingRight: error ? "3.5rem" : undefined,
        }}
      />
      {error && (
        <span
          id={`${id}-error`}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xs text-red-600 font-medium pointer-events-none whitespace-nowrap"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
