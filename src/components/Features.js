// src/components/Features.js

import React from 'react';
import '../assets/styles/Features.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChargingStation, faLocationDot, faPercent } from '@fortawesome/free-solid-svg-icons';

const Features = () => {
  return (
    <div className="features-section">
      <h2 className="features-header">Why Choose Us?</h2>
      <div className="features-grid">
        <div className="feature-item">
          <FontAwesomeIcon icon={faChargingStation} className="feature-icon" />
          <h3>Fast Charging</h3>
          <p>Get your devices charged quickly with our advanced technology.</p>
        </div>
        <div className="feature-item">
          <FontAwesomeIcon icon={faLocationDot} className="feature-icon" />
          <h3>Convenient Locations</h3>
          <p>Find charging stations at various convenient locations.</p>
        </div>
        <div className="feature-item">
          <FontAwesomeIcon icon={faPercent} className="feature-icon" />
          <h3>Affordable Rates</h3>
          <p>Enjoy competitive pricing with no hidden fees.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
