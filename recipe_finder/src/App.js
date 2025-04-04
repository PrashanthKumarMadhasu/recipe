import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import RecipeSearch from "./components/RecipeSearch";
import RecipeDetail from "./components/RecipeDetail";
import Favorites from "./components/Favorites";
import "./styles/globalStyles.css";

function App() {
  return (
    <div className="app-container">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
      <Routes>
        <Route path="/" element={<RecipeSearch />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
