import React, { useState } from "react";
import "../style/TransformersCard.css";

export default function TransformersCard({ imageBefore, imageAfter, title, description }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="t-card">
      {/* الكارت */}
      <div className="t-card-inner" onClick={() => setOpen(true)}>
        <img src={imageBefore} alt={title} className="t-card-img" />
        <div className="t-card-meta">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      {/* المودال */}
      {open && (
        <div className="t-modal-overlay" onClick={() => setOpen(false)}>
          <div className="t-modal" onClick={(e) => e.stopPropagation()}>
            <div className="t-modal-images">
              <div>
                <span className="t-label">Before</span>
                <img src={imageBefore} alt="Before" />
              </div>
              <div>
                <span className="t-label">After</span>
                <img src={imageAfter} alt="After" />
              </div>
            </div>
            <div className="t-modal-footer">
              <h3>{title}</h3>
              <p>{description}</p>
              <button className="t-close" onClick={() => setOpen(false)}>Close ✕</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
