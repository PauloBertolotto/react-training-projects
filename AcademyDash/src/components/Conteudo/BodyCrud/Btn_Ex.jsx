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
        className="text-red-500 hover:bg-[#da3c30] rounded-[8px] px-[5px] py-2"
      >
        <FiTrash2 size={20} />
      </Button>

      <Modal
        isOpen={open}
        onClose={(e) => handleClose(e)}
        title="Confirmar Exclusão"
      >
        <p className="mb-4">Tem certeza que deseja excluir este item?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Excluir
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Btn_Ex;
