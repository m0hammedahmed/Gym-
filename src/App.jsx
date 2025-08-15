import { BrowserRouter, Routes, Route } from "react-router-dom";
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

  // لو الصفحة اتعملها Refresh نتحقق من LocalStorage
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") setIsAdmin(true);
  }, []);

  return (
    <BrowserRouter>
      <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Connect" element={<Connect />} />
        <Route path="/Transport" element={<Transport />} />
  
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {/* يظهر Dashboard الأدمن داخل نفس الصفحة */}
      
    </BrowserRouter>
  );
}

export default App;
