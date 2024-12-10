import { useState } from 'react';
import { gameService } from '../services/api';
// import './Game.css';

const Game = () => {
  
  const [gameState, setGameState] = useState({
    gameId: null,
    playerBoard: null,
    computerBoardPreview: null
  });

  const startGame = async () => {
    try {
      const gameData = await gameService.startGame();
      setGameState(gameData);
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const placeShips = async (ships) => {
    try {
      const response = await gameService.placeShips(gameState.gameId, ships);
      // Update game state with placed ships
      setGameState(prevState => ({
        ...prevState,
        playerBoard: response.playerBoard
      }));
    } catch (error) {
      console.error('Error placing ships:', error);
    }
  };

  return (
    <div className="game-container">
      <h4>Battleship Game</h4>
      {!gameState.gameId ? (
        <button onClick={startGame}>Start New Game</button>
      ) : (
        <div className="boards-container">
          <div className="player-board">
            <h2>Your Board</h2>
            {/* Display player board */}
          </div>
          <div className="computer-board">
            <h2>Computer's Board</h2>
            {/* Display computer board */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
