import React, { useState, useEffect } from "react";
import axios from "axios";

const RecipeSlider = () => {
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    getRecipeCategories();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === categories.length - 1 ? 0 : prev + 1
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [categories.length]);

  const getRecipeCategories = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
      );
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="slider-container">
      <h1>{categories[currentSlide]?.strCategory}</h1>
      <div>
        <img
          src={categories[currentSlide]?.strCategoryThumb}
          alt={categories[currentSlide]?.strCategory}
          id="slider-image"
        />
        <button className="prev" onClick={prevSlide}>
          {" "}
          &#10094;{" "}
        </button>
        <button className="next" onClick={nextSlide}>
          {" "}
          &#10095;{" "}
        </button>
      </div>
    </div>
  );
};

export default RecipeSlider;
