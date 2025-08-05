# Weather Information Application

A secure weather application with Auth0 authentication that displays weather information from OpenWeatherMap API.

## Features

- Secure authentication with Auth0
- Multi-factor authentication (MFA) via email
- Weather data caching (5-minute expiration)
- Responsive design for desktop and mobile
- Real-time weather information from OpenWeatherMap

## Prerequisites

- Node.js 16+
- Auth0 account
- OpenWeatherMap API key

## Setup Instructions

### 1. Clone Repository

git clone <repository-url>
cd weather-app


### 2. Backend Setup

cd backend
npm install
cp .env.example .env
# Update .env with your credentials
npm run dev


### 3. Frontend Setup

cd frontend
npm install
cp .env.example .env
# Update .env with your Auth0 credentials
npm start


### 4. Environment Variables

#### Backend (.env)
- PORT=5000
- OPENWEATHER_API_KEY=your_api_key
- AUTH0_DOMAIN=your_domain.auth0.com
- AUTH0_AUDIENCE=your_api_identifier

#### Frontentend
- PORT=3000
- REACT_APP_AUTH0_DOMAIN=dev-4ofpsrm6xu3gydtf.us.auth0.com
- REACT_APP_AUTH0_CLIENT_ID=TDiGu73Lal6NYqxmwylRRGyJ6hxPIasD
- REACT_APP_AUTH0_AUDIENCE=https://weather-app-api
- REACT_APP_API_BASE_URL=http://localhost:5000/api

