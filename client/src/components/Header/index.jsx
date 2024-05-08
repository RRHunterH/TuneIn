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
   
<header className="bg-info text-dark mb-4 py-3 display-flex align-center header-top">
  <div className="container flex-column justify-center align-center text-center position-relative">
    <Link className="text-dark" to="/">
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
    <Link className="text-dark" to="/">
  <h1 className="m-0" style={{ fontSize: '4rem', marginLeft: '10px' }}>
    <span style={{display: 'inline-block' }}></span>
  </h1>
</Link>



      </div>
      <div className="container" style={{ position: 'absolute', left: '10px', top: '10px' }}>
        <div>
          {Auth.loggedIn() ? (
            <>
                <Link className="btn btn-lg btn-primary m-2" to="/profile">
                <strong>View My Profile</strong>
              </Link>
              <span className="mx-2"> | </span>
              <Link className="btn btn-lg btn-light m-2" onClick={logout} to="#">
                <strong>Logout</strong>
              </Link>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                <strong>Login</strong>
              </Link>
              <span className="mx-2"> | </span>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
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
