// MerchGallery.jsx
import React, { useState, useEffect } from "react";
import "../style/MerchGallery.css";

export default function MerchGallery() {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("merchGallery")) || [];
    setGalleryItems(saved);
  }, []);

  return (
    <div className="main-container">
      <section className="gallery-section">
        <h2 className="title">///Gallery</h2>
        <div className="gallery-static-grid">
          {galleryItems.map((item, index) => (
            <div key={index} className={`photo-card ${item.shape}`}>
              
                <img src={item.img} alt={`Gallery ${index}`} />
             
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
