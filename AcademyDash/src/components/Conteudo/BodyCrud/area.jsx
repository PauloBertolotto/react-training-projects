import React from "react";

const area = ({ children }) => {
  return (
    <div className=" flex flex-col p-4 rounded-xl bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a]    ">
      {children}
    </div>
  );
};

export default area;
