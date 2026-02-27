import React from "react";

const Title = ({ children }) => {
  return (
    <h1
      className="
        text-[var(--text-light)]       
        bg-transparent
        px-6 py-8
        text-center
        text-[2.5em]
        font-extrabold
        tracking-wide
        rounded-lg
        underline
           
        decoration-2
        underline-offset-4
      "
    >
      {children}
    </h1>
  );
};

export default Title;
