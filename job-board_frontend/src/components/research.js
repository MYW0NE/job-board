// src/components/research.js
import React, { useState } from 'react';
import './research.css'; // Ensure the CSS is linked

function Research({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery, locationQuery);
  };

  return (
    <div className="research-container">
      <form onSubmit={handleSubmit} className="research-form">
        <div className="input-group">
          <span className="icon-reaserch">&#128269;</span> {/* Search Icon */}
          <input
            type="text"
            placeholder="Intitulé de poste, mots-clés..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="icon-reaserch">&#128392;</span> {/* Location Icon */}
          <input
            type="text"
            placeholder="Ville, département, code postal..."
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="search-button">Rechercher</button>
      </form>
    </div>
  );
}

export default Research;
