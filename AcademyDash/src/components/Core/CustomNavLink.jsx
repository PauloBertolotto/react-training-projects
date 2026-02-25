import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

const CustomNavLink = ({ to, children }) => {
  return (
    <RouterNavLink
      id="Navigation"
      to={to}
      className={({ isActive }) =>
        `
          min-w-[180px]
          bg-[#1f1f1f]
          text-white
          rounded-xl
          px-6 py-4
          text-left
          font-semibold
          whitespace-nowrap
          transition-all duration-300 ease-in-out
          shadow-[0_2px_6px_rgba(0,0,0,0.3)]
          flex items-center gap-2
          hover:[background-image:linear-gradient(135deg,#2e2e2e,#3a3a3a)]
          hover:-translate-y-0.5 hover:scale-[1.02]
          hover:text-[#00ffff]
          focus:outline-none focus:ring-2 focus:ring-[#00ffff]
          ${isActive ? "text-[#00ffff] border border-[#00ffff] font-bold shadow-[0_0_10px_rgba(0,255,255,0.6)]" : ""}
        `
      }
    >
      {children}
    </RouterNavLink>
  );
};

export default CustomNavLink;
