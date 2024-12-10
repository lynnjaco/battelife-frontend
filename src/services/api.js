import axios from 'axios';

const API_URL = 'http://localhost:3333/api';

console.log('Request URL:', `${API_URL}/game/start`);

export const gameService = {
  startGame: async () => {
    const response = await axios.post(`${API_URL}/game/start`);
    return response.data;
  },

  placeShips: async (gameId, ships) => {
    const response = await axios.post(`${API_URL}/game/place-ships`, {
      gameId,
      ships
    });
    return response.data;
  },

  makeMove: async (gameId, row, col) => {
    const response = await axios.post(`${API_URL}/game/attack`, {
      gameId,
      row,
      col
    });
    return response.data;
  },

  getComputerMove: async (gameId) => {
    const response = await axios.post(`${API_URL}/game/computer-turn`, {
      gameId
    });
    return response.data;
  },

  getGameStats: async (gameId) => {
    const response = await axios.get(`${API_URL}/game/${gameId}/stats`);
    return response.data;
  }
};