import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function QuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/quote');
      setQuote(res.data.quote);
    } catch {
      setQuote({ text: "Unable to fetch quote.", author: "" });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQuote();
  }, []);
  return (
    <div className="center">
      <button className="primary" onClick={fetchQuote}>New Quote</button>
      {isLoading && <p className="loading">Loading quote...</p>}
      {quote && (
        <div className="result">
          <p>"{quote.text}"</p>
          <p className="small">— {quote.author || "Unknown"}</p>
        </div>
      )}
    </div>
  );
}
