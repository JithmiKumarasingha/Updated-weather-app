import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="weather-icon">🌤️</div>
        <h1>Weather Dashboard</h1>
        <p>Sign in to view weather information</p>
        
        <button 
          className="login-btn"
          onClick={() => loginWithRedirect()}
        >
          Sign In with Auth0
        </button>
        
        <div className="demo-credentials">
          <p>Demo credentials:</p>
          <code>
            careers@fidenz.com<br />
            Pass#fidenz
          </code>
        </div>
        
        <div className="security-info">
          🔒 Secured with Auth0 & MFA
        </div>
      </div>
    </div>
  );
};

export default Login;