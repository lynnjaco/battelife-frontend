import { useState } from "react";
import "./App.css";
import Welcome from "./Components/Welcome";
import ShipPlacement from "./Components/ShipPlacement";
import Game from "./Components/Game";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EndGameSummary from "./Components/EndGameSummary";

function App() {
  const [playerData, setPlayerData] = useState({
    name: "",
    hometown: "",
    age: 0,
    gender: "",
    occupation: ""
  });
  const [playerShips, setPlayerShips] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [gameId, setGameId] = useState(null);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/game" element={<Game />} />
          <Route
            path="/"
            element={
              <Welcome playerData={playerData} setPlayerData={setPlayerData} />
            }
          />
          <Route
            path="/setup"
            element={
              <ShipPlacement
                playerData={playerData}
                playerShips={playerShips}
                setPlayerShips={setPlayerShips}
                gameId={gameId}
                setGameId={setGameId}
                gameData={gameData}
                setGameData={setGameData}
              />
            }
          />
          <Route
            path="/game/:gameId"
            element={
              <Game
                playerData={playerData}
                playerShips={playerShips}
                gameData={gameData}
                setGameData={setGameData}
              />
            }
          />{" "}
          <Route
            path="/summary"
            element={<EndGameSummary gameData={gameData} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
