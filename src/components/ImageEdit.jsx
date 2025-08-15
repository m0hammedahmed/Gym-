import React, { useState, useEffect } from "react";
import "../style/contentEdit.css"; // استخدم نفس CSS لتنسيق لوحة التحرير
import defaultImage from "../data/gairl.jpg"; // الصورة الافتراضية

const ImageEdit = ({ initialImage, onSave }) => {
  const [image, setImage] = useState(initialImage || defaultImage); // الصورة الحالية
  const [preview, setPreview] = useState(initialImage || defaultImage); // المعاينة

  // لو في قيمة محفوظة في localStorage نستخدمها
  useEffect(() => {
    const savedImage = localStorage.getItem("imageEditData");
    if (savedImage) {
      setImage(savedImage);
      setPreview(savedImage);
    }
  }, []);

  // تغيير الصورة عند اختيار ملف جديد
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // حفظ الصورة الجديدة
  const handleSave = () => {
    onSave(preview); // نرسل رابط المعاينة للمكون الرئيسي
    localStorage.setItem("imageEditData", preview); // حفظ في localStorage
    alert("✅ Image updated successfully!");
  };

  return (
    <div className="content-edit-container">
      <h3>Edit Image</h3>
      <img 
        src={preview} 
        alt="Preview" 
        style={{ width: "200px", borderRadius: "10px", marginBottom: "10px" }}
      />
      <input type="file" accept="image/*" onChange={handleChange} />
      <div className="content-edit-buttons">
        <button onClick={handleSave}>💾 Save Image</button>
      </div>
    </div>
  );
};

export default ImageEdit;
