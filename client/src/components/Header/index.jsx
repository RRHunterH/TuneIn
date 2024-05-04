import React from 'react';

function Header() {
  return (
    <header>
      <div className="header-top">
      </div>
      <div className="header-nav">
        <nav>
          <ul>
            <li><a href="#lyrics-search">Lyrics Search</a></li>
            <li>|</li>
            <li><a href="#live-search">Search Live Music</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
