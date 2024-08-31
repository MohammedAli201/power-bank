import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import '../assets/styles/ServiceBooking.css';

const ServiceBooking = ({ completedForm }) => {
  const navigate = useNavigate();
  const { stationId } = useParams();


  const [selectHrs, setSelectHrs] = useState(1);
  const costperHr = 0.5;
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const { handleUserInputInfo, setCurrentStep } = useAuth();

  const handleSelectHour = (hour) => {
    setSelectHrs(hour);
  };

  const handlePhoneChange = (e) => {
    const phoneInput = e.target.value;
    if (/^061\d{7}$/.test(phoneInput)) {
      setPhoneError('');
    } else {
      setPhoneError('Phone number must be in the format 061xxxxxxx');
    }
    setPhone(phoneInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneError || !/^061\d{7}$/.test(phone)) {
      setPhoneError('Please enter a valid phone number');
      return;
    }
    const amount = selectHrs * costperHr;
    // const hrToMs = 3600000 * 0.00833;
    const hrToMs = 30000;
    completedForm();
    const phones = phone.replace("06", "2526");
    handleUserInputInfo({ selectHrs, amount, phones, hrToMs, stationId });
    setCurrentStep(1);
    navigate("/BookingConfirmation");
  };

  return (
    <div className="options-container">
      <h2>Choose Hours</h2>
      <div className="hour-selector">
        {[1, 2, 3, 4, 5].map((hour) => (
          <div
            key={hour}
            className={`hour-option ${selectHrs === hour ? 'selected' : ''}`}
            onClick={() => handleSelectHour(hour)}
          >
            {hour}
          </div>
        ))}
      </div>
      <div className="amount">
        <h3>Amount to Pay:</h3>
        <p>${(selectHrs * costperHr).toFixed(2)}</p>
      </div>
      <div className="phone-input">
        <h3>Phone Number</h3>
        <input
          className="phone-input-box"
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="061xxxxxxx"
        />
        {phoneError && <p className="error">{phoneError}</p>}
      </div>
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
      <div className="contact-info">
        <h3>Contact Us</h3>
        <p>Phone: 0611234567</p>
        <p>Email: example@mail.com</p>
      </div>
    </div>
  );
};

export default ServiceBooking;
