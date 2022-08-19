import express from "express";
import {
  addNewGame,
  addTestData,
  changeGameInfo,
  deleteGameById,
  getAllGames,
  getGameById,
} from "./resources/games/game.controller";

const app = express();

app.use(express.json());

app.get("/api/games", getAllGames);

// TODO: Ta bort nedan endpoint innan detta går i produktion
app.get("/api/games/addtesttolib", addTestData);

app.get("/api/games/:id", getGameById);

app.post("/api/games", addNewGame);

app.put("/api/games/:id", changeGameInfo);

app.delete("/api/games/:id", deleteGameById);

app.listen(3000, () => {
  console.log("Server is now running: http://localhost:3000");
});
