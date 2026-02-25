import React from "react";
import { Button } from "@/components/ui/button";

const Btn_Add = ({ type, children }) => {
  return (
    <Button
      type={type}
      className="bg-[#4caf50] text-white px-[20px] py-[10px] rounded-[5px] cursor-pointer m-[10px_30px_0_30px] hover:bg-[#45a049]"
    >
      {children}
    </Button>
  );
};

export default Btn_Add;
