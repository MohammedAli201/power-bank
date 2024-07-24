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
            <h3>Our services</h3>
            <p>
              DANAB POWER BANK waa shirkad bixisa adeega Powerbank renting ah oo qof laga kiraynayo si mobile-kisa uu ugu charger karesto ama uu u dabeesto.
            </p>
          </div>
          <div className="footer-column">
            <h3>USEFUL LINKS</h3>
            <ul>
              <li><a href="https://www.facebook.com/drmuxsincm">Facebook</a></li>
              <li><a href="https://x.com/home?lang-en=">Twitter</a></li>
              {/* <li><a href="https://www.facebook.com/drmuxsincm">Vue</a></li>
              <li><a href="https://www.facebook.com/drmuxsincm">Laravel</a></li> */}
            </ul>
          </div>
          <div className="footer-column">
            <h3>MORE DETAILS</h3>
            <ul>
              <li><a href="/price">Pricing</a></li>
             
              <li><a href="/help">Help</a></li>
              <li><a href="/ProfileBusiness">Profile Business</a></li>

            </ul>
          </div>
          <div className="footer-column">
            <h3>CONTACT</h3>
            <p>Muqdisho, Xamar Weyne, Somalia</p>
            <p><a href="mailto:PowerBank@gmail.com">danabpowerbank@gmail.com</a></p>
            <p><a href="tel:+252619311148">+252619311148</a></p>
          
          </div>
        </div>
        <div className="footer-row">
          <div className="footer-column">
            <p>&copy; 2024 - All rights reserved</p>
          </div>
        </div>
        <div className="footer-social">
          <a href="https://www.facebook.com" aria-label="Facebook"><FaFacebook /></a>
          <a href="https://x.com/home?lang-en=" aria-label="Twitter"><FaTwitter /></a>
          <a href="https://www.instagram.com" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://www.linkedin.com/in/mohamedali-309752135/" aria-label="LinkedIn"><FaLinkedin /></a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
