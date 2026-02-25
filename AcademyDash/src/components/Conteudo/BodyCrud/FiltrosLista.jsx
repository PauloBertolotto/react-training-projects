import React from "react";

const Filtros = ({ children }) => {
  return (
    <div
      className="
        grid grid-cols-4
        gap-12 mb-2 p-2
        w-[900px]
        text-gray-50
        
      "
    >
      {children}
    </div>
  );
};

export default Filtros;
