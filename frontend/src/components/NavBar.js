import React, { useState } from "react";
import trelloLogo from "../images/trello-logo.svg";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  let url = window.location.href.substring(21);

  return (
    <div className="nav-bar">
      <div className="header">
        <img src={trelloLogo} alt="Logo" />
        TaskFlow
      </div>
      {url === "/home" && (
        <div className="auth">
          <button
            style={{ backgroundColor: "transparent", color: "white" }}
            onClick={() => navigate("/")}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
