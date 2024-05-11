import React from 'react';
import FavoriteButton from './FavoriteButton';

function SearchResult({ results }) {
  return (
    <div className="search-results" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
      {results.map(result => (
        <div className="search-result" key={result.result.id} style={{ marginRight: '20px', marginBottom: '20px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.8)', position: 'relative' }}>
          <div className="song-info" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={result.result.header_image_thumbnail_url} alt={result.result.full_title} className="cover-art" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <div className="details">
              <h3 onClick={() => window.open(result.result.url, '_blank')} style={{ cursor: 'pointer', fontSize: '14px', marginBottom: '5px', color: '#333', transition: 'color 0.3s' }}>{result.result.title}</h3>
              <p onClick={() => window.open(result.result.primary_artist.url, '_blank')} style={{ cursor: 'pointer', fontSize: '12px', margin: 0, color: '#333', transition: 'color 0.3s' }}>By: {result.result.primary_artist.name}</p>
            </div>
          </div>
          <div style={{ marginTop: '10px', textAlign: 'right' }}>
            <FavoriteButton songId={result.result.id} /> {/* Pass necessary props */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResult;
