import React from 'react';
// This page has root of component/page/Footer.js
//while the footer.css is in the assets/styles/Footer.css
import '../../assets/styles/Footer.css';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer-content">
        <div className="footer-row">
          <div className="footer-column">
            <h3>COMPANY NAME</h3>
            <p>
              Organize your footer content. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit.
            </p>
          </div>
          <div className="footer-column">
            <h3>PRODUCTS</h3>
            <ul>
              <li><a href="https://www.facebook.com/drmuxsincm">Angular</a></li>
              <li><a href="https://www.facebook.com/drmuxsincm">React</a></li>
              <li><a href="https://www.facebook.com/drmuxsincm">Vue</a></li>
              <li><a href="https://www.facebook.com/drmuxsincm">Laravel</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>USEFUL LINKS</h3>
            <ul>
              <li><a href="https://www.facebook.com/drmuxsincm">Pricing</a></li>
              <li><a href="https://www.facebook.com/drmuxsincm">Settings</a></li>
              <li><a href="https://www.facebook.com/drmuxsincm">Orders</a></li>
              <li><a href="https://www.facebook.com/drmuxsincm">Help</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>CONTACT</h3>
            <p>Muqdisho, Xamar Weyne, Somalia</p>
            <p><a href="mailto:PowerBank@gmail.com">PowerBank@gmail.com</a></p>
            <p><a href="tel:+252615738865">+252615738865</a></p>
            <p><a href="tel:+25261575654">+25261575654</a></p>
          </div>
        </div>
        <div className="footer-row">
          <div className="footer-column">
            <p>&copy; 2024 - All rights reserved</p>
          </div>
        </div>
        <div className="footer-social">
          <a href="https://www.facebook.com" aria-label="Facebook"><FaFacebook /></a>
          <a href="https://www.twitter.com" aria-label="Twitter"><FaTwitter /></a>
          <a href="https://www.instagram.com" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://www.linkedin.com" aria-label="LinkedIn"><FaLinkedin /></a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
