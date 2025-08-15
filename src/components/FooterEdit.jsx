// src/admin/FooterEdit.jsx
import React, { useState, useEffect } from "react";
import "../style/FooterEdit.css";
import defaultLogo from "../data/logo.jpg"; // ضع صورة افتراضية هنا

export default function FooterEdit() {
  const defaultData = {
    logo: defaultLogo,
    quote: "Your body can stand almost anything. It’s your mind that you have to convince.",
    quickLinks: [
      { text: "🏠 Home", url: "/" },
      { text: "💪 About Us", url: "/about" },
      { text: "📆 Classes", url: "/classes" },
      { text: "📞 Contact", url: "/contact" }
    ],
    contact: {
      address: "📍 123 Muscle Street, Cairo, Egypt",
      phone: "📞 +20 106 618 4859",
      hours: "🕒 Open: 6AM - 11PM"
    },
    social: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      whatsapp: "https://wa.me/201066184859"
    }
  };

  const [footerData, setFooterData] = useState(defaultData);

  // تحميل البيانات المحفوظة أو وضع الافتراضية
  useEffect(() => {
    const saved = localStorage.getItem("footerData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setFooterData({
        logo: parsed.logo || defaultData.logo,
        quote: parsed.quote || defaultData.quote,
        quickLinks: parsed.quickLinks || defaultData.quickLinks,
        contact: parsed.contact || defaultData.contact,
        social: parsed.social || defaultData.social
      });
    } else {
      localStorage.setItem("footerData", JSON.stringify(defaultData));
    }
  }, []);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFooterData({ ...footerData, logo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (field, value) => {
    setFooterData({ ...footerData, [field]: value });
  };

  const handleQuickLinkChange = (index, field, value) => {
    const updatedLinks = [...footerData.quickLinks];
    updatedLinks[index][field] = value;
    setFooterData({ ...footerData, quickLinks: updatedLinks });
  };

  const handleContactChange = (field, value) => {
    setFooterData({
      ...footerData,
      contact: { ...footerData.contact, [field]: value }
    });
  };

  const handleSocialChange = (field, value) => {
    setFooterData({
      ...footerData,
      social: { ...footerData.social, [field]: value }
    });
  };

  const saveData = () => {
    localStorage.setItem("footerData", JSON.stringify(footerData));
    alert("✅ Footer updated successfully!");
  };

  return (
    <div className="footer-edit">
      <h2>Edit Footer</h2>

      <label>Logo</label>
      <input type="file" accept="image/*" onChange={handleLogoUpload} />
      {footerData.logo && (
        <img src={footerData.logo} alt="Logo" className="preview" />
      )}

      <label>Quote</label>
      <textarea
        value={footerData.quote}
        onChange={(e) => handleChange("quote", e.target.value)}
      />

      <h3>Quick Links</h3>
      {footerData.quickLinks.map((link, i) => (
        <div key={i} className="link-edit">
          <input
            type="text"
            value={link.text}
            onChange={(e) =>
              handleQuickLinkChange(i, "text", e.target.value)
            }
            placeholder="Link Text"
          />
          <input
            type="text"
            value={link.url}
            onChange={(e) => handleQuickLinkChange(i, "url", e.target.value)}
            placeholder="Link URL"
          />
        </div>
      ))}

      <h3>Contact Info</h3>
      <input
        type="text"
        value={footerData.contact.address}
        onChange={(e) => handleContactChange("address", e.target.value)}
        placeholder="Address"
      />
      <input
        type="text"
        value={footerData.contact.phone}
        onChange={(e) => handleContactChange("phone", e.target.value)}
        placeholder="Phone"
      />
      <input
        type="text"
        value={footerData.contact.hours}
        onChange={(e) => handleContactChange("hours", e.target.value)}
        placeholder="Hours"
      />

      <h3>Social Links</h3>
      <input
        type="text"
        value={footerData.social.facebook}
        onChange={(e) => handleSocialChange("facebook", e.target.value)}
        placeholder="Facebook URL"
      />
      <input
        type="text"
        value={footerData.social.instagram}
        onChange={(e) => handleSocialChange("instagram", e.target.value)}
        placeholder="Instagram URL"
      />
      <input
        type="text"
        value={footerData.social.whatsapp}
        onChange={(e) => handleSocialChange("whatsapp", e.target.value)}
        placeholder="WhatsApp URL"
      />

      <button onClick={saveData}>💾 Save Changes</button>
    </div>
  );
}
