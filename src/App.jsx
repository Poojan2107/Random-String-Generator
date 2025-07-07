
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const generateRandomString = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

function App() {
  const [length, setLength] = useState(12);
  const [randomString, setRandomString] = useState('');
  const [copied, setCopied] = useState(false);

  const handleLengthChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setLength(val ? Math.max(1, Math.min(64, Number(val))) : '');
  };

  const generate = useCallback(() => {
    if (!length || isNaN(length)) return '';
    return generateRandomString(length);
  }, [length]);

  useEffect(() => {
    setRandomString(generate());
    setCopied(false);
  }, [length, generate]);

  const handleCopy = async () => {
    if (randomString) {
      await navigator.clipboard.writeText(randomString);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="container">
      <div className="card random-string-card">
        <h2>Random String Generator</h2>
        <div className="input-group">
          <label htmlFor="length">Length</label>
          <input
            id="length"
            type="number"
            min="1"
            max="64"
            value={length}
            onChange={handleLengthChange}
            className="input"
          />
        </div>
        <div className="result-area">
          <span className="result-string">{randomString}</span>
        </div>
        <div className="button-group">
          <button className="btn" onClick={() => setRandomString(generate())}>Regenerate</button>
          <button className="btn copy-btn" onClick={handleCopy} disabled={!randomString}>
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
      </div>
      <footer className="footer">Made By<span role="img" aria-label="sparkles">✨</span> by Poojan Shrivastav</footer>
    </div>
  );
}

export default App;
