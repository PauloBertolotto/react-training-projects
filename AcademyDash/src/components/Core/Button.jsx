import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";

const Button = ({ className, type, onClick, name, children }) => {
  return (
    <ShadcnButton
      className={className}
      type={type}
      onClick={onClick}
      name={name}
    >
      {children}
    </ShadcnButton>
  );
};

export default Button;
