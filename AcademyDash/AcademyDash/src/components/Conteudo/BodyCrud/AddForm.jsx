import React from "react";

const AddForm = ({ onSubmit, children }) => {
  return (
    <form
      className="flex flex-col text-center gap-[15px] h-auto overflow-y-auto text-white"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default AddForm;
