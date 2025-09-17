import React, { useState, useRef, useEffect } from "react";
import trelloLogo from "../images/trello-logo.svg";
import { CgProfile } from "react-icons/cg";
import { SlArrowDown } from "react-icons/sl";
import { useAuth } from "../context/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const auth = useAuth();
  let url = window.location.href;
  url = url.substring(url.lastIndexOf("/"), url.length);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(!auth?.hasProfileAnimated);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!auth?.hasProfileAnimated) {
      const timer = setTimeout(() => {
        setVisible(false);
        auth?.setHasProfileAnimated(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="w-auto h-[10vh] p-[1rem] flex justify-between items-center ">
      <div className="w-80 font-bold flex items-center justify-left gap-[0.5rem] text-[1.5rem] ">
        <img src={trelloLogo} alt="Logo" className="h-auto w-[30px]" />
        TaskFlow
      </div>
      <div className="relative w-auto inline-block" ref={dropdownRef}>
        <motion.div
          className="p-1 flex items-center bg-[#EFF2F5] rounded-[15px] gap-[5px] cursor-pointer"
          animate={{
            justifyContent: visible ? "space-evenly" : "center",
          }}
          transition={{ duration: 0.4 }}
          style={{ overflow: "hidden" }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <motion.div layout transition={{ duration: 0.4, type: "spring" }}>
            <CgProfile size={35} />
          </motion.div>

          <AnimatePresence>
            {visible && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.4 }}
                style={{ whiteSpace: "nowrap" }}
              >
                Hi, {auth.user?.name}
              </motion.div>
            )}
          </AnimatePresence>

          <button className="arrow-btn">
            <span className={`arrow-icon ${isOpen ? "up" : "down"}`}>
              <SlArrowDown />
            </span>
          </button>
        </motion.div>

        {isOpen && (
          <div className="bg-[#EFF2F5] dropdown absolute top-full right-0 mt-2 w-40 shadow-lg rounded p-2 z-10">
            <div
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={auth.logOut}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
