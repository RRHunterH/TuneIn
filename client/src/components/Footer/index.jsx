import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className='footer-text'> 2024 TuneIn</div>
    </footer>
  );
};

export default Footer;

