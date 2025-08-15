import React, { useContext, useState } from "react";
import { RecipesContext } from "../data/RecipesContext";
import '../style/AdminRecipes.css';

export default function AdminRecipes() {
  const { recipes, setRecipes } = useContext(RecipesContext);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
  });

  // تحويل الصورة لـ Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewRecipe({ ...newRecipe, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const addRecipe = () => {
    if (!newRecipe.title || !newRecipe.image) return;
    setRecipes([...recipes, newRecipe]);
    setNewRecipe({ title: "", description: "", image: "", category: "" });
  };

  const deleteRecipe = (index) => {
    setRecipes(recipes.filter((_, i) => i !== index));
  };

  return (
    <div className="admin-container">
      <h1> Manage Recipes</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={newRecipe.title}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={newRecipe.description}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, description: e.target.value })
          }
        />

        {/* رفع صورة من الكمبيوتر */}
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <input
          type="text"
          placeholder="Category"
          value={newRecipe.category}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, category: e.target.value })
          }
        />
        <button onClick={addRecipe}>+ Add Recipe</button>
      </div>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((r, index) => (
            <tr key={index}>
              <td>{r.title}</td>
              <td>{r.category}</td>
              <td>
                <img src={r.image} alt="" width="80" />
              </td>
              <td>
                <button onClick={() => deleteRecipe(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
