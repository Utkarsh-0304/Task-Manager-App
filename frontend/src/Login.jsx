import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./login.css";
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
    <div className="flex min-h-screen bg-gradient-to-r from-blue-900 to-gray-800">
      <NavBar />
      {/* Left Column */}
      <div className="w-1/2 flex flex-col justify-center items-center text-white text-[2rem] px-10">
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
        <div>
          "Your go-to{" "}
          <span className="bg-blue-500/70 px-2 py-1 rounded-md">
            task management tool
          </span>
          "
        </div>
      </div>

      {/* Right Column with Form */}
      <div className="w-1/2 flex justify-center items-center">
        <form
          className="bg-white/90 flex flex-col items-center justify-center w-4/5 max-w-md shadow-2xl rounded-lg p-8"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl font-bold text-sky-800 mb-6">Login</h2>

          <div className="w-full mb-6">
            <label htmlFor="uname" className="block text-md font-semibold mb-2">
              Username
            </label>
            <input
              className="w-full bg-gray-100 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition "
              value={username}
              type="text"
              placeholder="Enter username"
              name="uname"
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>

          <div className="w-full mb-6">
            <label htmlFor="pass" className="block text-md font-semibold mb-2">
              Password
            </label>
            <input
              className="w-full bg-gray-100 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              value={password}
              type="password"
              placeholder="Enter password"
              name="pass"
              onChange={(e) => setPassInput(e.target.value)}
            />
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300"
          >
            Login
          </button>

          <div className="text-center text-gray-500 mt-6">
            Don't have an account?{" "}
            <button
              className="text-blue-500 hover:underline transition"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>{" "}
            here
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
