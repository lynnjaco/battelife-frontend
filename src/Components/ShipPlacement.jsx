import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./ShipPlacement.css";

const ships = {
  Health: { size: 5, color: "#FF6B6B" },
  Money: { size: 4, color: "#4ECDC4" },
  Relationships: { size: 3, color: "#45B7D1" },
  Career: { size: 3, color: "#96CEB4" },
  Home: { size: 2, color: "#FFEEAD" }
};

const ShipPlacement = () => {
  const [rotation, setRotation] = useState("horizontal");
  const [selectedShip, setSelectedShip] = useState(null);
  const [placedShips, setPlacedShips] = useState({
    Health: [],
    Money: [],
    Relationships: [],
    Career: [],
    Home: []
  });

  const createBoard = () => {
    const board = [];
    for (let i = 1; i <= 100; i++) {
      board.push(i);
    }
    return board;
  };

  const isValidPlacement = (shipName, startPosition) => {
    const size = ships[shipName].size;
    const positions = [];
    
    for (let i = 0; i < size; i++) {
      if (rotation === "horizontal") {
        const position = startPosition + i;
        // Check if ship goes off board horizontally
        if (Math.floor((startPosition - 1) / 10) !== Math.floor((position - 1) / 10)) {
          return false;
        }
        positions.push(position);
      } else {
        const position = startPosition + (i * 10);
        // Check if ship goes off board vertically
        if (position > 100) {
          return false;
        }
        positions.push(position);
      }
    }

    // Check if positions overlap with other ships
    const allPlacedPositions = Object.values(placedShips).flat();
    return !positions.some(pos => allPlacedPositions.includes(pos));
  };

  const handleCellClick = (position) => {
    if (!selectedShip) return;

    if (isValidPlacement(selectedShip, position)) {
      const size = ships[selectedShip].size;
      const newPositions = [];

      for (let i = 0; i < size; i++) {
        if (rotation === "horizontal") {
          newPositions.push(position + i);
        } else {
          newPositions.push(position + (i * 10));
        }
      }

      setPlacedShips(prev => ({
        ...prev,
        [selectedShip]: newPositions
      }));
      setSelectedShip(null);
    }
  };

  const handleConfirmPlacement = () => {
    const playerShips = {
      playerShips: placedShips
    };
    console.log("Ships ready to send:", playerShips);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="ship-placement-container">
        <div className="controls">
          <button onClick={() => setRotation(r => r === "horizontal" ? "vertical" : "horizontal")}>
            Rotate Ship ({rotation})
          </button>
          <div className="ship-selection">
            {Object.entries(ships).map(([shipName, shipData]) => (
              <div
                key={shipName}
                className={`ship-option ${selectedShip === shipName ? 'selected' : ''}`}
                style={{ backgroundColor: shipData.color }}
                onClick={() => setSelectedShip(shipName)}
              >
                {shipName} ({shipData.size})
              </div>
            ))}
          </div>
        </div>

        <div className="game-board">
          {createBoard().map((cellNumber) => (
            <div
              key={cellNumber}
              className={`cell ${
                Object.entries(placedShips).some(([ship, positions]) => 
                  positions.includes(cellNumber)
                ) ? 'occupied' : ''
              }`}
              onClick={() => handleCellClick(cellNumber)}
            >
              {cellNumber}
            </div>
          ))}
        </div>

        <button 
          className="confirm-button"
          onClick={handleConfirmPlacement}
          disabled={Object.values(placedShips).some(ship => ship.length === 0)}
        >
          Confirm Placement
        </button>
      </div>
    </DndProvider>
  );
};

export default ShipPlacement;
