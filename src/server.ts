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
  if (gamesLib.length <= 0) {
    res.status(404).json("The library is empty");
  } else {
    res.status(200).json(gamesLib);
  }
});

// TODO: Ta bort nedan endpoint innan detta går i produktion
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

app.get("/api/games/:id", (req, res) => {
  let game = gamesLib.find((g) => g.id === req.params.id);

  if (game === undefined) {
    res.status(404).json("A game does not exist with that id");
  } else {
    res.status(200).json(game);
  }
});

app.post("/api/games", (req, res) => {
  // TODO: Lägga till validering
  let newGame: Game = {
    id: "123",
    title: `${req.body.title}`,
    releaseDate: req.body.releaseDate,
    genre: `${req.body.genre}`,
    rating: `${req.body.rating}`,
  };
  gamesLib.push(newGame);
  res.status(201).json(newGame);
});

app.put("/api/games/:id", (req, res) => {
  if (gamesLib.some((g) => g.id === req.params.id)) {
    gamesLib.forEach((g) => {
      if (g.id === req.params.id) {
        g.title = req.body.title;
        g.releaseDate = req.body.releaseDate;
        g.genre = req.body.genre;
        g.rating = req.body.rating;
        res.status(200).json(g);
      }
    });
  } else {
    res.status(404).json("A game does not exist with that id");
  }
});

app.delete("/api/games/:id", (req, res) => {
  let gameFoundAndDeleted: boolean = false;

  gamesLib.forEach((g) => {
    if (g.id === req.params.id) {
      gamesLib.splice(gamesLib.indexOf(g), 1);

      gameFoundAndDeleted = true;
    }
  });

  if (!gameFoundAndDeleted)
    res.status(404).json("A game does not exist with that id");
  else res.status(204).json(null);
});

app.listen(3000, () => {
  console.log("Server is now running: http://localhost:3000");
});
