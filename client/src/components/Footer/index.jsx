import React from 'react';
import './Footer.css';
import '../../assets/background.gif'

function Footer() {
  return (
    <footer className="footer">
      <div>
      <p>TuneIn | Created by:</p>
      </div>
      
      <div className='names'>
        <a href='https://github.com/RRHunterH' 
          target="_blank" >Hunter H.</a>

        <a href='https://github.com/FisherK19'
          target="_blank" >Kristie F.</a>

        <a href='https://github.com/tmaraki' 
          target="_blank" >Toshie A.</a>

        <a href='https://github.com/ECiarabellini'
          target="_blank" >Emily Ciarabellini</a>

        <a href='https://github.com/KatelynnMM'
          target="_blank" >Katelynn M.</a>

        <a href='https://github.com/ebcoleman'
          target="_blank" >Emily Coleman</a>

        <a href='https://github.com/austin109lew'
          target="_blank" >Austin L.</a>
      </div> 
          
    </footer>
  );
}

export default Footer;
