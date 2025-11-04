require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
const QUOTES = [
  { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
  { text: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt" },
  { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" }
];
app.get('/api/quote', (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    res.json({ quote: QUOTES[randomIndex] });
  } catch (err) {
    res.status(500).json({ error: "Could not fetch quote." });
  }
});
app.get('/api/weather', async (req, res) => {
  const city = req.query.city || process.env.DEFAULT_CITY || "London";
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing OpenWeather API key." });
  }
  try {
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: { q: city, appid: apiKey, units: "metric" }
    });
    const { main, weather, name } = response.data;
    const result = {
      city: name,
      temperature_c: main.temp,
      feels_like_c: main.feels_like,
      description: weather[0].description,
      icon: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
    };
    res.json({ weather: result });
  } catch (err) {
    console.error(err.message);
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ error: `City "${city}" not found.` });
    }
    res.status(500).json({ error: "Could not fetch weather data." });
  }
});
app.get('/api/currency', async (req, res) => {
  const amount = parseFloat(req.query.amount || "1");
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount value." });
  }
  try {
    const response = await axios.get("https://api.exchangerate.host/latest", {
      params: { base: "INR", symbols: "USD,EUR" }
    });
    const { rates } = response.data;
    const converted = {
      USD: (amount * rates.USD).toFixed(4),
      EUR: (amount * rates.EUR).toFixed(4)
    };
    res.json({ amount_in_inr: amount, converted, rates });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Could not fetch currency data." });
  }
});
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.listen(PORT, () => {
  console.log(`InfoHub backend running at http://localhost:${PORT}`);
});
