import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/About.css";
import defaultImage1 from "../data/gairl.jpg";
import defaultImage2 from "../data/7.jpg";
import defaultImage3 from "../data/8.jpg";
import Footer from "../components/Footer";

const About = () => {
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState({
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
  });

  // تحميل البيانات من localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("aboutData");
    if (savedData) {
      setAboutData(JSON.parse(savedData));
    }
  }, []);

  return (
    <>
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 dangerouslySetInnerHTML={{ __html: aboutData.heroTitle }} />
            <p className="subtext">{aboutData.subtext}</p>
            <p className="description">{aboutData.description}</p>
            <button className="cta-button" onClick={() => navigate("/login")}>
              Create Account
            </button>
          </div>

          <div className="features">
            {aboutData.features.map((feature, idx) => (
              <div className="feature-card" key={idx}>
                <div className="feature-image">
                  <img src={feature.img} alt={`feature-${idx}`} />
                </div>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
