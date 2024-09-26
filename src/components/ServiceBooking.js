


import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import '../assets/styles/ServiceBooking.css';

const ServiceBooking = ({ completedForm }) => {
  const navigate = useNavigate();
  const { stationId } = useParams();
  const [selectHrs, setSelectHrs] = useState(20);
  const costper20Min = 0.25;
  const constper30Min = 0.35;
  const constper40Min = 0.40;
  let costperHr = 0.50;
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [amountprMin, setAmount] = useState(0.30);

  const { handleUserInputInfo, setCurrentStep, onAgreement, agreement } = useAuth();

  const handleSelectHour = (hour) => {
    console.log(hour);
    switch (hour) {
      case 20:
        setSelectHrs(hour);
        costperHr = costper20Min;
        setAmount(0.30);
        break;
      case 30:
        setSelectHrs(hour);
        costperHr = constper30Min;
        setAmount(0.35);
        break;
      case 40:
        setSelectHrs(hour);
        costperHr = constper40Min;
        setAmount(0.40);
        break;
      case 1:
        setSelectHrs(hour);
        costperHr = 0.50;
        setAmount(0.50);
        break;
      case 2:
        setSelectHrs(hour);
        costperHr = 1.50;
        setAmount(1.50);
        break;
      default:
        setSelectHrs(20);
        costperHr = 0.30;
    }
    console.log(costperHr);
  };

  const handlePhoneChange = (e) => {
    const phoneInput = e.target.value;
    if (/^(061\d{7}|077\d{7}|\+25277\d{7})$/.test(phoneInput)) {
      setPhoneError('');
    } else {
      setPhoneError('Phone number must be in the format 061xxxxxxx, 077xxxxxxx, or +25277xxxxxxx');
    }
    setPhone(phoneInput);
  };

  const handleAgreementChange = (e) => {
    onAgreement(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneError || !/^(061\d{7}|077\d{7}|\+25277\d{7})$/.test(phone)) {
      setPhoneError('Please enter a valid phone number');
      return;
    }
    if (!agreement) {
      alert('You must agree to the terms and conditions to proceed.');
      return;
    }
    const amount = amountprMin;

    let formattedPhone = phone;
    if (phone.startsWith("06")) {
      formattedPhone = phone.replace("06", "2526");
    } else if (phone.startsWith("07")) {
      formattedPhone = phone.replace("07", "2527");
    }

    completedForm();

    handleUserInputInfo({ selectHrs, amount, phones: formattedPhone, stationId });
    setCurrentStep(1);
    navigate("/BookingConfirmation");
  };

  return (
    <div className="options-container">
      <h2>Choose Duration</h2>
      <div className="hour-selector">
        {[20, 30, 40, 1, 2].map((hour) => (
          <div
            key={hour}
            className={`hour-option ${selectHrs === hour ? 'selected' : ''}`}
            onClick={() => handleSelectHour(hour)}
          >
            {hour >= 20 && hour <= 40 ? `${hour} min` : `${hour} hr${hour > 1 ? 's' : ''}`}
          </div>
        ))}
      </div>
      <div className="amount">
        <h3>Amount to Pay:</h3>
        <p>${(amountprMin).toFixed(2)}</p>
      </div>
      <div className="phone-input">
        <h3>Phone Number</h3>
        <input
          className="phone-input-box"
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="061xxxxxxx, 077xxxxxxx, or +25277xxxxxxx"
        />
        {phoneError && <p className="error">{phoneError}</p>}
      </div>
      <div style={{ margin: '20px 0' }}>
        <label>
          <input
            type="checkbox"
            checked={agreement}
            onChange={handleAgreementChange}
          />
          {' '} I agree to the <a href="/terms-conditions" style={{ textDecoration: 'underline', color: 'blue' }}>terms and conditions</a>.
        </label>
      </div>
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={!agreement}
        style={{
          backgroundColor: agreement ? '#007bff' : '#cccccc',
          color: 'white',
          cursor: agreement ? 'pointer' : 'not-allowed'
        }}
      >
        Submit
      </button>
      <div className="contact-info">
        <h3>Contact Us</h3>
        <p>Phone: 0611234567/0616251068/0616586503</p>
        <p>Email: danabpowerbank@gmail.com</p>
      </div>
    </div>
  );
};

export default ServiceBooking;
