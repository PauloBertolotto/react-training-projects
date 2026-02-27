import React from "react";

const Filtros = ({ children }) => {
  return (
    <div
      className="
        grid grid-cols-4   /* três colunas iguais */
        gap-4 mb-4 p-4
        w-full max-w-[1000px]  /* ocupa toda largura até 1000px */
        bg-[var(--table-bg)]
        text-[var(--text-dark)]
        font-semibold
        rounded-md
        border border-gray-300
        shadow-sm
      "
    >
      {children}
    </div>
  );
};

export default Filtros;
