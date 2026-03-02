import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "../Core/Modal";

const Btn_ModalAdd = ({ label, title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="
          bg-[var(--primary)]
          text-[var(--text-light)] font-semibold
          px-6 py-3
          mt-25
          rounded-lg
          cursor-pointer
          transition-all duration-300 ease-out
          hover:bg-[var(--secondary)]
          focus:outline-none focus:ring-2 focus:ring-[var(--primary)]
          shadow-sm
        "
      >
        {label}
      </Button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title={title}>
        {React.cloneElement(children, {
          onVoltar: () => setOpen(false),
          onAdicionado: () => setOpen(false),
        })}
      </Modal>
    </>
  );
};

export default Btn_ModalAdd;
