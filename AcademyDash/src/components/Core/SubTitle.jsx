import React from "react";

const SubTitle = ({ children }) => {
  return (
    <h2
      className="text-[#00ffff]  
      [text-shadow:1px_1px_10px_#fff] 
      p-6.10 
      text-center 
      text-[2em] 
      font-bold 
      tracking-[3px] 
      underline"
    >
      {children}
    </h2>
  );
};

export default SubTitle;
