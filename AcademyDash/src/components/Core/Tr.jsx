import React from "react";

const Tr = ({ children }) => {
  return (
    <tr
      className="
    bg-[#1a1a1a]
    text-gray-100
    hover:bg-[#2a2a2a]
    transition-colors duration-200
  "
    >
      {children}
    </tr>
  );
};

export default Tr;
