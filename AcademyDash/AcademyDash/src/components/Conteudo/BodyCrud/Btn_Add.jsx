import React from "react";
import { Button } from "@/components/ui/button";

const Btn_Add = ({ type, children }) => {
  return (
    <Button
      type={type}
      className="
        bg-[var(--primary)]
        text-[var(--text-light)] font-semibold
        px-6 py-3
        rounded-lg
        cursor-pointer
        m-4
        transition-colors duration-300 ease-out
        hover:bg-[var(--secondary)]
        focus:outline-none focus:ring-2 focus:ring-[var(--primary)]
        shadow-sm
      "
    >
      {children}
    </Button>
  );
};

export default Btn_Add;
