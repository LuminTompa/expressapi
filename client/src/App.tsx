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

const url: string = "http://localhost:3000/api/games/";

function App() {
  const [games, setGames] = useState(gamesList);

  const fetchGames = async () => {
    let data = await fetch(url);
    const gamesFromApi = await data.json();

    setGames([...gamesFromApi]);
  };

  const handleFetchGameById = async (e: any) => {
    e.preventDefault();

    console.log(e);

    let data = await fetch(url + e.currentTarget.gameId.value);
    const gameFromApi = await data.json();

    setGames([gameFromApi]);
  };

  return (
    <div className="App">
      <div className="Cards">
        <div className="Card">
          <button className="logo" onClick={fetchGames}>
            Hämta spelen
          </button>
        </div>
        <div className="Card">
          <form onSubmit={handleFetchGameById}>
            <label htmlFor="gameId">Spelets Id</label>
            <input type="number" name="gameId" id="gameId" />

            <button className="logo">Hämta ett spel med ett id</button>
          </form>
        </div>
        <div className="Card">
          {/* TODO: Lägg in så att man kan skapa ett nytt spel som läggs till i biblioteket */}
        </div>
      </div>
      <div className="Games">
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              {game.id} - {game.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
