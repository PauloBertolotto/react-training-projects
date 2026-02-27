import React from "react";

const Td = ({ children }) => {
  return (
    <td
      className="
        p-3
        text-left
        whitespace-nowrap
        text-[var(--text-dark)]
        odd:bg-gray-50
        even:bg-gray-100
        hover:bg-gray-200
        transition-colors duration-300
        border-b border-gray-300
        cursor-pointer
      "
    >
      {children}
    </td>
  );
};

export default Td;
