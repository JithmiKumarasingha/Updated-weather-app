const axios = require('axios');
const cache = require('../utils/cache');
const fs = require('fs').promises;
const path = require('path');

class WeatherService {
  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY;
    this.baseUrl = 'http://api.openweathermap.org/data/2.5';
  }

  async getCityCodes() {
    try {
      const citiesPath = path.join(__dirname, '../../cities.json');
      const citiesData = await fs.readFile(citiesPath, 'utf8');
      const cities = JSON.parse(citiesData);
      return cities.map(city => city.id);
    } catch (error) {
      console.error('Error reading cities.json:', error);
      throw new Error('Failed to load city codes');
    }
  }

  async getWeatherData() {
    const cacheKey = 'weather_data';
    
    // Check cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log('Returning cached weather data');
      return cachedData;
    }

    try {
      const cityCodes = await this.getCityCodes();
      const cityIds = cityCodes.slice(0, 20).join(','); // Limit to 20 cities
      
      const response = await axios.get(`${this.baseUrl}/group`, {
        params: {
          id: cityIds,
          units: 'metric',
          appid: this.apiKey
        }
      });

      const weatherData = response.data.list.map(city => ({
        id: city.id,
        name: city.name,
        country: city.sys.country,
        temperature: Math.round(city.main.temp),
        description: city.weather[0].description,
        icon: city.weather[0].icon,
        humidity: city.main.humidity,
        windSpeed: city.wind.speed,
        feelsLike: Math.round(city.main.feels_like)
      }));

      // Cache the data
      cache.set(cacheKey, weatherData);
      console.log('Weather data cached for 5 minutes');
      
      return weatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Failed to fetch weather data');
    }
  }
}

module.exports = new WeatherService();