import React from "react";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";

function Welcome({ playerName, setPlayerName }) {
  const navigate = useNavigate();

  const handleNameSubmit = (event) => {
    event.preventDefault();
    navigate("/setup");
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to Battlelife</h1>
      
      <div className="game-instructions">
        <h2>How to Play</h2>
        <ul>
          <li>Place your ships strategically on the game board</li>
          <li>Take turns firing at your opponent's grid</li>
          <li>First to sink all enemy ships wins!</li>
          <li>Ships available: Health (5), Money (4), Relationships (3), Career (3), Home (2)</li>
        </ul>
      </div>

      <form className="setup-form" onSubmit={handleNameSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          required
        />
        <button 
          className="start-button" 
          type="submit"
          disabled={!playerName.trim()}
        >
          Start Game
        </button>
      </form>
    </div>
  );
}

export default Welcome;
