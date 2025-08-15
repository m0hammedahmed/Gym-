import React, { createContext, useState, useEffect } from "react";
import img1 from "../data/food.jpg";
import img2 from "../data/111.jpg";
import img3 from "../data/112.jpg";
import img4 from "../data/113.jpg";

export const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  const defaultRecipes = [
    {
      title: "Protein-packed power bowl",
      description:
        "A colorful protein-packed power bowl filled with flavorful, meaty grilled satay tofu and vibrant veggies.",
      image: img1,
      category: "High Protein Recipes",
    },
    {
      title: "Low Carb Pancakes",
      description:
        "Delicious low-carb pancakes made with almond flour and topped with fresh berries.",
      image: img2,
      category: "Low Carb Recipes",
    },
    {
      title: "Dairy-Free Curry",
      description:
        "A warm and spicy coconut milk-based curry that's completely dairy-free.",
      image: img3,
      category: "Dairy Free Recipes",
    },
    {
      title: "Vegetarian Buddha Bowl",
      description:
        "A balanced bowl of grains, greens, and roasted vegetables topped with tahini dressing.",
      image: img4,
      category: "Vegetarian Recipes",
    },
  ];

  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem("recipes");
    return saved ? JSON.parse(saved) : defaultRecipes;
  });

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipesContext.Provider>
  );
}
