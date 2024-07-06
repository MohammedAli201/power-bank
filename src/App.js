import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ServiceBooking from './components/ServiceBooking';
import BookingConfirmation from './components/BookingConfirmation';
import PaymentProcessing from './services/PaymentProcessing';
import Dashboard from './components/Dashboard';
import Footer from './components/page/Footer';
import MainPage from './components/page/MainPage';
import StationInfo from './components/StationInfo';
import ProfileBusiness from './components/page/ProfileBusiness';
import VideoUpload from './components/page/upload';
import Succes from './components/page/succes';
// import heroImage from './assets/images/logo_bedrift.jpg';
import heroImage from './assets/images/logo_svg.svg';
import './App.css';


const App = () => {
  const [completForm, setcompletForm] = useState(false);
  const [conformation, setConformation] = useState(false);

  const completedForm = (data) => {
    setcompletForm(true);
  };

  const conformationForm = (data) => {
    setConformation(true);
  };

  const closeMenu = () => {
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
      navToggle.checked = false;
    }
  };

  return (
    <div className='App'>
      <Router>
        <header className="header">
          <img src={heroImage} height={200}     className="logo" alt="logo" />
          <nav className="navbar">
            <input type="checkbox" id="nav-toggle" className="nav-toggle" />
            <label htmlFor="nav-toggle" className="nav-toggle-label">
              <span></span>
            </label>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/ServiceBooking" className="nav-link" onClick={closeMenu}>ServiceBooking</Link>
              </li>
              <li className="nav-item">
                <Link to="/Dashboard" className="nav-link" onClick={closeMenu}>Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/StationInfo" className="nav-link" onClick={closeMenu}>Station Info</Link>
              </li>
              <li className="nav-item">
                <Link to="/ProfileBusiness" className="nav-link" onClick={closeMenu}>Profile Business</Link>
              </li>

              <li className="nav-item">
                <Link to="/upload" className="nav-link" onClick={closeMenu}>Upload</Link>
              </li>


            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/ServiceBooking" element={<ServiceBooking completedForm={completedForm} />} />
            <Route path="/BookingConfirmation" element={completForm && <BookingConfirmation conformationForm={conformationForm} />} />
            <Route path="/PaymentProcessing" element={conformation && <PaymentProcessing />} />
            <Route path="/StationInfo" element={<StationInfo />} />
            <Route path="/ProfileBusiness" element={<ProfileBusiness />} />
            <Route path="/upload" element={<VideoUpload />} />
            <Route path="/Succes" element={< Succes/>} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
