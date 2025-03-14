import NavBar from "./components/NavBar";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./signup.css";
// import Typewriter from "typewriter-effect";

const Signup = () => {
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
      const response = await fetch(`http://localhost:3001/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await response.json();
      console.log(data.message);

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log("Error occured", err);
    }
  }
  return (
    <div className="flex">
      <NavBar />
      <div className="w-1/2 h-screen flex justify-center items-center flex-col text-[2rem]">
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
        <div className="text-white">
          "Your go-to{" "}
          <span style={{ backgroundColor: "rgba(0, 0, 255, 0.576)" }}>
            task management tool
          </span>
          "
        </div>
      </div>
      <div className="w-1/2 h-screen flex justify-center items-center">
        <form
          className="bg-white/80 flex flex-col items-center justify-evenly h-auto w-4/5 shadow-2xl rounded-md"
          onSubmit={handleSubmit}
        >
          <div className="text-3xl font-bold text-sky-800">Signup</div>
          <div>
            <label htmlFor="uname" className="font-bold text-md mt-[2rem]">
              Username{" "}
            </label>
            <br />
            <input
              className="bg-white/25 border-none p-[0.5rem] mt-[0.5rem] outline-none rounded-l"
              value={username}
              type="text"
              placeholder="Enter username"
              name="uname"
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="pass" className="font-bold text-md">
              Password{" "}
            </label>
            <br />
            <input
              className="bg-white/25 border-none p-[0.5rem] mt-[0.5rem] outline-none rounded-l"
              value={password}
              type="password"
              placeholder="Enter password"
              name="pass"
              onChange={(e) => setPassInput(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 m-[1rem]">{error}</div>}
          <button
            type="submit"
            className="m-[0.5rem] p-[0.5rem] text-white bg-blue-500 rounded-s"
          >
            Signup
          </button>
          <div
            style={{
              color: "blue",
              marginTop: "5px",
              marginBottom: "5px",
              paddingBottom: "5px",
            }}
          >
            Already have an account?{" "}
            <button
              style={{
                fontFamily: "inherit",
                fontSize: "inherit",
                backgroundColor: "transparent",
                color: "blue",
                border: "none",
                cursor: "pointer",
                paddingLeft: "5px",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/login")}
            >
              login
            </button>{" "}
            here
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
