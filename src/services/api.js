import axios from 'axios';

const API_URL = 'http://localhost:3333/api';

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
    }
};
