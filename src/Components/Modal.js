import React from 'react';

const Modal = ({ isVisible, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative w-full max-w-lg p-6 bg-[#F1F1F1] rounded-lg shadow-lg mx-4 sm:mx-0">
        {children}
      </div>
    </div>
  );
};

export default Modal;

