import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import '../assets/styles/DisplayOptions.css';

const DisplayOptions = ({ completedForm }) => {
  const navigate = useNavigate();
  const [selectHrs, setSelectHrs] = useState(1);
  const [costperHr, setCostperHr] = useState(0.5);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleSelectHour = (hour) => {
    setSelectHrs(hour);
  };

  const handlerEventPhone = (e) => {
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
    let amount = selectHrs * costperHr;
    completedForm();
    navigate("/DisplayResults", { state: { selectHrs, amount, phone } });
  };

  return (
    <div className="options-container">
      {/* <Header /> */}
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
          type="text"
          value={phone}
          onChange={handlerEventPhone}
          placeholder="061xxxxxxx"
        />
        {phoneError && <p className="error">{phoneError}</p>}
      </div>
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default DisplayOptions;
