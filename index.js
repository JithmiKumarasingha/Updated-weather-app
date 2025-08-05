import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './styles/App.css';

const domain = process.env.REACT_APP_AUTH0_DOMAIN || 'your-domain.auth0.com';
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || 'your-client-id';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE
    }}
  >
    <App />
  </Auth0Provider>
);