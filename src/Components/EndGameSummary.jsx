import { useState, useEffect } from "react";
import { gameService } from "../services/api";
import "./EndGameSummary.css"

function EndGameSummary({gameData}) {

    const [summary, setSummary] = useState(null)
    const {playerName, playerStats} = gameData

    useEffect(() => {
        const getNewSummary = async() => {
            let newSummary = await gameService.getEndGameSummary(gameData)
            setSummary(newSummary.summary)
        } 

        getNewSummary()
    },[])


    const StatBar = ({label, value}) => (
        <div className="stat-bar">
            <label>{label}</label>
            <div className="progress-bar">
                <div 
                    className="progress" 
                    style={{width: `${value}%`, backgroundColor: value > 50 ? '#4CAF50' : '#ff6b6b'}}
                />
            </div>
            <span>{value}%</span>
        </div>
    )

    return (
        <div className="end-game-summary">
            <h2>{playerName}'s Final Report</h2>
            
            <div className="stats-container">
                <StatBar label="Morale" value={playerStats.morale} />
                <StatBar label="Health" value={playerStats.health} />
                <StatBar label="Financial Status" value={playerStats.money} />
                <StatBar label="Relationships" value={playerStats.relationships} />
                <StatBar label="Career" value={playerStats.career} />
                <StatBar label="Home Life" value={playerStats.home} />
            </div>

            <div className="narrative-summary">
                <h3>Mission Debrief</h3>
                <p>{summary}</p>
            </div>
        </div>
    );
}

export default EndGameSummary;