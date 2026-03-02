import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Modal from "../../Core/Modal";

const Btn_Ex = ({ type = "button", onConfirm, disabled }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleConfirm = (e) => {
    e.stopPropagation();
    if (typeof onConfirm === "function") {
      onConfirm();
    }
    setOpen(false);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <>
      <Button
        type={type}
        onClick={handleClick}
        disabled={disabled}
        variant="ghost"
        className="
          text-red-600
          hover:bg-red-100
          rounded-md
          px-2 py-2
          transition-colors
        "
      >
        <FiTrash2 size={20} />
      </Button>

      <Modal
        isOpen={open}
        onClose={(e) => handleClose(e)}
        title="Confirmar Exclusão"
      >
        <p className="mb-4 text-[var(--text-dark)]">
          Tem certeza que deseja excluir este item?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="
              px-4 py-2 rounded-md
              bg-[var(--table-bg)]
              text-[var(--text-dark)]
              border border-gray-300
              hover:bg-gray-100
              transition-colors
            "
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="
              px-4 py-2 rounded-md
              bg-red-600 text-white
              hover:bg-red-700
              transition-colors
              cursor-pointer
            "
          >
            Excluir
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Btn_Ex;
