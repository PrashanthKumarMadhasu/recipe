import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/globalStyles.css";
import { FaHeart } from "react-icons/fa6";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavourite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Fetch the recipe
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const meal = response.data.meals[0];
        setRecipe(meal);

        // Now fetch favorites
        const favResponse = await axios.get("http://localhost:5000/favorites");
        const favorites = favResponse.data;

        // Check if this meal is already in favorites
        const alreadyFav = favorites.some((fav) => fav.id === meal.idMeal);
        setIsFavourite(alreadyFav);
      } catch (error) {
        console.error("Error fetching recipe or favorites:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleFavoriteClick = async () => {
    const newFavState = !isFavorite;
    setIsFavourite(newFavState);

    try {
      if (newFavState) {
        // Add to favorites
        await axios.post("http://localhost:5000/favorites", {
          id: recipe.idMeal,
          name: recipe.strMeal,
        });
      } else {
        // Remove from favorites
        await axios.delete(`http://localhost:5000/favorites/${recipe.idMeal}`);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail">
      <div className="header-container">
        <h2>{recipe.strMeal}</h2>
        <FaHeart
          id="heart-icon"
          onClick={handleFavoriteClick}
          style={{ color: isFavorite ? "red" : "black", cursor: "pointer" }}
        />
      </div>

      <img src={recipe.strMealThumb} alt={recipe.strMeal} id="recipe-img" />
      <p id="recipe-info">{recipe.strInstructions}</p>
    </div>
  );
};

export default RecipeDetail;
