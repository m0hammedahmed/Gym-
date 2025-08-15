import React, { useEffect, useState } from "react";
import "../style/Home.css";
import defaultHeroData from "../data/heroData";
import WorkoutPrograms from "../components/WorkoutPrograms";
import MerchGallery from "../components/MerchGallery";
import RecipesSlider from "../components/RecipesSlider";
import Contact from "../components/connect";
import { RecipesProvider } from "../data/RecipesContext";

export default function Home() {
  const [heroData, setHeroData] = useState(defaultHeroData);

  const [contactContent, setContactContent] = useState({
    titleText: "Contact Us",
    mainText: "Lorem ipsum dolor sit amet...",
    footerText: "Default footer text",
    contactImageSrc: "/default-image.jpg",
    logo: "/default-logo.jpg"
  });

  useEffect(() => {
    const savedHeroData = localStorage.getItem("heroData");
    if (savedHeroData) setHeroData(JSON.parse(savedHeroData));

    const savedContactData = localStorage.getItem("contactData");
    if (savedContactData) setContactContent(JSON.parse(savedContactData));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h2>{heroData.titleSmall}</h2>
          <h1>{heroData.titleLarge}</h1>
          <p>{heroData.description}</p>
          <button className="hero-btn">{heroData.buttonText}</button>
        </div>
        <div className="hero-img">
          <img src={heroData.image} alt="Gym Workout" />
        </div>
      </section>

      <WorkoutPrograms />
      <MerchGallery />

      <RecipesProvider>
        <RecipesSlider />
      </RecipesProvider>

      {/* عرض بيانات Contact المخزنة */}
      <Contact {...contactContent} />
    </>
  );
}
