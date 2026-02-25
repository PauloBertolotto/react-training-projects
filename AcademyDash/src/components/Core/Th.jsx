import React from "react";

const Th = ({ children }) => {
  return (
    <th
      className="
    sticky top-0
    bg-[#00ffff]
    text-black
    font-bold
    z-10
    p-2
    shadow-md
    uppercase tracking-wide
  "
    >
      {children}
    </th>
  );
};

export default Th;
