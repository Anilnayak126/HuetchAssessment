import React, { useEffect, useState } from "react";
import "../../Styles/HeroSlider.css"; 

const HeroSlider = () => {
  const images = [
    "https://img.freepik.com/free-vector/futuristic-shopping-online-landing-page_23-2148533395.jpg?t=st=1737825605~exp=1737829205~hmac=dee6d6d9626478c5feb768ed334d666fcf429a714ba7baeb32d7f59c2bc0b67d&w=826",
    "https://img.freepik.com/free-vector/abstract-sale-landing-page-template_52683-17332.jpg?t=st=1737825634~exp=1737829234~hmac=f3c6eba93f8b9ed14d8492fd996bf3c6ae6677dcab1cf29d6c3e7bea564148b4&w=826",
    "https://img.freepik.com/free-vector/abstract-sale-landing-page-template_52683-17331.jpg?t=st=1737825652~exp=1737829252~hmac=64c7df3030f55c4f576f7b5e8e4949be477557741aa607dce67af4c1c91bd553&w=826",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setCurrentImage(randomIndex);
    }, 3000);

    return () => clearInterval(interval); // Clean up interval
  }, [images]);

  return (
    <div className="hero-slider">
      <div className="slider-image">
        <img src={images[currentImage]} alt="Hero Banner" />
      </div>
      <div className="slider-overlay">
        <h1>Welcome to Our Store</h1>
        <p>Discover amazing products at unbeatable prices.</p>
        <button>Shop Now</button>
      </div>
    </div>
  );
};

export default HeroSlider;
