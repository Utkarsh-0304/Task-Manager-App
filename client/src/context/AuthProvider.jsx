import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const AuthContext = createContext(null);

const getInitialState = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(getInitialState);
  const [hasProfileAnimated, setHasProfileAnimated] = useState(false);
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
        setUser({ name: res.name, username: res.username, userId: res.userId });
        setIsLoggedIn(true);
        navigate("/home");
        toast.success("Logged In Succesfully");
        return true;
      } else {
        return res?.message || "Invalid username or password";
      }
    } catch (err) {
      return "Network error: " + String(err);
    }
  };

  const logOut = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
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
    setIsLoggedIn(false);
    setHasProfileAnimated(false);
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        loginAction,
        logOut,
        hasProfileAnimated,
        setHasProfileAnimated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
