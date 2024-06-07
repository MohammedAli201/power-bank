import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../assets/styles/DisplayResults.css';

const DisplayResults = ({ conformationForm }) => {
  const location = useLocation();
  const formData = location.state;
  const navigate = useNavigate();

  const completeReview = () => {
    alert('Payment has been made');
    conformationForm();
    navigate("/EvcPayment");
  };

  return (
    <div className="results-container">
      <h1>Information Summary</h1>
      <div className="summary-card">
        <div className="card-item">
          <strong>Amount of hours you selected:</strong>
          <span>{formData.selectHrs} hrs</span>
        </div>
        <div className="card-item">
          <strong>Phone:</strong>
          <span>{formData.phone}</span>
        </div>
        <div className="card-item">
          <strong>Amount to be paid:</strong>
          <span>{formData.amount} $</span>
        </div>
        <div className="card-item account-info">
          <strong>Our account for payment:</strong>
          <span>89858</span>
        </div>
      </div>
      <button className="payment-button" onClick={completeReview}>Confirm and make payment</button>
    </div>
  );
};

export default DisplayResults;
