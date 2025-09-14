import { useEffect, useRef, useState } from "react";

const Modal = ({ isOpen, setIsModalOpen, children }) => {
  const closeRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (closeRef.current && !closeRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, setIsModalOpen]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex justify-center items-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-lg p-6 w-[40vw] transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        ref={closeRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
