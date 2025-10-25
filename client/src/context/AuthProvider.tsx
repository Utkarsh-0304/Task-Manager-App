import { useState, createContext, useContext, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  name: string;
  username: string;
  userId: number;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  loginAction: (data: { username: string, password: string }) => Promise<string | boolean>;
  logOut: () => void;
  hasProfileAnimated: boolean;
  setHasProfileAnimated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const getInitialState = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(getInitialState);
  const [hasProfileAnimated, setHasProfileAnimated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const loginAction = async (data: { username: string, password: string }) => {
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
