import React from "react";
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
  const hasSessionId = document.cookie;
  console.log("hasSessionId", hasSessionId);
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
