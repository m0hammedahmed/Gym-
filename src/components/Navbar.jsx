import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/Navbar.css";

export default function Navbar({ isAdmin, setIsAdmin, gymName }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    setIsAdmin(false);
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          🏋️‍♂️ {gymName || "FitZone"} {/* الاسم دلوقتي يسمع */}
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>☰</div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/" onClick={closeMenu}>Home</Link>
        </li>
        <li className={location.pathname === "/about" ? "active" : ""}>
          <Link to="/about" onClick={closeMenu}>About</Link>
        </li>
        <li className={location.pathname === "/connect" ? "active" : ""}>
          <Link to="/connect" onClick={closeMenu}>Connect</Link>
        </li>
        <li className={location.pathname === "/transport" ? "active" : ""}>
          <Link to="/transport" onClick={closeMenu}>Transformers</Link>
        </li>

        {isAdmin && (
          <li className={location.pathname === "/admin" ? "active" : ""}>
            <Link to="/admin" onClick={closeMenu}>Admin Dashboard</Link>
          </li>
        )}
        <li>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </li>
      </ul>
    </nav>
  );
}
