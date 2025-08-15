// src/components/GymFooter.jsx
import React, { useEffect, useState } from "react";
import "../style/Footer.css";

const GymFooter = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("footerData");
    if (saved) {
      setFooterData(JSON.parse(saved));
    }
  }, []);

  if (!footerData) return null;

  return (
    <footer className="gym-footer">
      <div className="footer-container">
        {/* Logo & Quote */}
        <div className="footer-brand">
          {footerData.logo && <img src={footerData.logo} alt="Gold Gym Logo" />}
          <p className="quote">{footerData.quote}</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            {footerData.quickLinks.map((link, i) => (
              <li key={i}>
                <a href={link.url}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Info Section */}
        <div className="footer-info">
          <h3>Contact</h3>
          <p>{footerData.contact.address}</p>
          <p>{footerData.contact.phone}</p>
          <p>{footerData.contact.hours}</p>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href={footerData.social.facebook} className="icon fb" target="_blank" rel="noreferrer"></a>
            <a href={footerData.social.instagram} className="icon ig" target="_blank" rel="noreferrer"></a>
            <a href={footerData.social.whatsapp} className="icon wa" target="_blank" rel="noreferrer"></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} TRENDWS GYM | Designed by Mohammed Ahmed Nasr</p>
      </div>
    </footer>
  );
};

export default GymFooter;
