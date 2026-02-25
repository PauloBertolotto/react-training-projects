import React from "react";
import { Li as ShadcnLi } from "@/components/ui/list";

const Li = ({ children, className }) => {
  return <ShadcnLi className={className}>{children}</ShadcnLi>;
};

export default Li;
