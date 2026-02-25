import React from "react";

const Title = ({ children }) => {
  return (
    <h1
      className="
      text-[#00ffff] 
         bg-gradient-to-b from-black to-[#0a0a0a] 
         border-b-2 border-[#00ffff]/60 
         [text-shadow:0_0_12px_rgba(0,255,255,0.8)] 
         px-6 py-10 
         text-center 
         text-[3.5em] 
         font-extrabold 
         tracking-wide 
         rounded-lg 
         shadow-inner     
    "
    >
      {children}
    </h1>
  );
};

export default Title;
