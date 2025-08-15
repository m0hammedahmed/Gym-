import React, { useState, useEffect } from "react";
import "../style/TransportEdit.css";

export default function TransportEdit() {
  const [cards, setCards] = useState([
    { before: "", after: "", title: "", desc: "" }
  ]);

  // تحميل البيانات المحفوظة
  useEffect(() => {
    const saved = localStorage.getItem("transportData");
    if (saved) {
      setCards(JSON.parse(saved));
    }
  }, []);

  const handleImageUpload = (e, index, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const newCards = [...cards];
      newCards[index][type] = reader.result;
      setCards(newCards);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (index, field, value) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  const addCard = () => {
    setCards([...cards, { before: "", after: "", title: "", desc: "" }]);
  };

  const saveData = () => {
    localStorage.setItem("transportData", JSON.stringify(cards));
    alert("✅ Transport cards updated successfully!");
  };

  return (
    <div className="transport-edit">
      <h2>Edit Transport Cards</h2>

      {cards.map((card, i) => (
        <div className="card-edit" key={i}>
          <label>Title</label>
          <input
            type="text"
            value={card.title}
            onChange={(e) => handleChange(i, "title", e.target.value)}
          />

          <label>Description</label>
          <textarea
            value={card.desc}
            onChange={(e) => handleChange(i, "desc", e.target.value)}
          />

          <label>Before Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, i, "before")}
          />
          {card.before && <img src={card.before} alt="Before" className="preview" />}

          <label>After Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, i, "after")}
          />
          {card.after && <img src={card.after} alt="After" className="preview" />}
        </div>
      ))}

      <button onClick={addCard}>➕ Add New Card</button>
      <button onClick={saveData}>💾 Save Changes</button>
    </div>
  );
}
