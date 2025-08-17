import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavbarEdit({ gymName, setGymName }) {
  const [newName, setNewName] = useState(gymName || "");
  const navigate = useNavigate();

  const handleSave = () => {
    setGymName(newName); // تحديث الاسم في Navbar مباشرة
    navigate("/"); // ارجع للصفحة الرئيسية
  };

  // ✅ CSS كـ object
  const styles = {
    container: {
      padding: "40px",
      maxWidth: "400px",
      margin: "50px auto",
      backgroundColor: "#1A1C24",
      color: "#F8F8F2",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      textAlign: "center",
      fontFamily: "'Segoe UI', sans-serif",
    },
    input: {
      width: "80%",
      padding: "10px 12px",
      margin: "20px 0",
      borderRadius: "8px",
      border: "1px solid #44475A",
      backgroundColor: "#2A2D3E",
      color: "#F8F8F2",
      fontSize: "16px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#FF9F1C",
      color: "#1A1C24",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "16px",
    },
    heading: {
      fontSize: "24px",
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Gym Name</h2>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter gym name"
        style={styles.input}
      />
      <br />
      <button onClick={handleSave} style={styles.button}>Save</button>
    </div>
  );
}
