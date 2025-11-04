# 🌐 InfoHub

**InfoHub** is a full-stack web application (React + Node.js + Express) that integrates three everyday utilities into a single-page interface:
- 🌤 **Real-Time Weather Display**
- 💱 **Currency Converter (INR to USD/EUR)**
- 💬 **Motivational Quote Generator**

This project demonstrates fundamental full-stack development skills — API integration, front-end state management, and seamless communication between the client and server.

---

## 🚀 Project Overview

| Module | Description |
|--------|--------------|
| **Weather Module** | Displays current weather for a selected city using OpenWeather API. |
| **Currency Converter** | Converts an entered INR amount into USD and EUR using ExchangeRate API. |
| **Quote Generator** | Displays a random motivational quote from local or external APIs. |

---

## 🏗️ Project Structure

```
InfoHub-Challenge/
├── client/                      # React Frontend (Vite)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherModule.jsx
│   │   │   ├── CurrencyConverter.jsx
│   │   │   └── QuoteGenerator.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── server/                      # Node.js + Express Backend
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── setup_instructions.txt
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/InfoHub-Challenge.git
cd InfoHub-Challenge
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file inside the **server** folder and add:
```
OPENWEATHER_API_KEY=your_openweather_api_key
DEFAULT_CITY=London
PORT=3001
```

Then run:
```bash
npm run dev
```
Server will start at: **http://localhost:3001**

---

### 3. Frontend Setup
```bash
cd ../client
npm install
npm run dev
```

Frontend runs by default at: **http://localhost:5173**

> **Note:**  
> The frontend is configured to proxy API requests to the backend at port 3001 via `"proxy"` in `client/package.json`.

---

## 🧩 API Endpoints

### `/api/weather?city=London`
Fetches real-time weather data for a given city.

**Response Example:**
```json
{
  "weather": {
    "city": "London",
    "temperature_c": 20.4,
    "feels_like_c": 19.7,
    "description": "scattered clouds",
    "icon": "https://openweathermap.org/img/wn/04d@2x.png"
  }
}
```

---

### `/api/currency?amount=100`
Converts INR into USD and EUR using ExchangeRate API.

**Response Example:**
```json
{
  "amount_in_inr": 100,
  "converted": { "USD": "1.20", "EUR": "1.10" },
  "rates": { "USD": 0.012, "EUR": 0.011 }
}
```

---

### `/api/quote`
Returns a random motivational quote.

**Response Example:**
```json
{
  "quote": {
    "text": "Believe you can and you’re halfway there.",
    "author": "Theodore Roosevelt"
  }
}
```

---

## 🧠 Key Concepts Demonstrated

- React hooks: `useState`, `useEffect` for state & side-effects  
- Axios for HTTP requests  
- Express routing & middleware setup  
- Environment variable management using `.env`  
- Error handling in async API calls  
- SPA navigation using conditional rendering  
- Responsive UI styling with CSS  

---

## 📦 Deployment Tips

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Serve the build via Express** (optional)
   Move the `/client/dist` folder to `/server/public` and add in `server.js`:
   ```js
   app.use(express.static('public'));
   ```

3. **Deploy** using platforms like **Vercel**, **Render**, or **Netlify + Render**.

---

## 🧑‍💻 Author
**Marikanti Rakesh**

Full-stack Developer | React & Node.js Enthusiast

---

## 🪪 License
This project is licensed under the **MIT License**.  
Feel free to use, modify, and share for educational or personal purposes.
