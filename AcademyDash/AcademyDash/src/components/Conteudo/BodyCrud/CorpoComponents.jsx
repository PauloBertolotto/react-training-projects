import React from "react";

const CorpoComponents = ({ children }) => {
  return (
    <div
      className="
        flex justify-between
        h-[700px]
        mt-2 p-4
        rounded-xl
        gap-1
      "
    >
      {children}
    </div>
  );
};

export default CorpoComponents;
