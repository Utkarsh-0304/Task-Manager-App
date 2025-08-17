import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

const getInitialState = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(getInitialState);
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const loginAction = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const res = await response.json();

      if (response.ok) {
        setUser({ username: res.username, userId: res.userId });
        setIsLoggedIn(true);
        navigate("/home");
        return;
      } else {
        return new Error("Invalid username or password");
      }
    } catch (err) {
      console.log("Error occured", err);
    } finally {
      return new Error("Cannot Login");
    }
  };

  const logOut = async () => {
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
    setUser(null);
    setIsLoggedIn(true);
    navigate("/login");
  };

  return (
    <AuthContext value={{ isLoggedIn, user, loginAction, logOut }}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
