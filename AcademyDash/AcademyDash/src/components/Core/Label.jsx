import React from "react";
import { Label as ShadcnLabel } from "@/components/ui/label";

const Label = ({ htmlFor, children }) => {
  return (
    <ShadcnLabel
      className="block mb-1 text-sm font-semibold text-[var(--text-dark)]"
      htmlFor={htmlFor}
    >
      {children}
    </ShadcnLabel>
  );
};

export default Label;
