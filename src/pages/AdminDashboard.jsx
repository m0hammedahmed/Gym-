import React, { useState } from "react";
import EditHero from "../components/EditHero";
import WorkoutProgramsEdit from "../components/WorkoutProgramsEdit";
import MerchGalleryEdit from "../components/MerchGalleryEdit";
import AdminRecipes from "../components/AdminRecipes";
import ContentEdit from "../components/ContentEdit";
import AboutEdit from "../components/AboutEdit";
import TransportEdit from "../components/TransportEdit";
import FooterEdit from "../components/FooterEdit";
import NavbarEdit from '../components/NavbarEdit';

import contactImageDefault from "../data/gairl.jpg";
import logoDefault from "../data/logo.jpg";
import { RecipesProvider } from "../data/RecipesContext";

export default function AdminDashboard({ gymName, setGymName }) {
  // State لنصوص الصفحات
  const [heroTitle, setHeroTitle] = useState("Welcome to My Fitness Site");
  const [heroSubtitle, setHeroSubtitle] = useState("Achieve your goals with us");
  const [workoutText, setWorkoutText] = useState("Check out our workout programs");

  // State للصور
  const [heroImage, setHeroImage] = useState("/data/2.jpg");
  const [merchImage, setMerchImage] = useState("/data/3.jpg");

  // State لمحتوى صفحة Contact
  const [contactContent, setContactContent] = useState(() => {
    const saved = localStorage.getItem("contactContent");
    return saved
      ? JSON.parse(saved)
      : {
          titleText: "Contact Us",
          mainText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
          footerText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
          contactImageSrc: contactImageDefault,
          logo: logoDefault,
        };
  });

  const handleSaveContact = (data) => {
    setContactContent(data);
    localStorage.setItem("contactContent", JSON.stringify(data));
  };

  return (
    <>
      {/* تعديل Navbar */}
      <NavbarEdit gymName={gymName} setGymName={setGymName} />

      <RecipesProvider>
        {/* مكونات التعديل */}
        <EditHero title={heroTitle} subtitle={heroSubtitle} image={heroImage} />
        <WorkoutProgramsEdit text={workoutText} />
        <MerchGalleryEdit image={merchImage} />
        <AdminRecipes />

        {/* تعديل محتوى Contact */}
        <ContentEdit onSave={handleSaveContact} />
      </RecipesProvider>

      <AboutEdit />
      <TransportEdit />

      {/* تعديل الفوتر */}
      <FooterEdit />
    </>
  );
}
