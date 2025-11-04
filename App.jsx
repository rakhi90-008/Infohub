import React, { useState } from 'react';
import WeatherModule from './components/WeatherModule';
import CurrencyConverter from './components/CurrencyConverter';
import QuoteGenerator from './components/QuoteGenerator';
export default function App() {
  const [activeTab, setActiveTab] = useState('Weather');
  return (
    <div className="app">
      <h1>🌐 InfoHub</h1>
      <p className="small">A simple SPA combining weather, currency, and quotes.</p>
      <div className="tabs">
        {['Weather', 'Currency', 'Quote'].map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="card">
        {activeTab === 'Weather' && <WeatherModule />}
        {activeTab === 'Currency' && <CurrencyConverter />}
        {activeTab === 'Quote' && <QuoteGenerator />}
      </div>
    </div>
  );
}
