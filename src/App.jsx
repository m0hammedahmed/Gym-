import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Transport from "./components/Transport"; 
import Connect from "./components/Connect";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ أول ما الصفحة تفتح (أو Refresh) استرجع الحالة من localStorage
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("role");

    setIsLoggedIn(loggedInStatus);
    setIsAdmin(role === "admin");
  }, []);

  return (
    <>
      <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/transport" element={<Transport />} />

        {/* ✅ حماية صفحة الأدمن */}
        <Route
          path="/admin"
          element={isAdmin ? <AdminDashboard /> : <Home />}
        />
      </Routes>
    </>
  );
}

export default App;
