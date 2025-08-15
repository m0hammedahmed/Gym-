// MerchGalleryEdit.jsx
import React, { useState, useEffect } from "react";
import "../style/MerchGalleryEdit.css";

export default function MerchGalleryEdit() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ img: "", shape: "square" });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("merchGallery")) || [];
    setItems(saved);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, img: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrEdit = () => {
    let updated = [...items];
    if (editIndex !== null) {
      updated[editIndex] = form;
    } else {
      updated.push(form);
    }
    setItems(updated);
    localStorage.setItem("merchGallery", JSON.stringify(updated));
    setForm({ img: "", shape: "square" });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setForm(items[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    localStorage.setItem("merchGallery", JSON.stringify(updated));
  };

  return (
    <div className="edit-merch-container">
      <h2>Edit Merch Gallery</h2>
      
      <div className="merch-form">
      
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {form.img && <img src={form.img} alt="Preview" style={{ width: "80px", height: '50px', }} />}
      
        <select name="shape" value={form.shape} onChange={handleChange}>
          <option value="square">Square</option>
          <option value="round">Round</option>
        </select>
        <button onClick={handleAddOrEdit}>{editIndex !== null ? "Update" : "Add"}</button>
      </div>

      <div className="merch-cards">
        {items.map((item, i) => (

          <div key={i} className={`photo-card ${item.shape}`}>
            <div className="photo-inner">
            <img src={item.img} alt={`Merch ${i}`} />
            </div>
            <div className="card-actions" style={{ backgroundColor: '#323232' , padding: '10px' }}>
              <button onClick={() => handleEdit(i)}>Edit</button>
              <button onClick={() => handleDelete(i)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
