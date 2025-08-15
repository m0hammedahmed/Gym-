import React, { useState, useEffect } from "react";
import defaultImage1 from "../data/gairl.jpg";
import defaultImage2 from "../data/7.jpg";
import defaultImage3 from "../data/8.jpg";
import "../style/AboutEdit.css";

export default function AboutEdit() {
  const defaultAboutData = {
    heroTitle: "get more out of your <br /> <span>Fitness Journey</span>",
    subtext: "Join the community to track your progress",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
    features: [
      {
        img: defaultImage1,
        text: "1000+ Being physically active can improve your brain health, help manage weight.",
      },
      {
        img: defaultImage2,
        text: "Boost your strength and stamina with consistent workouts and nutrition.",
      },
      {
        img: defaultImage3,
        text: "Join a supportive community to stay motivated and achieve your goals.",
      },
    ],
  };

  const [aboutData, setAboutData] = useState(defaultAboutData);

  // تحميل أو حفظ البيانات الافتراضية أول مرة
  useEffect(() => {
    const savedData = localStorage.getItem("aboutData");
    if (savedData) {
      setAboutData(JSON.parse(savedData));
    } else {
      localStorage.setItem("aboutData", JSON.stringify(defaultAboutData));
    }
  }, []);

  // رفع صورة وتحويلها Base64
  const handleImageUpload = (e, idx) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedFeatures = [...aboutData.features];
        updatedFeatures[idx].img = reader.result;
        setAboutData({ ...aboutData, features: updatedFeatures });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("aboutData", JSON.stringify(aboutData));
    alert("✅ About page updated successfully!");
  };

  return (
    <div className="about-edit">
      <h2>Edit About Page</h2>

      <label>Hero Title (HTML allowed)</label>
      <textarea
        value={aboutData.heroTitle}
        onChange={(e) =>
          setAboutData({ ...aboutData, heroTitle: e.target.value })
        }
      />

      <label>Subtext</label>
      <input
        type="text"
        value={aboutData.subtext}
        onChange={(e) =>
          setAboutData({ ...aboutData, subtext: e.target.value })
        }
      />

      <label>Description</label>
      <textarea
        value={aboutData.description}
        onChange={(e) =>
          setAboutData({ ...aboutData, description: e.target.value })
        }
      />

      <h3>Features</h3>
      {aboutData.features.map((feature, idx) => (
        <div className="feature-card-edit" key={idx}>
          <input
            type="text"
            value={feature.text}
            onChange={(e) => {
              const updatedFeatures = [...aboutData.features];
              updatedFeatures[idx].text = e.target.value;
              setAboutData({ ...aboutData, features: updatedFeatures });
            }}
          />
          <div className="image-upload">
            <img
              src={feature.img}
              alt={`feature-${idx}`}
              style={{ width: "100px", borderRadius: "6px", marginTop: "8px" }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, idx)}
            />
          </div>
        </div>
      ))}

      <button onClick={handleSave}>💾 Save Changes</button>
    </div>
  );
}
