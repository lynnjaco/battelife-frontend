import React from "react";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";

function Welcome({ playerData, setPlayerData }) {
  const navigate = useNavigate();

  const handleNameSubmit = (event) => {
    event.preventDefault();
    navigate("/setup");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPlayerData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  return (
    <div className="welcome-container">
      <h1 className="hinge">Welcome to Battlelife</h1>
      
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
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={playerData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="hometown">Hometown:</label>
          <input
            type="text"
            id="hometown"
            name="hometown"
            placeholder="Enter your hometown"
            value={playerData.hometown}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Enter your age"
            value={playerData.age}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={playerData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="occupation">Occupation:</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            placeholder="Enter your occupation"
            value={playerData.occupation}
            onChange={handleChange}
            required
          />
        </div>

        <button 
          className="start-button" 
          type="submit"
          disabled={!playerData.name.trim()}
        >
          Start Game
        </button>
      </form>
    </div>
  );
}

export default Welcome;
