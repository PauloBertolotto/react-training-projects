import React from "react";
import { Button } from "@/components/ui/button";

const Btn_Alt = ({ type, children }) => {
  return (
    <Button
      type={type}
      className="bg-[#0081bd] text-white px-[20px] py-[10px] rounded-[5px] cursor-pointer m-[10px_30px_0_30px] hover:bg-[#0088c7]"
    >
      {children}
    </Button>
  );
};

export default Btn_Alt;
