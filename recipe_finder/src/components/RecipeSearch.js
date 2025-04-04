import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import "../styles/globalStyles.css";
import RecipeSlider from "./RecipeSlider";

const RecipeSearch = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [query]);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      setSuggestions(response.data.meals || []);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      setRecipes(response.data.meals || []);
      setSuggestions([]); 
      setShowDropdown(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSuggestionClick = (mealName) => {
    setQuery(mealName);
    setShowDropdown(false);
    handleSearch();
  };

  return (
    <div>
      <div>
        <RecipeSlider />
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)} 
        />
        <button onClick={handleSearch}>Search</button>

        {/* Suggestions Dropdown */}
        {showDropdown && suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((suggestion) => (
              <li key={suggestion.idMeal} onMouseDown={() => handleSuggestionClick(suggestion.strMeal)}>
                {suggestion.strMeal}
              </li>
            ))}
          </ul>
        )}

        {/* Display search results */}
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeSearch;
