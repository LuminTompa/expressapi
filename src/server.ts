import express from "express";

let gamesLib: string[] = [];

interface Game {
  id: string;
  title: string;
  releaseDate: Date;
  genre: string;
  rating: string;
}

const app = express();

app.use(express.json());

app.get("/api/games", (req, res) => {
  res.status(200).json([]);
});

app.get("/api/games/addtesttolib", (req, res) => {});

app.post("/api/games", (req, res) => {
  res.status(201).json({});
});

app.put("/api/games/:id", (req, res) => {
  res.status(200).json({});
});

app.delete("/api/games/:id", (req, res) => {
  res.status(204).json(null);
});

app.listen(3000, () => {
  console.log("Server is now running: http://localhost:3000");
});
