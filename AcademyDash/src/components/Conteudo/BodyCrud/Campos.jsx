import React from "react";

const Campos = ({ children }) => {
  return (
    <div
      className="
        flex justify-between gap-1 mb-1
        p-1
        rounded-md   
      "
    >
      {children}
    </div>
  );
};

export default Campos;
