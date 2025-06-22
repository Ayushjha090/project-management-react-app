import { type ReactNode, useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

import { MdOutlineClose } from "react-icons/md";

import type { ModalRef } from "../../types/modal";

interface ModalProps {
  title: string;
  children: ReactNode;
}

const Modal = forwardRef<ModalRef, ModalProps>(({ title, children }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleCloseModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
    },
    close: handleCloseModal,
  }));

  return (
    <>
      {createPortal(
        <dialog
          ref={dialogRef}
          className="w-2xl md:w-1/2 p-5 rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800"
        >
          <div className="flex items-center justify-between pt-2 pb-5 border-b border-gray-200">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {title}
            </h2>
            <button
              onClick={handleCloseModal}
              className="p-2 rounded-xl hover:bg-gray-100/80 transition-colors duration-300"
            >
              <MdOutlineClose className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="p-2 overflow-y-auto max-h-[calc(90vh-120px)]">
            {children}
          </div>
        </dialog>,
        document.getElementById("modal")!
      )}
    </>
  );
});

export default Modal;
