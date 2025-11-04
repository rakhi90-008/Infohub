import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function WeatherModule() {
  const [city, setCity] = useState('London');
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/weather', { params: { city } });
      setData(res.data.weather);
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to fetch weather.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWeather();
  }, []);
  return (
    <div>
      <div className="controls">
        <input value={city} onChange={e => setCity(e.target.value)} placeholder="Enter city" />
        <button className="primary" onClick={fetchWeather}>Search</button>
      </div>
      {isLoading && <p className="loading">Loading weather...</p>}
      {error && <p className="error">{error}</p>}
      {data && (
        <div className="result">
          <h3>{data.city}</h3>
          <p>{data.description}</p>
          <p>🌡️ {data.temperature_c}°C (Feels like {data.feels_like_c}°C)</p>
          <img src={data.icon} alt="weather icon" />
        </div>
      )}
    </div>
  );
}
