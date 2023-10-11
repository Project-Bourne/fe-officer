import { useRef, useState } from 'react';
import { useOnClickOutside } from '../custom-hooks';

type ModalProps = {
  style?: string;
  children?: any;
  closeModal?: any;
  closeBtn?: boolean;
}

function CustomModal({ style, children, closeModal, closeBtn }: ModalProps) {
  const ref = useRef();
  useOnClickOutside(ref, closeModal);

  return (
    <div className="fixed z-[1020] backdrop-blur-sm w-full h-full top-0 left-0 bottom-0 bg-[#747474]/[0.1] backdrop-brightness-50">
      <div ref={ref} className={`${style} grid`}>
        {closeBtn && 
        <div className="flex justify-end text-xl">
          <button onClick={closeModal}> &times; </button>
        </div>
        }
        <main>{children}</main>
      </div>
    </div>
  );
}

export default CustomModal;
