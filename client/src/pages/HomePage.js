import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    return (
        <div>
            <h1>Welcome to Music and Event Finder</h1>
            <p>Discover your favorite music and upcoming events.</p>
            <Link to="/events">Browse Events</Link>
        </div>
    );
}

export default HomePage;
