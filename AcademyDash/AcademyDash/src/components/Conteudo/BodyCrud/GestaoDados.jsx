import React from "react";

const GestaoDados = ({ children }) => {
  return (
    <div
      className="
        flex flex-col items-center justify-end
        p-2
        rounded-xl
        mt-35
        h-[435px]
      "
    >
      {children}
    </div>
  );
};

export default GestaoDados;
