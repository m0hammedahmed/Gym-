import React, { useState, useEffect } from "react";
import contactImageDefault from "../data/gairl.jpg";
import logoDefault from "../data/logo.jpg";
import "../style/contentEdit.css";

const ContentEdit = ({ onSave }) => {
  // القيم الافتراضية
  const defaultData = {
    titleText: "Contact Us",
    mainText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    footerText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    contactImageSrc: contactImageDefault,
    logo: logoDefault,
  };

  // State لكل الحقول
  const [titleText, setTitleText] = useState(defaultData.titleText);
  const [mainText, setMainText] = useState(defaultData.mainText);
  const [footerText, setFooterText] = useState(defaultData.footerText);
  const [contactImageSrc, setContactImageSrc] = useState(defaultData.contactImageSrc);
  const [logo, setLogo] = useState(defaultData.logo);

  // تحميل البيانات من localStorage أو استخدام الديفولت
  useEffect(() => {
    const savedData = localStorage.getItem("contactData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setTitleText(parsed.titleText || defaultData.titleText);
      setMainText(parsed.mainText || defaultData.mainText);
      setFooterText(parsed.footerText || defaultData.footerText);
      setContactImageSrc(parsed.contactImageSrc || defaultData.contactImageSrc);
      setLogo(parsed.logo || defaultData.logo);
    } else {
      // حفظ القيم الافتراضية لأول مرة
      localStorage.setItem("contactData", JSON.stringify(defaultData));
    }
  }, []);

  // رفع الصور وتحويلها لـ Base64
  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // حفظ البيانات
  const handleSave = () => {
    const newData = { titleText, mainText, footerText, contactImageSrc, logo };
    onSave(newData);
    localStorage.setItem("contactData", JSON.stringify(newData));
    alert("✅ Changes saved successfully!");
  };

  return (
    <div className="content-edit">
      <h2>Edit Contact Page Content</h2>

      <label>Title</label>
      <input value={titleText} onChange={(e) => setTitleText(e.target.value)} />

      <label>Main Text</label>
      <textarea value={mainText} onChange={(e) => setMainText(e.target.value)} />

      <label>Footer Text</label>
      <textarea value={footerText} onChange={(e) => setFooterText(e.target.value)} />

      <label>Contact Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e, setContactImageSrc)}
      />
      {contactImageSrc && (
        <img
          src={contactImageSrc}
          alt="Contact Preview"
          style={{ width: "120px", marginTop: "10px", borderRadius: "6px" }}
        />
      )}

      <label>Logo</label>
      <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, setLogo)} />
      {logo && (
        <img
          src={logo}
          alt="Logo Preview"
          style={{ width: "80px", marginTop: "10px", borderRadius: "6px" }}
        />
      )}

      <button onClick={handleSave}>💾 Save Changes</button>
    </div>
  );
};

export default ContentEdit;
