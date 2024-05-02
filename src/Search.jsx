import React, { useState } from 'react';
import './Search.css';

function Search({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search for lyrics" 
        className="search-input" 
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
}

export default Search;
