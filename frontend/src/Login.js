import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import NavBar from "./components/NavBar";

function Login() {
  const [userInput, setUserInput] = useState("");
  const [passInput, setPassInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(userInput);
    console.log(passInput);
  }
  return (
    <div className="login">
      <NavBar />
      <div className="left">
        Welcome To <span className="span">TaskFlow</span>
      </div>
      <div className="right">
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label for="uname">Username: </label>
            <input
              value={userInput}
              type="text"
              placeholder="Enter username"
              name="uname"
              required
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
          <div>
            <label for="pass">Password: </label>
            <input
              value={passInput}
              type="password"
              placeholder="Enter password"
              name="pass"
              required
              onChange={(e) => setPassInput(e.target.value)}
            />
          </div>
          {/* <label for="remember"></label> */}
          <button type="submit" className="loginButton">
            <Link to="/home">Login</Link>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
