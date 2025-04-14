import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ onSearchResult }) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: query,
          format: 'json'
        }
      });

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        onSearchResult([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert('Place not found');
      }
    } catch (error) {
      console.error(error);
      alert('Error searching place');
    }
  };

  return (
    <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a place"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
