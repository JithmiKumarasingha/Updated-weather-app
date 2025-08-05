import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './components/Login';
import WeatherDashboard from './components/WeatherDashboard';

function App() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="App">
      {isAuthenticated ? <WeatherDashboard /> : <Login />}
    </div>
  );
}

export default App;