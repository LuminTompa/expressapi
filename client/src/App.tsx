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

  const fetchMockedData = async () => {
    let data = await fetch(url + "mockeddata");
    const games = await data.json();

    setGames([...games]);
  };

  const fetchGames = async () => {
    let data = await fetch(url);
    const gamesFromApi = await data.json();

    setGames([...gamesFromApi]);
  };

  // Varför "e: any" är för att jag inte lyckades hitta något alternativ att hämta värdet med FormEvent istället för any
  const handleFetchGameById = async (e: any) => {
    e.preventDefault();

    let data = await fetch(url + e.currentTarget.gameId.value);
    const gameFromApi = await data.json();

    setGames([gameFromApi]);
  };

  return (
    <div className="App">
      <div className="Cards">
        <div className="Card">
          <button className="logo" onClick={fetchMockedData}>
            Mata biblioteket med testdata
          </button>
        </div>
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
        <div className="Card">
          {/* TODO: Lägg in så att man kan ändra informationen i ett spel och sedan sparas */}
        </div>
        <div className="Card">
          {/* TODO: Lägg in så att man kan ta bort ett spel med id som sedan sparas */}
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
