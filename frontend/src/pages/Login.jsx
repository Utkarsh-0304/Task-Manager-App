import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function Login() {
  const navigate = useNavigate();
  const [username, setUserInput] = useState("");
  const [password, setPassInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("username or password fields cannot be empty");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-[2rem] px-10 py-8">
          <div>
            "Your go-to{" "}
            <span className="bg-black px-2 py-1 rounded-md text-white">
              task management tool
            </span>
            "
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center py-8">
          <form
            className="bg-white/90 flex flex-col items-center justify-center w-4/5 max-w-md shadow-2xl rounded-lg p-8"
            onSubmit={handleSubmit}
          >
            <h2 className="text-4xl font-bold text-black mb-6">Login</h2>

            <div className="w-full mb-6">
              <label
                htmlFor="uname"
                className="block text-md font-semibold mb-2"
              >
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
              <label
                htmlFor="pass"
                className="block text-md font-semibold mb-2"
              >
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
              className="w-full bg-black hover:bg-black/90 text-white py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center text-gray-500 mt-6">
              Don't have an account?{" "}
              <button
                className="text-black hover:underline transition"
                type="button"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>{" "}
              here
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
