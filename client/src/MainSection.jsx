import React, { useState } from 'react';
import Search from './Search';
import SearchResult from './SearchResult'; 

function MainSection() {
  const [searchResults, setSearchResults] = useState([]);

  const [secondSearchResults, setSecondSearchResults] = useState([]);

  const handleLyricsSearch = (query) => {
    fetch(`https://api.genius.com/search?q=${encodeURIComponent(query)}&access_token=9xRbA32eXhmEx1y8PiT6ilBROAS6qe-6ymKJmCetD5KRXKtXYcngRt8uJh0k3C1O`)
      .then(response => response.json())
      .then(data => setSearchResults(data.response.hits))
      .catch(error => console.error("Error fetching search results:", error));
  };

  const handleEventsSearch = (query) => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&keyword=${encodeURIComponent(artist)}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => setSecondSearchResults(data._embedded.events)) 
    .catch(error => console.error("Error fetching search results:", error));
  };

  return (
    <div>
      <h1>Search Lyrics</h1>
      <Search onSearch={handleLyricsSearch} />
      <SearchResult results={searchResults} />

      <h1>Search Events</h1>
      <Search onSearch={handleEventsSearch} />
      <SearchResult results={secondSearchResults} />
    </div>
  );
}

export default MainSection;