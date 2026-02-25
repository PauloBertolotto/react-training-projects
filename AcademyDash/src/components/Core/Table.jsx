import React from "react";

const Table = ({ children }) => {
  return (
    <table
      className="
    w-[1220px]
    border border-gray-700
    rounded-lg
    shadow-md
    overflow-hidden
    bg-gradient-to-b from-[#1a1a1a] to-[#222]
    text-gray-100
   
  "
    >
      {children}
    </table>
  );
};

export default Table;
