import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = {
  // Get weather data
  getWeatherData: async (token) => {
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  // Clear cache
  clearCache: async (token) => {
    const response = await axios.delete(`${API_BASE_URL}/weather/cache`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data;
  }
};

export default api;