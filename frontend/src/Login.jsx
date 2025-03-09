import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import NavBar from "./components/NavBar";
// import Typewriter from "typewriter-effect";

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
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/home");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.log("Error occured", err);
    }
  }

  return (
    <div className="login">
      <NavBar />
      <div className="left">
        {/* <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("Welcome To")
              .pauseFor(1000)
              .deleteAll()
              .typeString("TaskFlow")
              .start();
          }}
        /> */}
        <div className="punchLine">
          "Your go-to{" "}
          <span style={{ backgroundColor: "rgba(0, 0, 255, 0.576)" }}>
            task management tool
          </span>
          "
        </div>
      </div>
      <div className="right">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-text">Login</div>
          <div>
            <label htmlFor="uname">Username </label>
            <br />
            <input
              value={username}
              type="text"
              placeholder="Enter username"
              name="uname"
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="pass">Password </label>
            <br />
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
          <div
            style={{
              color: "blue",
              marginTop: "5px",
              marginBottom: "5px",
              paddingBottom: "5px",
            }}
          >
            New User?{" "}
            <button
              style={{
                fontFamily: "inherit",
                fontSize: "inherit",
                backgroundColor: "transparent",
                color: "blue",
                border: "none",
                cursor: "pointer",
                padding: "0",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/signup")}
            >
              signup
            </button>{" "}
            here
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
