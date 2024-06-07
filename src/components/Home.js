import React from "react";

import Footer from "./Footer";
import heroImage from "../assets/images/PowerBank-hero-section.png";
import logo from "../assets/images/Power.png"; // Your logo image
import "../assets/styles/Home.css";

const Home = () => {
  return (
    <div className="home-section">

      <div className="hero-section">
        <div className="logo-overlay">
          <img src={logo} alt="Logo" style={{ width: '200px', height: '300px' }} />
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <span className="title_text">Is your mobile running out of</span>
            <h1 className="hero-text-battery">BATTERY  ? </h1>
            <span className="hero-text-p">Rent a POWER RENT near you and charge your mobile phone ,  <br/> tablet, or whatever you need, no matter where you are in Sevilla</span>
         
    
            <button className="cta-button">Learn More</button>
          </div>
          <div className="hero-image">
            <img src={heroImage} alt="PowerBank" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
