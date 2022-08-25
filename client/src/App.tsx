import { useState } from "react";
import "./App.css";
import { Game, gamesList } from "./gameData";

const defaultGame = (): Game => ({
  id: "",
  title: "",
  releaseDate: new Date(),
  genre: "",
  rating: "",
});

function App() {
  const [games, setGames] = useState(gamesList);

  const fetchGames = async () => {
    let data = await fetch("http://localhost:3000/api/games");
    const gamesFromApi = await data.json();

    setGames([...gamesFromApi]);
  };

  const handleFetchGameById = async (e: any) => {
    e.preventDefault();

    console.log(e);

    let url = "http://localhost:3000/api/games/" + e.currentTarget.gameId.value;
    let data = await fetch(url);
    const gameFromApi = await data.json();

    setGames([gameFromApi]);
  };

  return (
    <div className="App">
      <div className="Kort">
        <div>
          <button className="logo" onClick={fetchGames}>
            Hämta spelen
          </button>
        </div>
        <div>
          <form onSubmit={handleFetchGameById}>
            <label htmlFor="gameId">Spelets Id</label>
            <input type="number" name="gameId" id="gameId" />

            <button className="logo">Hämta ett spel med ett id</button>
          </form>
        </div>
      </div>
      <div className="Spelen">
        <ul>
          {games.map((game) => (
            <li key={game.id}>{game.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
