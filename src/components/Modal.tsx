
import React, { Dispatch, useState } from "react";
import CheckSvg from "/public/images/green.png"
import CrossSvg  from "/public/logos/cross.svg"
import Image from "next/image";
interface ModalProps {
  setStep: Dispatch<React.SetStateAction<number>>;
}
export const Modal: React.FC<ModalProps> = ({ setStep }) => {

  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-8 rounded-2xl w-[90%] max-w-[31.5rem] shadow-lg flex flex-col items-center gap-3 ">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#E5E5E5] flex justify-center items-center text-gray-500 hover:text-black"
        >
          <CrossSvg className="translate-y-[0.05rem] ml-[0.05rem] " />
        </button>

        {/* Modal Content */}
        <div className="w-[6.63rem] h-[6.63rem] rounded-full bg-[#DCE2FF] flex justify-center items-center">
          <Image
            className="translate-y-[0.1rem] size-[5.5rem]"
            src={CheckSvg}
            alt="Check mark"
          />
        </div>
        <span className="text-2xl translate-y-2 leading-[1.85rem] font-semibold  text-center ">
          Form Submitted
        </span>
      </div>
    </div>
  );
};
