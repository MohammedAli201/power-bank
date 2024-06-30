import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DisplayOptions from './components/ServiceBooking';
import DisplayResults from './components/BookingConfirmation';
import EvcPayment from './services/PaymentProcessing';
import Dashboard from './components/Dashboard';
import Footer from './components/page/Footer';
import MainPage from './components/page/MainPage';
import StationInfo from './components/StationInfo';
import ProfileBusiness from './components/page/ProfileBusiness';
import heroImage from './assets/images/logo_bedrift.jpg';
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
          <img src={heroImage} className="logo" alt="logo" />
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
                <Link to="/DisplayOptions" className="nav-link" onClick={closeMenu}>Display Options</Link>
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
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/DisplayOptions" element={<DisplayOptions completedForm={completedForm} />} />
            <Route path="/DisplayResults" element={completForm && <DisplayResults conformationForm={conformationForm} />} />
            <Route path="/EvcPayment" element={conformation && <EvcPayment />} />
            <Route path="/StationInfo" element={<StationInfo />} />
            <Route path="/ProfileBusiness" element={<ProfileBusiness />} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
