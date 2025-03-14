import React, { useState } from "react";
import trelloLogo from "../images/trello-logo.svg";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  let url = window.location.href.substring(21);

  async function handleClick() {
    try {
      const response = await fetch("http://localhost:3001/logout", {
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
    <div className="w-full h-[4rem] p-[1rem] flex justify-between items-center bg-blue-900 fixed top-0 left-0 z-3">
      <div className="w-80 font-[Pacifico] flex items-center justify-left gap-[0.5rem] text-[1.5rem] text-white">
        <img src={trelloLogo} alt="Logo" className="h-auto w-[30px]" />
        TaskFlow
      </div>
      {url === "/home" && (
        <div className="auth">
          <button
            style={{ backgroundColor: "transparent", color: "white" }}
            onClick={handleClick}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
