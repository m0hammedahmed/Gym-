import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import girlImg from "../data/gairl.jpg";
import "../style/Auth.css";

export default function Login({ setIsAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // بيانات الأدمن
    const adminEmail = "admin@example.com";
    const adminPassword = "123456";

    // لو أدمن
    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("isLoggedIn", "true"); 
      localStorage.setItem("role", "admin");
      setIsAdmin(true);

      // ✅ بعد تسجيل الدخول يروح على الـ Dashboard
      navigate("/admin");
      return;
    }

    // لو مستخدم عادي
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "user");

      // ✅ يروح على الصفحة الرئيسية
      navigate("/");
    } else {
      alert("❌ البريد الإلكتروني أو كلمة المرور غير صحيحة!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-hed">
        <h1>Welcome Back!</h1>
        <p>Start your fitness journey today</p>
      </div>
      <div className="auth-content">
        <div className="auth-form">
          <div className="auth-h">
            <h2>Login</h2>
          </div>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="checkbox-line">
            <a href="#">Forgot password?</a>
          </div>
          <button className="btn-yellow" onClick={handleLogin}>
            Login
          </button>

          <p className="auth-switch-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>

          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaGoogle /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
        <div className="auth-image">
          <img src={girlImg} alt="Fitness Girl" />
        </div>
      </div>
    </div>
  );
}
