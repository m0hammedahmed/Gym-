import React from "react";
import 
import gymImage from "../data/food.jpg"; // Replace with actual image path
import productImage from "../data/food.jpg"; // Example product image

const ProductCard = ({ title, price, image, isGym }) => {
  return (
    <div className={`product-card ${isGym ? "gym-card" : ""}`}>
      <div className="image-container">
        <img src={image} alt={title} />
      </div>
      <div className="product-info">
        <h3>{title}</h3>
        <p>${price}</p>
        <button>Buy Now</button>
      </div>
    </div>
  );
};

const ProductPage = () => {
  return (
    <section className="product-page">

      <h2 className="page-title">Our Products</h2>
      <div className="product-grid">
      
        <ProductCard title="Gym Pack Pro" price="49.99" image={gymImage} isGym={true} />
        <ProductCard title="Protein Shake" price="19.99" image={productImage} />
        <ProductCard title="Yoga Mat" price="25.00" image={productImage} />
        <ProductCard title="Smart Watch" price="99.00" image={productImage} />
      </div>
    </section>
  );
};

export default ProductPage;
