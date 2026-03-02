import * as React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";

const Button = React.forwardRef(
  ({ className, type, onClick, name, children, ...props }, ref) => {
    return (
      <ShadcnButton
        ref={ref}
        className={className}
        type={type}
        onClick={onClick}
        name={name}
        {...props}
      >
        {children}
      </ShadcnButton>
    );
  },
);

Button.displayName = "Button";

export default Button;
