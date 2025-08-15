import React, { useState, useEffect } from "react";
import "../style/EditHero.css";
import defaultHeroImage from "../data/gairl.jpg"; // حط صورة افتراضية هنا

export default function EditHero() {
  const defaultData = {
    titleSmall: "Welcome to",
    titleLarge: "My Fitness Site",
    description: "Achieve your fitness goals with our expert programs and community support.",
    buttonText: "Get Started",
    image: defaultHeroImage,
  };

  const [formData, setFormData] = useState(defaultData);

  // تحميل البيانات من localStorage أو وضع الافتراضية
  useEffect(() => {
    const savedData = localStorage.getItem("heroData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData({
        titleSmall: parsed.titleSmall || defaultData.titleSmall,
        titleLarge: parsed.titleLarge || defaultData.titleLarge,
        description: parsed.description || defaultData.description,
        buttonText: parsed.buttonText || defaultData.buttonText,
        image: parsed.image || defaultData.image,
      });
    } else {
      localStorage.setItem("heroData", JSON.stringify(defaultData));
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // حفظ البيانات
  const handleSave = () => {
    localStorage.setItem("heroData", JSON.stringify(formData));
    alert("✅ Hero section updated successfully!");
  };

  return (
    <div className="edit-hero-container">
      <h2 className="edit-hero-title">Edit Hero Section</h2>

      <input
        className="edit-hero-input"
        name="titleSmall"
        value={formData.titleSmall}
        onChange={handleChange}
        placeholder="Small Title"
      />
      <input
        className="edit-hero-input"
        name="titleLarge"
        value={formData.titleLarge}
        onChange={handleChange}
        placeholder="Large Title"
      />
      <textarea
        className="edit-hero-textarea"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      ></textarea>
      <input
        className="edit-hero-input"
        name="buttonText"
        value={formData.buttonText}
        onChange={handleChange}
        placeholder="Button Text"
      />

      {/* Choose image */}
      <input
        type="file"
        accept="image/*"
        className="edit-hero-input"
        onChange={handleImageChange}
      />

      {/* Image preview */}
      {formData.image && (
        <div className="hero-image-preview">
          <img src={formData.image} alt="Hero Preview" />
        </div>
      )}

      <div className="con">
        <button className="edit-hero-btn" onClick={handleSave}>
          💾 Save
        </button>
      </div>
    </div>
  );
}
