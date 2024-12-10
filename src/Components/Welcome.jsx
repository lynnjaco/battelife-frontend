import React, { useState } from 'react'

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
      const response = await fetch('/api/startGame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerName,
          playerShips,
        }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setGameData(data)
        setGameStarted(true)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error starting game:', error)
    }
  }

  console.log(playerName);

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
        
        <div className="ship-placement">
          <h3>Place your ships ({playerShips.length}/5)</h3>
          {/* Add ship placement grid or controls here */}
          <button 
            onClick={() => handleShipPlacement({
              type: 'ship',
              position: { x: 0, y: 0 },
              length: 3,
              orientation: 'horizontal'
            })}
            disabled={playerShips.length >= 5}
          >
            Place Ship
          </button>
        </div>

        <button
          className="start-button"
          onClick={handleStartGame}
          disabled={!playerName || playerShips.length !== 5}
        >
          Start Game
        </button>
      </div>
    </div>
  )
}

export default Welcome
