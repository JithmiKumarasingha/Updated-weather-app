const express = require('express');
const weatherService = require('../services/weatherService');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const weatherData = await weatherService.getWeatherData();
    res.json({
      success: true,
      data: weatherData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Weather route error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch weather data'
    });
  }
});

module.exports = router;