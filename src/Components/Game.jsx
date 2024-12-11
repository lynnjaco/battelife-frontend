import React, { useState, useEffect } from "react";
import "./Game.css";
import { gameService } from "../services/api";

function Game({
  playerName,
  playerShips,
  computerShips,
  gameData,
  setGameData,
}) {
  const BOARD_SIZE = 10;
  const [turnMessage, setTurnMessage] = useState("Your turn!");

  useEffect(() => {
    const initializeGame = async () => {
        try {
            const gameResponse = await gameService.startGame(playerName, playerShips);
            setGameData(prevData => ({
                ...prevData,
                ...gameResponse
            }));
        } catch (error) {
            console.log('Game initialization error:', error);
        }
    };
    
    initializeGame();
}, []);

  // Convert ship positions to board format
  const createBoard = (ships, isPlayer) => {
    const board = Array(BOARD_SIZE)
      .fill()
      .map(() => Array(BOARD_SIZE).fill(null));

    if (ships) {
      Object.entries(ships).forEach(([shipType, positions]) => {
        positions.forEach((position) => {
          const row = Math.floor(position / BOARD_SIZE);
          const col = position % BOARD_SIZE;
          if (isPlayer || gameData.revealedShips?.includes(position)) {
            board[row][col] = { type: shipType, hit: false };
          }
        });
      });
    }

    return board;
  };

  const handleCellClick = async (position) => {
    console.log('Cell clicked at position:', position);
    console.log('Current game data:', gameData);
    
    if (!gameData.isPlayerTurn) {
        console.log('Not player turn, returning');
        return;
    }
    const gameIDNum = gameData?.gameId;
    console.log('Sending attack with gameId:', gameIDNum);

    setTurnMessage("Attacking...");
    try {
      const playerMove = await gameService.makeMove(gameIDNum, position);
      console.log('Making move with gameId:', gameData.gameId);
        console.log('Move result:', playerMove);
        
        setGameData(prevData => ({
            ...prevData,
            isPlayerTurn: playerMove.isPlayerTurn,
            hits: playerMove.hits,
            revealedShips: playerMove.revealedShips
        }));

        setTurnMessage("Computer is thinking...");
        await new Promise(resolve => setTimeout(resolve, 4000));

        const computerMove = await gameService.getComputerMove(gameData.gameId);
        setGameData(prevData => ({
            ...prevData,
            isPlayerTurn: computerMove.isPlayerTurn
        }));
    } catch (error) {
        console.log('Attack error:', error);
    }
};


  const renderBoard = (ships, isPlayer) => {
    const board = createBoard(ships, isPlayer);

    return (
      <div className={`board ${isPlayer ? "player-board" : "computer-board"}`}>
        {Array(10)
          .fill()
          .map((_, row) => (
            <div key={row} className="board-row">
              {Array(10)
                .fill()
                .map((_, col) => {
                  const position = row * 10 + col + 1; // Convert to 1-100 position
                  const isHit = gameData.hits?.includes(position);
                  const isShip = Object.values(ships || {})
                    .flat()
                    .includes(position);
                  const isRevealed = gameData.revealedShips?.includes(position);

                  return (
                    <div
                      key={position}
                      className={`cell 
                                  ${
                                    isShip && (isPlayer || isRevealed)
                                      ? "ship"
                                      : ""
                                  } 
                                  ${isHit ? "hit" : ""} 
                                  ${!isPlayer ? "computer-cell" : ""}`}
                      onClick={() => !isPlayer && handleCellClick(position)}
                    >
                      {isHit && "💥"}
                      {isPlayer && isShip && !isHit && "🚢"}
                    </div>
                  );
                })}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="game-container">
      <h2>Welcome {playerName}!</h2>
      <div className="turn-indicator">{turnMessage}</div>
      <div className="boards-container">
        <div className="board-section">
          <h3>Your Fleet</h3>
          {renderBoard(playerShips, true)}
        </div>
        <div className="board-section">
          <h3>Enemy Waters</h3>
          {renderBoard(computerShips, false)}
        </div>
      </div>
    </div>
  );
}

export default Game;
