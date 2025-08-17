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

    // جلب المستخدمين الموجودين
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // التحقق لو الإيميل موجود بالفعل
    if (users.some((user) => user.email === email)) {
      alert("هذا البريد الإلكتروني مسجل بالفعل!");
      return;
    }

    // ✅ تعيين الدور (الـ Admin بإيميل معين مثلاً)
    const role = email === "admin@example.com" ? "admin" : "user";

    // إنشاء المستخدم الجديد
    const newUser = { fullName, email, password, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // ✅ تسجيل الدخول أوتوماتيك بعد التسجيل
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", role);

    alert("تم إنشاء الحساب وتسجيل الدخول بنجاح!");

    // ✅ توجيه المستخدم حسب دوره
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
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
            <h2>Sign Up</h2>
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
          <button className="btn-yellow" onClick={handleSignUp}>
            Create Account
          </button>

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
