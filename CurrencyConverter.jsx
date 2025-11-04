import React, { useState } from 'react';
import axios from 'axios';
export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const convert = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/currency', { params: { amount } });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Conversion failed.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="controls">
        <input
          type="number"
          min="0"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Enter amount in INR"
        />
        <button className="primary" onClick={convert}>Convert</button>
      </div>
      {isLoading && <p className="loading">Converting...</p>}
      {error && <p className="error">{error}</p>}
      {result && (
        <div className="result">
          <p>INR: <b>{result.amount_in_inr}</b></p>
          <p>USD: <b>{result.converted.USD}</b></p>
          <p>EUR: <b>{result.converted.EUR}</b></p>
        </div>
      )}
    </div>
  );
}
