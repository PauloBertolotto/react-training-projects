import React from "react";

const area = ({ children }) => {
  return (
    <div className=" flex flex-col p-4 rounded-xl bg-transparent  text-neutral-50  ">
      {children}
    </div>
  );
};

export default area;
