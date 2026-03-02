import React from "react";

const DadosAchados = ({ children }) => {
  return (
    <div
      className="
        flex
        w-full
        min-w-[1000px]
        min-h-[300px]
        h-[380px]
        overflow-y-auto
        overflow-x-auto
        rounded-md
        bg-muted
        text-foreground
        text-lg
        scrollbar-thin
        scrollbar-thumb-primary
        scrollbar-track-muted
        hover:scrollbar-thumb-secondary
      "
    >
      {children}
    </div>
  );
};

export default DadosAchados;
