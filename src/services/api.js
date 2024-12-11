import axios from 'axios';

const API_URL = 'http://localhost:3333';

console.log('Request URL:', `${API_URL}/game/start`);

export const gameService = {
    startGame: async (playerName, playerShips) => {
        const response = await axios.post(`${API_URL}/game/start`, {
            playerName,
            playerShips
        });
        return response.data;
    },

    placeShips: async (gameId, playerShips) => {
        const response = await axios.post(`${API_URL}/game/place-ships`, {
            gameId,
            playerShips
        });
        return response.data;
    },

    makeMove: async (gameId, position) => {
        const response = await axios.post(`${API_URL}/game/attack`, {
            gameId,
            position
        });
        return response.data;
    },

    getComputerMove: async (gameId) => {
        const response = await axios.post(`${API_URL}/game/computer-attack`, {
            gameId
        });
        return response.data;
    },

    getGameStats: async (gameId) => {
        const response = await axios.get(`${API_URL}/game/${gameId}/stats`);
        return response.data;
    },

    getUserHitScenario: async (user) => {
        const response = await axios.post(`${API_URL}/claude/generate-user-hit-scenario`,{
            user
        })
        return response.data
    },

    getCpuHitScenario: async (user) => {
        const response = await axios.post(`${API_URL}/claude/generate-cpu-hit-scenario`,{
            user
        })
        return response.data
    },

    getEndGameSummary: async (finalStats) => {
        try {
            const response = await axios.post(`${API_URL}/claude/generate-summary`, {
                finalStats
            });
            return response.data;
        } catch (error) {
            console.error('Error response:', error.response.data);
            throw error;
        }
    }
};
