import React from "react";

const Td = ({ children }) => {
  return (
    <td
      className="
    border border-gray-700
    p-2
    text-center
    cursor-pointer
    whitespace-nowrap
    text-gray-100
    odd:bg-[#2a2a2a]
    even:bg-[#1f1f1f]
    hover:bg-[#3a3a3a]
    transition-colors duration-200
  "
    >
      {children}
    </td>
  );
};

export default Td;
