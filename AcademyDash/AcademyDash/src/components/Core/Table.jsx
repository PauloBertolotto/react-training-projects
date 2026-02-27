import React from "react";

const Table = ({ children }) => {
  return (
    <table
      className="
        w-full
        border border-gray-300
        rounded-lg
        shadow-md
        overflow-hidden
        bg-[var(--table-bg)]
        text-[var(--text-dark)]
        divide-y divide-gray-200
      "
    >
      {children}
    </table>
  );
};

export default Table;
