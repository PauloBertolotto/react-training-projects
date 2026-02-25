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
    <div className="input-wrapper" style={{ position: "relative" }}>
      <ShadcnInput
        className={` text-white p-2 w-[240px] ${
          error ? "border-red-500" : "border-gray-600"
        }`}
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
          className="error-inside"
          style={{
            position: "absolute",
            top: "50%",
            right: "0.5rem",
            transform: "translateY(-50%)",
            fontSize: "0.8rem",
            color: "red",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            background: "transparent",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
