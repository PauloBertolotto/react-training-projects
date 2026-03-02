import React from "react";

const Th = ({ children }) => {
  return (
    <th
      className="
        sticky top-0
        bg-[var(--secondary)]
        text-[var(--text-light)]
        font-semibold
        z-10
        p-3
        shadow-sm
        uppercase tracking-wider text-sm
        text-left
        border-b border-gray-300
      "
    >
      {children}
    </th>
  );
};

export default Th;
