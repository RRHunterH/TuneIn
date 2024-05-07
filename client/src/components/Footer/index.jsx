import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="footer">
      {location.pathname !== '/' && (
        <button className="btn btn-dark" onClick={() => navigate(-1)}>
          &larr; Go Back
        </button>
      )}
      <h4>2024 TuneIn</h4>
    </footer>
  );
};

export default Footer;

