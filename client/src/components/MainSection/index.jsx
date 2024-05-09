import React, { useState } from 'react';
import Search from '../Search';
import SearchResult from '../Search/SearchResult'; 
import TicketResult from '../Search/TicketResult';
import './MainSection.css'

function MainSection() {
  const [searchResults, setSearchResults] = useState([]);
  const [secondSearchResults, setSecondSearchResults] = useState([]);

  const handleLyricsSearch = (query) => {
    fetch(`https://api.genius.com/search?q=${encodeURIComponent(query)}&access_token=9xRbA32eXhmEx1y8PiT6ilBROAS6qe-6ymKJmCetD5KRXKtXYcngRt8uJh0k3C1O`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Lyrics search results:', data);
        setSearchResults(data.response.hits);
      })
      .catch(error => console.error("Error fetching lyrics search results:", error));
  };

  const handleEventsSearch = (query) => {
    const apiKey = 'OUGxCGP7zcUXvIN0sDQpOzHAdlJLM2ID';
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&keyword=${encodeURIComponent(query)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Events search results:', data);
        if (data._embedded && data._embedded.events) {
          setSecondSearchResults(data._embedded.events);
        } else {
          console.error('No events found in response:', data);
          setSecondSearchResults([]);
        }
      })
      .catch(error => console.error("Error fetching events search results:", error));
  };

  return (
    <div className='main-section'>
      <h1>Search Lyrics</h1>
      <Search onSearch={handleLyricsSearch} />
      <SearchResult results={searchResults} />

      <h1>Search Events</h1>
      <Search onSearch={handleEventsSearch} />
      <TicketResult results={secondSearchResults} />
    </div>
  );
}

export default MainSection;