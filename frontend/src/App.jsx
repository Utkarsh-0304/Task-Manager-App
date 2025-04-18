import React, { useState, useEffect } from "react";
import Login from "./Login";
import Homepage from "./Homepage";
import Signup from "./Signup";
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
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
