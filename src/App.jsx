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

  // ✅ الحالة الرئيسية لاسم الجيم
  const [gymName, setGymName] = useState(() => {
    return localStorage.getItem("gymName") || "FitZone";
  });

  // حفظ الاسم في localStorage
  useEffect(() => {
    localStorage.setItem("gymName", gymName);
  }, [gymName]);

  // أول ما الصفحة تفتح أو Refresh استرجع حالة تسجيل الدخول والدور
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("role");

    setIsLoggedIn(loggedInStatus);
    setIsAdmin(role === "admin");
  }, []);

  return (
    <>
      {/* Navbar يسمع أي تغيير في الاسم */}
      <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} gymName={gymName} />

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/transport" element={<Transport />} />

        {/* حماية صفحة الأدمن وتمرير الحالة لتعديل الاسم */}
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <AdminDashboard gymName={gymName} setGymName={setGymName} />
            ) : (
              <Home />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
