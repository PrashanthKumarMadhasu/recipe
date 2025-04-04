import React from "react";
import { Link } from "react-router-dom";
import "../styles/globalStyles.css";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      <Link to={`/recipe/${recipe.idMeal}`}>View Details</Link>
    </div>
  );
};

export default RecipeCard;
