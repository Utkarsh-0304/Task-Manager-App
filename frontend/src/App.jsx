import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import ShadCn from "./pages/MUI";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

const PrivateRoute = () => {
  const [isVerified, setVerified] = useState(null);

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
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/" element={<Navigate to={"/login"} />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Homepage />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
