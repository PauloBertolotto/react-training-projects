import React from "react";

const AreaComponents = ({ children }) => {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a]  text-gray-100">
      {children}
    </div>
  );
};

export default AreaComponents;
