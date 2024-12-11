import React, { useState } from 'react'
import "./Welcome.css"
import ShipPlacement from './ShipPlacement'

function Welcome() {
  const [playerName, setPlayerName] = useState('')
  const [playerShips, setPlayerShips] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [gameData, setGameData] = useState(null)

  const handleShipPlacement = (ship) => {
    if (playerShips.length < 5) {
      setPlayerShips([...playerShips, ship])
    }
  }
  const handleStartGame = async () => {
    try {
      console.log('Sending game data:', { playerName, playerShips })
      
      const response = await fetch('/api/game/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerName,
          playerShips,
        }),
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)
      
      if (response.ok) {
        setGameData(data)
        setGameStarted(true)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.log('Full error:', error)
      console.error('Error starting game:', error)
    }
  }
  // console.log(playerName);
  // console.log(gameData);

  if (gameStarted && gameData) {
    return (
      <div className="game-board">
        <h2>Welcome {playerName}!</h2>
        <div className="boards-container">
          <div className="player-board">
            <h3>Your Board</h3>
            {gameData.playerBoard.map((row, i) => (
              <div key={i} className="board-row">
                {row.map((cell, j) => (
                  <div key={`${i}-${j}`} className="cell">
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="computer-board">
            <h3>Computer's Board</h3>
            {gameData.computerBoardPreview.map((row, i) => (
              <div key={i} className="board-row">
                {row.map((cell, j) => (
                  <div key={`${i}-${j}`} className="cell">
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="welcome-container">
      <h1>Welcome to Battlelife</h1>
      <div className="setup-form">
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />

        <button
          className="start-button"
          onClick={handleStartGame}
        >
          Start Game
        </button>
      </div>

      <ShipPlacement onPlaceShips={handleShipPlacement} />

  
    </div>
  )
}

export default Welcome
