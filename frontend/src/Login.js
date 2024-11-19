import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import NavBar from "./components/NavBar";

function Login() {
  const navigate = useNavigate();
  const [username, setUserInput] = useState("");
  const [password, setPassInput] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("username or password fields cannot be empty");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/home");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.log("Error occured");
    }
  }

  return (
    <div className="login">
      <NavBar />
      <div className="left">
        Welcome To <span className="span">TaskFlow</span>
      </div>
      <div className="right">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-text">Login</div>
          <div>
            <label htmlFor="uname">Username: </label>
            <input
              value={username}
              type="text"
              placeholder="Enter username"
              name="uname"
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="pass">Password: </label>
            <input
              value={password}
              type="password"
              placeholder="Enter password"
              name="pass"
              onChange={(e) => setPassInput(e.target.value)}
            />
          </div>
          {error && <div className="error-div">{error}</div>}
          <button type="submit" className="loginButton">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
