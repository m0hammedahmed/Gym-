import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import girlImg from "../data/gairl.jpg";
import "../style/Auth.css";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert("يرجى ملء جميع الحقول!");
      return;
    }
    if (password !== confirmPassword) {
      alert("كلمتا المرور غير متطابقتين!");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.email === email)) {
      alert("هذا البريد الإلكتروني مسجل بالفعل!");
      return;
    }
    const newUser = { fullName, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("تم إنشاء الحساب بنجاح!");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-hed">
        <h1>Track Your Progress & More!</h1>
        <p>Start your fitness journey today</p>
      </div>
      <div className="auth-content">
        <div className="auth-form">
          <div className="auth-h">
            <h2>SignUp</h2>
          </div>
          <input 
            placeholder="Full Name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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
          <input 
            placeholder="Confirm Password" 
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="btn-yellow" onClick={handleSignUp}>Create Account</button>

          {/* رابط التبديل إلى صفحة تسجيل الدخول */}
          <p className="auth-switch-link">
            Already have an account? <Link to="/login">Login</Link>
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
