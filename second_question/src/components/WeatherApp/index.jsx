import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  // Fetch recent searches from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/recent-searches')
      .then(response => {
        setRecentSearches(response.data);  // Set recent searches to state
      })
      .catch(error => {
        console.error('Error fetching recent searches:', error);
      });
  }, []);

  // Handle city input change
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Handle form submission for fetching weather
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!city) {
      alert("Please enter a city name");
      return;
    }

    // Fetch weather data from the backend
    axios.get(`http://localhost:5000/weather?city=${city}`)
      .then(response => {
        setWeather(response.data);  // Update weather data state
        setCity('');  // Clear the input field
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data');
      });
  };

  return (
    <div>
      <h1>Weather App</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
          required
        />
        <button type="submit">Get Weather</button>
      </form>

      {/* Display weather data if available */}
      {weather && (
        <div>
          <h3>Weather in {weather.name}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}

      {/* Recent Searches */}
      <h2>Recent Searches</h2>
      <ul>
        {recentSearches.map((search, index) => (
          <li key={index}>
            {search.city} - {new Date(search.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherApp;
