# Weather App

Modern, responsive weather UI built with HTML, CSS, and JavaScript. The app runs in demo mode with mock data so it works without an API key.

## Design
Clean glass-panel layout with a bold hero header, large temperature readout, and a compact forecast grid. The theme toggle switches between dark and light palettes using CSS variables for fast visual updates.

### UI Highlights
- Centered layout with a hero headline and concise subtitle
- Card-style current conditions with a prominent temperature
- Four-tile forecast grid for quick scanning
- Single-source theme variables for easy restyling

### Icons
- ☀️ Clear / Sunny
- ☁️ Cloudy
- 🌧️ Rain
- ❄️ Snow

## Features
- City search
- Current conditions
- Short-term forecast
- Light and dark theme toggle
- Responsive layout

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript

## Getting Started
1. Open `index.html` in a browser.
2. Enter a city name (for example, Kathmandu).
3. Click "Get Weather".

## Project Structure
- `index.html` - Main page and layout
- `style.css` - Styling and theme variables
- `spript.js` - App logic and demo data

## Demo Mode
This project uses mock weather data (no real API calls). You can replace the mock functions in `spript.js` with a real API integration when ready.

## Customize
- Update colors in `style.css` under the `:root` and `body[data-theme="light"]` blocks.
- Add more cities in the `MOCK_CITIES` object in `spript.js`.
