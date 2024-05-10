// index.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import HeaderImage from '../../assets/Tunein logo.png';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
   
  <header>
    <div>
      <Link to="/">
        {/* Logo */}
        <img
          src={HeaderImage}
          alt="Tunein logo"
          style={{
            height: '200px', 
            position: 'absolute',
            top: '40px',
            left: '50%', 
            transform: 'translateX(-50%)',
          }}
        />
      </Link>
      <Link to="/">
        <h1 style={{ fontSize: '4rem', marginLeft: '10px' }}>
          <span style={{display: 'inline-block' }}></span>
        </h1>
      </Link>
    </div>
    <div className="container" style={{ position: 'absolute', left: '10px', top: '10px' }}>
      <div>
        {Auth.loggedIn() ? (
          <>
              <Link className="header-text" to="/profile">
              View My Profile
            </Link>
            <span className="header-text"> | </span>
            <Link className="header-text" onClick={logout} to="#">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link className="header-text" to="/login">
              Login
            </Link>
            <span className="header-text"> | </span>
            <Link className="header-text" to="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  </header>
  );
};

function App() {
  return (
    <div>
      <Header /> 
    </div>
  );
}

export default App;
