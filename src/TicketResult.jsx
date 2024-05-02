import React from 'react';

function TicketResult({ results }) {
  return (
    <div className="ticket-results">
      <h2>Ticket Results</h2>
      <ul>
        {results.map((event, index) => (
          <li key={index}>
            <div>{event.name}</div>
            <div>{event.dates.start.localDate}</div>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketResult;
