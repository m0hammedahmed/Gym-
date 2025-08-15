import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/Navbar.css";


export default function Navbar({ isAdmin, setIsAdmin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); 
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("role");
    setIsLoggedIn(loggedInStatus);
    setRole(userRole);
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole("");
    setIsAdmin(false);
    closeMenu();
    navigate("/login");
  };

  const renderAuthLinks = () => {
    if (isLoggedIn) {
      return (
        <>
          {/* رابط الأدمن يظهر كـ Link عادي */}
          {role === "admin" && (
            <li className={location.pathname === "/admin" ? "active" : ""}>
              <Link to="/admin" onClick={closeMenu}>
                Admin Dashboard
              </Link>
            </li>
          )}
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </>
      );
    }

    if (location.pathname === "/login") {
      return (
        <li className={location.pathname === "/signup" ? "active" : ""}>
          <Link to="/signup" onClick={closeMenu}>
            Sign Up
          </Link>
        </li>
      );
    }

    if (location.pathname === "/signup") {
      return (
        <li className={location.pathname === "/login" ? "active" : ""}>
          <Link to="/login" onClick={closeMenu}>
            Login
          </Link>
        </li>
      );
    }

    return (
      <li className={location.pathname === "/login" ? "active" : ""}>
        <Link to="/login" onClick={closeMenu}>
          Login
        </Link>
      </li>
    );
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          🏋️‍♂️ FitZone
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li className={location.pathname === "/about" ? "active" : ""}>
          <Link to="/about" onClick={closeMenu}>
            About
          </Link>
        </li>
        <li className={location.pathname === "/connect" ? "active" : ""}>
          <Link to="/connect" onClick={closeMenu}>
            Connect
          </Link>
        </li>
        <li className={location.pathname === "/Transport" ? "active" : ""}>
          <Link to="/Transport" onClick={closeMenu}>
            Transformers
          </Link>
        </li>

        {renderAuthLinks()}
      </ul>
    </nav>
  );
}
