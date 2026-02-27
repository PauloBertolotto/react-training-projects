import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CustomNavLink = ({ to, children, icon: Icon }) => {
  return (
    <RouterNavLink to={to} end>
      {({ isActive }) => (
        <Button
          variant="ghost"
          className={`w-full justify-start gap-2 px-3 py-2 rounded-md transition-colors ${
            isActive
              ? "bg-primary text-white font-bold border-l-4 border-primary"
              : "text-neutral-100 hover:bg-muted hover:text-neutral-200"
          }`}
        >
          {Icon && (
            <Icon
              className={`text-lg ${
                isActive ? "text-white" : "text-neutral-300"
              }`}
            />
          )}
          {children}
        </Button>
      )}
    </RouterNavLink>
  );
};

export default CustomNavLink;
