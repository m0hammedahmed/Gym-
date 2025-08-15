// WorkoutPrograms.jsx
import React, { useState, useEffect } from 'react';
import '../style/WorkoutPrograms.css';

export default function WorkoutPrograms() {
  const [workouts, setWorkouts] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // جلب البيانات من localStorage لو موجودة
    const savedWorkouts = JSON.parse(localStorage.getItem('workoutPrograms')) || [];
    setWorkouts(savedWorkouts);
  }, []);

  const handleOpen = (program) => setSelected(program);
  const handleClose = () => setSelected(null);

  return (
    <section className="workout-section">
      <h2 className="section-title">Workout Programs</h2>
      <div className="slider-wrapper">
        <div className="slider-track">
          {workouts.map((program, index) => (
            <div
              key={index}
              className="program-card slider"
              style={{ backgroundImage: `url(${program.image})` }}
            >
              <div className="program-overlay">
                <h3>{program.title}</h3>
              </div>
              <button
                className="start-btn"
                onClick={() => handleOpen(program)}
              >
                Start Today
              </button>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleClose}>×</button>
            <div className="modal-video">
              <video controls src={selected.video} />
            </div>
            <div className="modal-description">
              <h2>{selected.title}</h2>
              <p>{selected.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
