import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import WeatherCard from './WeatherCard';
import api from '../services/api';

const WeatherDashboard = () => {
  const { user, logout, getAccessTokenSilently } = useAuth0();
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = await getAccessTokenSilently();
      const data = await api.getWeatherData(token);
      
      setWeatherData(data.data);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    
    // Auto refresh every 5 minutes
    const interval = setInterval(fetchWeatherData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading && weatherData.length === 0) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>⚠️ Error</h2>
        <p>{error}</p>
        <button onClick={fetchWeatherData}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🌤️ Weather Dashboard</h1>
          
          <div className="header-info">
            <div className="user-info">
              <img src={user?.picture} alt="User" className="user-avatar" />
              <span>{user?.name || user?.email}</span>
            </div>
            
            {lastUpdated && (
              <span className="last-updated">
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            
            <div className="header-actions">
              <button 
                onClick={fetchWeatherData} 
                disabled={loading}
                className="refresh-btn"
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
              
              <button 
                onClick={() => logout({ returnTo: window.location.origin })}
                className="logout-btn"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="weather-grid">
          {weatherData.map((city) => (
            <WeatherCard key={city.cityCode} city={city} />
          ))}
        </div>

        {weatherData.length === 0 && !loading && (
          <div className="no-data">
            <p>No weather data available</p>
          </div>
        )}
      </main>

      <footer className="dashboard-footer">
        <p>Weather data from OpenWeatherMap • Updates every 5 minutes</p>
      </footer>
    </div>
  );
};

export default WeatherDashboard;