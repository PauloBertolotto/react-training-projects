import React from "react";

const SubTitle = ({ children }) => {
  return (
    <h2
      className="text-[#000000]  
      
      p-6.10 
      text-center 
      text-[2em] 
      font-bold 
      tracking-[3px] 
      "
    >
      {children}
    </h2>
  );
};

export default SubTitle;
