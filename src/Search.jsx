import React, { useState } from 'react';

function Search({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch}>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for lyrics" />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;