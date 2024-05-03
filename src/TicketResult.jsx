import React from 'react';

function TicketResult({ results }) {
  if (!results || results.length === 0) {
    return <div>No events found</div>; // Displays when no results are found
  }

  return (
    <div className="ticket-results" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
      {results.map((event, index) => (
        <div className="ticket-result" key={event.id || index} style={{ marginRight: '20px', marginBottom: '20px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.8)', position: 'relative' }}>
          <div className="event-info" style={{ display: 'flex', alignItems: 'center' }}>
            {/* Ensure there's at least one image and use the first one */}
            <img src={event.images[0].url} alt={event.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            <div className="details">
              {/* Use the event name and handle clicks to open event URL in a new tab */}
              <h3 onClick={() => window.open(event.url, '_blank')} style={{ cursor: 'pointer', fontSize: '14px', marginBottom: '5px', color: '#333', transition: 'color 0.3s' }}>{event.name}</h3>
              {/* Display venue name if available */}
              <p style={{ fontSize: '12px', margin: 0, color: '#333', transition: 'color 0.3s' }}>
                Venue: {event._embedded?.venues[0]?.name || 'Unknown venue'}
              </p>
            </div>
          </div>
          <div style={{ marginTop: '10px', textAlign: 'right' }}>
            {/* Placeholder for any actionable button or link */}
            <button className="favorite-button" style={{ padding: '5px', fontSize: '14px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
              💙
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TicketResult;
