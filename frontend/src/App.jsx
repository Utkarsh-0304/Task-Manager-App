import React from "react";
import Login from "./Login";
import Homepage from "./Homepage";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Signup from "./Signup";

const PrivateRoute = () => {
  const hasSessionId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("uid="));
  return hasSessionId ? <Outlet /> : <Navigate to="/" replace />;
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
