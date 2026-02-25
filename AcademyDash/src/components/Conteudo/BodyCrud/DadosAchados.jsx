import React from "react";

const DadosAchados = ({ children }) => {
  return (
    <div
      className="
        flex
        max-w-[1500px]
        h-[400px]
        overflow-y-auto
        rounded-md
        
      "
    >
      {children}
    </div>
  );
};

export default DadosAchados;
