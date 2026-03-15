import React, { useEffect, useState } from "react";
import { getWeatherForecast } from "../../api"; 
import "./WeatherForecast.css";
import Navbar from "../Navbar/navbar";
import Footer from "../footer/footer";

const WeatherForecast = ({ user }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await getWeatherForecast(latitude, longitude, user._id);
          setWeather(response.data);
        } catch (err) {
          setError("Failed to fetch weather data.");
          console.error(err);
        }
      },
      () => {
        setError("Permission to access location was denied.");
      }
    );
  }, [user]);

  return (
    <div>
      <Navbar/>
    <div className="weather-container">
      {error && <div className="error">{error}</div>}
      {!weather && !error && <div>Loading weather data...</div>}

      {weather && (
        <div className="weather-info">
          <h3>Weather Forecast for {weather.location}</h3>
          <p><strong>Temperature:</strong> {weather.temperature}°C</p>
          <p><strong>Condition:</strong> {weather.condition}</p>
          <p><strong>Humidity:</strong> {weather.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.windSpeed} m/s</p>
          <p><strong>Gardening Tip:</strong> {weather.tip}</p>
        </div>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default WeatherForecast;
