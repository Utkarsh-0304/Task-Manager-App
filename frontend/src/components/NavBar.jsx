import React, { useState, useRef, useEffect } from "react";
import trelloLogo from "../images/trello-logo.svg";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { SlArrowDown } from "react-icons/sl";

export default function NavBar() {
  const navigate = useNavigate();
  let url = window.location.href;
  url = url.substring(url.lastIndexOf("/"), url.length);
  const [isOpen, setIsOpen] = useState(false);
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

  async function handleClick() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (err) {
      console.log("Error occured", err);
    }
    navigate("/");
  }

  return (
    <div className="w-full h-[4rem] p-[1rem] flex justify-between items-center ">
      <div className="w-80 font-bold flex items-center justify-left gap-[0.5rem] text-[1.5rem] ">
        <img src={trelloLogo} alt="Logo" className="h-auto w-[30px]" />
        TaskFlow
      </div>
      {
        <div
          className="p-1 w-20 flex justify-evenly items-center relative bg-[#EFF2F5] rounded-[15px]"
          ref={dropdownRef}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <CgProfile size={35} />
          <button className="arrow-btn">
            <span className={`arrow-icon ${isOpen ? "up" : "down"}`}>
              <SlArrowDown />
            </span>
          </button>
          {isOpen && (
            <div className="bg-[#EFF2F5] dropdown absolute top-full right-0 mt-2 w-40 shadow-lg rounded p-2 z-10">
              <div
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                onClick={handleClick}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      }
    </div>
  );
}
