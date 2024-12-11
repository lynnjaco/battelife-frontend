import React from 'react';
import './Game.css';

function Game({ playerName, playerShips }) {
  return (
    <div className="game-board">
      <h2>Welcome {playerName}!</h2>
      <div className="boards-container">
        <div className="player-board">
          <h3>Your Board</h3>
          <div className="board-grid">
            {[...Array(100)].map((_, index) => (
              <div
                key={index + 1}
                className={`cell ${
                  Object.values(playerShips)
                    .flat()
                    .includes(index + 1)
                    ? "ship"
                    : ""
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="computer-board">
          <h3>Computer's Board</h3>
          <div className="board-grid">
            {[...Array(100)].map((_, index) => (
              <div key={index + 1} className="cell">
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;