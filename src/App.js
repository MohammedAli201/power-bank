import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/AuthProvider';
import AuthProvider from './hooks/AuthProvider';
import ServiceBooking from './components/ServiceBooking';
import BookingConfirmation from './components/BookingConfirmation';
import PaymentProcessing from './services/PaymentProcessing';
import Dashboard from './components/Dashboard';
import Footer from './components/page/Footer';
import MainPage from './components/page/MainPage';
import Login from './components/page/login';
import StationInfo from './components/StationInfo';
import ProfileBusiness from './components/page/ProfileBusiness';
// import VideoUpload from './components/page/upload';
import Succes from './components/page/succes';
import PrivateRoute from './components/PrivateRoute';
import heroImage from './assets/images/logo_svg.svg';
import './App.css';
// import Protected from "./components/protected"
import StepGuard from './hooks/StepGuard';
import Helps from './components/page/helps';
import Price from './components/page/Price';
import RentalAgreementPage from './components/Term_conditions/RentalAgreementPage ';

const App = () => {
  const [completForm, setcompletForm] = useState(false);
  const [conformation, setConformation] = useState(false);
  const {  setNavigate } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate); // Set navigate function in context
  }, [navigate, setNavigate]);

  const completedForm = (data) => {
    setcompletForm(true);
  };

  const conformationForm = (data) => {
    setConformation(true);
    console.log('conformationForm', conformation);
  };

  const closeMenu = () => {
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
      navToggle.checked = false;
    }
  };

  return (
    <div className="App">
      <header className="header">
        <img src={heroImage} height={200} className="logo" alt="logo" />
        <nav className="navbar">
          <input type="checkbox" id="nav-toggle" className="nav-toggle" />
          <label htmlFor="nav-toggle" className="nav-toggle-label">
            <span></span>
          </label>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link home-link" onClick={closeMenu}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/ServiceBooking" className="nav-link service-link" onClick={closeMenu}>ServiceBooking</Link>
            </li>
            <li className="nav-item">
              <Link to="/Dashboard" className="nav-link dashboard-link" onClick={closeMenu}>Dashboard</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Dashboard" element={<Dashboard />} />

          <Route element={<PrivateRoute />}>
            <Route path="/Dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<StepGuard requiredStep={0} />}>
            <Route path="/ServiceBooking/:stationId?" element={<ServiceBooking completedForm={completedForm} />} />
          </Route>
          <Route element={<StepGuard requiredStep={1} />}>
            <Route path="/BookingConfirmation" element={completForm && <BookingConfirmation conformationForm={conformationForm} />} />
          </Route>
          <Route element={<StepGuard requiredStep={2} />}>
            <Route path="/PaymentProcessing" element={conformation && <PaymentProcessing />} />
          </Route>
          <Route element={<StepGuard requiredStep={3} />}>
            <Route path="/Succes" element={<Succes />} />
          </Route>
          <Route path="/ProfileBusiness" element={<ProfileBusiness />} />
          <Route element={<PrivateRoute />}>
            <Route path="/StationInfo" element={<StationInfo />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/help" element={<Helps />} />
          <Route path="/price" element={<Price />} />
          <Route path="/terms-conditions" element={<RentalAgreementPage />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const AppWrapper = () => (
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);

export default AppWrapper;
