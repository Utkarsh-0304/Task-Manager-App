import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Issue from './pages/Issue';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import LandingPage from "./pages/LandingPage";
import Board from "./components/Board";
import DashboardLayout from "./layouts/DashboardLayout";
import Project from "./pages/Project";

const PrivateRoute = () => {
  const [isVerified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/verify`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setVerified(true);
        } else {
          setVerified(false);
        }
      })
      .catch(() => setVerified(false));
  }, []);

  if (isVerified === null) return;
  return isVerified ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/ping`)
      .then((res) => console.log("Backend pinged"))
      .catch((err) => console.log("Error pinging backend: ", err));
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/home" element={<Homepage />} />
              <Route path="/board/:boardId" element={<Board />} />
              <Route path="/issue" element={<Issue />} />
              <Route path="/project" element={<Project />} />
            </Route>
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
