import React, { useState } from 'react';
import Search from './Search';
import SearchResult from './SearchResult'; 

function MainSection() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    fetch(`https://api.genius.com/search?q=${encodeURIComponent(query)}&access_token=9xRbA32eXhmEx1y8PiT6ilBROAS6qe-6ymKJmCetD5KRXKtXYcngRt8uJh0k3C1O`)
      .then(response => response.json())
      .then(data => setSearchResults(data.response.hits))
      .catch(error => console.error("Error fetching search results:", error));
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <SearchResult results={searchResults} />
    </div>
  );
}

export default MainSection;
