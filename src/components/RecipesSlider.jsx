import React, { useState, useEffect, useContext } from "react";
import "../style/RecipesSlider.css";
import { RecipesContext } from "../data/RecipesContext"; // ⬅ استدعاء الكونتكست

export default function RecipesSlider() {
  const { recipes } = useContext(RecipesContext); // ⬅ جلب البيانات المشتركة
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recipes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [recipes]);

  const handleSelect = (index) => {
    setCurrentIndex(index);
  };

  const handlePopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if (!recipes.length) return <p>No recipes available</p>;

  return (
    <div className="all">
      <h2>///Recipes</h2>

      <div className="recipe-gallery">
        <div className="main-card">
          <img src={recipes[currentIndex].image} alt="Recipe" />
          <div className="content">
            <h3>{recipes[currentIndex].title}</h3>
            <p>{recipes[currentIndex].description}</p>
            <button className="view-button" onClick={handlePopup}>
              View Full Recipe <span>→</span>
            </button>
          </div>
        </div>

        <div className="sidebar">
          <button className="more-button">View More Recipes</button>
          {recipes.map((item, index) => (
            <div
              key={index}
              className={`thumbnail ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => handleSelect(index)}
            >
              <img src={item.image} alt={item.category} />
              <p>{item.category}</p>
            </div>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <img src={recipes[currentIndex].image} alt="Full Recipe" />
            <div className="popup-content">
              <h2>{recipes[currentIndex].title}</h2>
              <p>{recipes[currentIndex].description}</p>
              <button className="close-button" onClick={closePopup}>
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
