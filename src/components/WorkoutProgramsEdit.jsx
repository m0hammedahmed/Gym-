// WorkoutProgramsEdit.jsx
import React, { useState, useEffect } from 'react';
import '../style/WorkoutProgramsEdit.css';

export default function WorkoutProgramsEdit() {
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', image: '', video: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('workoutPrograms')) || [];
    setWorkouts(saved);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // رفع صورة من الكمبيوتر
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // رفع فيديو من الكمبيوتر
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, video: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrEdit = () => {
    let updated = [...workouts];
    if (editIndex !== null) {
      updated[editIndex] = form; // تعديل
    } else {
      updated.push(form); // إضافة جديدة
    }
    setWorkouts(updated);
    localStorage.setItem('workoutPrograms', JSON.stringify(updated));
    setForm({ title: '', description: '', image: '', video: '' });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setForm(workouts[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = workouts.filter((_, i) => i !== index);
    setWorkouts(updated);
    localStorage.setItem('workoutPrograms', JSON.stringify(updated));
  };

  return (
    <div className="edit-workout-container">
      <h2>Edit Workout Programs</h2>

      <div className="workout-form">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        
        {/* رفع صورة */}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
{form.image && <img src={form.image} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', margin: '5px 0' }} />}

        {/* رفع فيديو */}
        <input type="file" accept="video/*" onChange={handleVideoUpload} />
        {form.video && <video src={form.video} controls style={{ width: '60px', height: '50px', margin: '5px 0' }} />}

        <button onClick={handleAddOrEdit}>{editIndex !== null ? 'Update' : 'Add'}</button>
      </div>

      <div className="program-cards">
        {workouts.map((w, i) => (
          <div key={i} className="program-card">
            {w.image && <img src={w.image} alt={w.title} />}
            <h3>{w.title}</h3>
            <p>{w.description}</p>
            {w.video && <video src={w.video} controls style={{ width: '100%' }} />}
            <div className="card-actions" style={{ backgroundColor: '#323232' }}>
              <button onClick={() => handleEdit(i)}>Edit</button>
              <button onClick={() => handleDelete(i)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
