import React from "react";

const AreaComponents = ({ children }) => {
  return (
    <div className="p-4 rounded-xl bg-transparent  text-neutral-50">
      {children}
    </div>
  );
};

export default AreaComponents;
