import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-info text-dark mb-4 py-3 display-flex align-center header-top">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-dark" to="/">
          <h1 className="m-0" style={{ fontSize: '4rem' }}>
            TuneIn
          </h1>
        </Link>
      </div>
      <div className="container" style={{ position: 'absolute', left: '10px', top: '10px' }}>
        <div>
          {Auth.loggedIn() ? (
            <>
                <Link className="btn btn-lg btn-light m-2" onClick={logout} to="#">
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

export default Header;

