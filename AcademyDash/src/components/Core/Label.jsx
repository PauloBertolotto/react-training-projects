import React from "react";
import { Label as ShadcnLabel } from "@/components/ui/label";

const Label = ({ htmlFor, children }) => {
  return (
    <ShadcnLabel className="font-bold w-auto" htmlFor={htmlFor}>
      {children}
    </ShadcnLabel>
  );
};

export default Label;
