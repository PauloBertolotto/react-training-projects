import React from "react";
import { Button } from "@/components/ui/button";

const Btn_Alt = ({ type, children }) => {
  return (
    <Button
      type={type}
      className="
        bg-[var(--secondary)]
        text-[var(--text-light)] font-semibold
        px-5 py-2 rounded-md
        cursor-pointer m-[10px_30px_0_30px]
        transition-colors duration-300 ease-out
        hover:bg-[var(--primary)]
        focus:outline-none focus:ring-2 focus:ring-[var(--primary)]
        shadow-sm
      "
    >
      {children}
    </Button>
  );
};

export default Btn_Alt;
