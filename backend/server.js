// server/server.js
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors({
  origin: [
    "http://localhost:3000", // for local development
    "https://recipe-sand-xi.vercel.app" // deployed frontend on vercel
  ],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}));

app.use(express.json());

const filePath = "./favorites.json";

const readFavorites = () => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath));
};

app.post("/favorites", (req, res) => {
  const favorites = readFavorites();
  const newFavorite = req.body;

  if (!favorites.find(fav => fav.id === newFavorite.id)) {
    favorites.push(newFavorite);
    fs.writeFileSync(filePath, JSON.stringify(favorites, null, 2));
  }
  res.status(200).send("Added to favorites");
});

app.delete("/favorites/:id", (req, res) => {
  let favorites = readFavorites();
  const idToRemove = req.params.id;
  favorites = favorites.filter(fav => fav.id !== idToRemove);
  fs.writeFileSync(filePath, JSON.stringify(favorites, null, 2));
  res.status(200).send("Removed from favorites");
});

app.get("/favorites", (req, res) => {
    const favorites = readFavorites();
    res.json(favorites);
  });
  
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
