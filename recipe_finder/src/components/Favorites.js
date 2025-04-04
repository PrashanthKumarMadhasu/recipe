import React, { useState, useEffect } from "react";
import axios from "axios";

const Favorites = () => {
  const [favoriteDetails, setFavoriteDetails] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Get saved favorites (ids and names) from server
        const response = await axios.get("http://localhost:5000/favorites");
        const favorites = response.data;

        // For each favorite, fetch full meal details by ID
        const detailRequests = favorites.map((fav) =>
          axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${fav.id}`)
        );

        const detailResponses = await Promise.all(detailRequests);
        const fullDetails = detailResponses.map((res) => res.data.meals[0]);
        setFavoriteDetails(fullDetails);
      } catch (error) {
        console.error("Error fetching favorites with details:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>Favorites</h2>
      {favoriteDetails.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {favoriteDetails.map((recipe) => (
            <li key={recipe.idMeal} style={{ marginBottom: "20px" }}>
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                style={{ width: "300px", borderRadius: "8px" }}
              />
              <p>{recipe.strMeal}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
