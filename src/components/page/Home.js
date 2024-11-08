import React from "react";
// import heroImage from "../../assets/images/PowerBank-hero-section.png";
import heroImage from "../../assets/images/new_powerbank_image.jpg";

// import logo from "../../assets/images/Power.png";
import "../../assets/styles/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleRentNow = (e) => {
    e.preventDefault();
    navigate("/ServiceBooking");
  }

  return (
    <div className="home-section">
      <div className="hero-section">
        {/* <div className="logo-overlay">
          <img src={logo} alt="Logo" />
        </div> */}
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-text-wrapper">
              <span className="title-text">Is your mobile running out of</span>
              <h1 className="hero-text-battery">BATTERY?</h1>
              <span className="hero-text-p">
                Rent a POWER RENT near you and charge your mobile phone, tablet, or whatever you need, no matter where you are in Sevilla.
              </span>
            </div>
            <button className="cta-button" onClick={handleRentNow}>Rent Now !</button>
          </div>
          <div className="hero-image">
            <img src={heroImage} alt="PowerBank" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
