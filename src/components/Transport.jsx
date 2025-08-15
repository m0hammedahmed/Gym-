// Transport.jsx
import React, { useState, useEffect } from "react";
import TransformersCard from "../components/TransformersCard";
import Footer from "../components/Footer";
import "../style/Transport.css";

export default function Transport() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("transportData");
    if (saved) {
      setCards(JSON.parse(saved));
    }
  }, []);

  return (
    <>
      <div className="con_card">
        {cards.map((card, i) => (
          <TransformersCard
            key={i}
            imageBefore={card.before}
            imageAfter={card.after}
            title={card.title}
            description={card.desc}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}
