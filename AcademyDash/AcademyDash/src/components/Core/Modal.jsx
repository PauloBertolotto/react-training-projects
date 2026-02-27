import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-[var(--table-bg)] rounded-lg shadow-lg w-[450px] max-w-full p-6 max-h-[80vh] overflow-y-auto border border-gray-300">
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h2 className="text-lg font-bold text-[var(--secondary)]">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="text-[var(--text-dark)] hover:text-[var(--primary)] cursor-pointer"
          >
            ✖
          </button>
        </div>
        <div className="text-[var(--text-dark)]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
