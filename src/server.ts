import express from "express";

let gamesLib: Game[] = [];

interface Game {
  id: string;
  title: string;
  releaseDate: Date;
  genre: string;
  rating: string;
}
const app = express();

app.use(express.json());

app.get("/api/games", (_, res) => {
  res.status(200).json(gamesLib);
});

app.get("/api/games/addtesttolib", (_, res) => {
  if (gamesLib.length > 0) {
    res
      .status(403)
      .json(
        "The game library is not empty, therefore test data won't be added"
      );
  } else {
    for (let i = 0; i < 5; i++) {
      let game: Game = {
        id: `${i}`,
        title: `TomIsKing${i}`,
        releaseDate: new Date(),
        genre: "Action",
        rating: "M",
      };

      gamesLib.push(game);
    }
    res.status(200).json(gamesLib);
  }
});

app.post("/api/games", (req, res) => {
  gamesLib.push(req.body);
  res.status(201).json(req.body);
});

app.put("/api/games/:id", (req, res) => {
  let game = gamesLib.find((g) => g.id === req.params.id);

  if (game === undefined) {
    res.status(404).json("A game does not exist with that id");
  } else {
    res.status(200).json(game);
  }
});

app.delete("/api/games/:id", (req, res) => {
  res.status(204).json(null);
});

app.listen(3000, () => {
  console.log("Server is now running: http://localhost:3000");
});
