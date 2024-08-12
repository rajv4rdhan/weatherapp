import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';
import WeatherComponent from './data'
import CountryNameConverter from './countryCode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureHigh, faDroplet, faWind, faGaugeHigh, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';



function Weather() {
  const apikey = "bccc0b0f5d203ba416fd79befdcdb299";
  const [city, setCity] = useState('Delhi');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (cityName) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apikey}`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Error fetching weather data');
      setWeatherData(null);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(city.trim());
  };

  useEffect(() => {
    fetchData('Delhi');
  }, []);

  return (
    
    <div className="container">
      <div className="weather__header">
        <form className="weather__search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            className="weather__searchform"
            value={city}
            onChange={handleInputChange}
          />
          <button type="submit">
  <FontAwesomeIcon icon={faMagnifyingGlass} />
</button>
        </form>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="weather__body">
          <h1 className="weather__city">
            {weatherData.name}, <CountryNameConverter countryCode={weatherData.sys.country} />
          </h1>
          <div className="weather__datetime">
          <WeatherComponent weatherData={weatherData} size="2x"  />
            </div>
            <div className="weather__forecast">{weatherData.weather[0].main}</div>
            <div class="weather__icon">
            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} />
            </div>

          <div className="weather__minmax">
            <p>Min: {weatherData.main.temp_min}&#176;C</p>
            <p>Max: {weatherData.main.temp_max}&#176;C</p>
          </div>
          <div className="weather__info">
            <div className="weather__card">
            <FontAwesomeIcon icon={faTemperatureHigh} size="2x" />
              <div className="icon__data">
                <p>Real Feel</p>
                <p className="weather__realfeel">{weatherData.main.feels_like}&#176;C</p>
              </div>
            </div>
            <div className="weather__card">
            <FontAwesomeIcon icon={faDroplet} size="2x" />
              <div className="icon__data">
                <p>Humidity</p>
                <p className="weather__humidity">{weatherData.main.humidity}%</p>
              </div>
            </div>
            <div className="weather__card">
            <FontAwesomeIcon icon={faWind} size="2x" />
              <div className="icon__data">
                <p>Wind</p>
                <p className="weather__wind">{weatherData.wind.speed} m/s</p>
              </div>
            </div>
            <div className="weather__card">
            <FontAwesomeIcon icon={faGaugeHigh} size="2x" />
              <div className="icon__data">
                <p>Pressure</p>
                <p className="weather__pressure">{weatherData.main.pressure} hPa</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
