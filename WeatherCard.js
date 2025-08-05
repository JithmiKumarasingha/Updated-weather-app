import React from 'react';

const WeatherCard = ({ city }) => {
  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('clear') || desc.includes('sun')) return '☀️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
    return '🌤️';
  };

  const getTemperatureColor = (temp) => {
    if (temp < 0) return '#0066cc';
    if (temp < 10) return '#0099ff';
    if (temp < 20) return '#00cc66';
    if (temp < 30) return '#ffcc00';
    return '#ff6600';
  };

  return (
    <div className="weather-card">
      <div className="card-header">
        <h3>{city.name}</h3>
        <span className="weather-icon">{getWeatherIcon(city.description)}</span>
      </div>
      
      <div className="temperature">
        <span 
          className="temp-value"
          style={{ color: getTemperatureColor(city.temperature) }}
        >
          {Math.round(city.temperature)}°C
        </span>
      </div>
      
      <div className="description">
        {city.description}
      </div>
    </div>
  );
};

export default WeatherCard;