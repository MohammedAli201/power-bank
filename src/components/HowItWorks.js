// src/components/HowItWorks.js

import React from 'react';
import '../assets/styles/HowItWorks.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';

import powerBank from '../assets/images/power-bank.png';

const HowItWorks = () => {
  return (
    <div className="how-it-works-section">
      <h2 className="how-it-works-header">How It Works</h2>
      <div className="steps-grid">
        <div className="step-item">
          <FontAwesomeIcon icon={faLocationDot} className="step-icon" />
          <h3>Find a Station</h3>
          <p>Locate the nearest charging station using our app or website.</p>
        </div>
        <div className="step-item">
          <img src={powerBank} alt="Step 2" className="step-img" />
          <h3>Rent a Power Bank</h3>
          <p>Rent a power bank and start charging your device immediately.</p>
        </div>
        <div className="step-item">
          <FontAwesomeIcon icon={faArrowRotateLeft} className="step-icon" />
          <h3>Return When Done</h3>
          <p>Return the power bank to any station when you’re finished.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
