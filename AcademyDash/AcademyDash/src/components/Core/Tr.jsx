import React from "react";

const Tr = ({ children }) => {
  return (
    <tr
      className="
        text-[var(--text-dark)]
        hover:bg-gray-200
        transition-all duration-200 ease-in-out
      "
    >
      {children}
    </tr>
  );
};

export default Tr;
