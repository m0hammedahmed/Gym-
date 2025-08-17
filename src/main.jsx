import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ⬅️ استدعاء BrowserRouter
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/Gym-/">   {/* ⬅️ حط هنا الباس نيم بتاعك */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
