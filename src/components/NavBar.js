import React from "react";
import trelloLogo from "../images/trello-logo.svg";

export default function NavBar() {
  return (
    <div className="nav-bar">
      <div className="header">
        <img src={trelloLogo} alt="Logo" />
        Trello
      </div>
      <div className="auth">
        <button>Login</button>
        <button>Sign Up</button>
      </div>
    </div>
  );
}
