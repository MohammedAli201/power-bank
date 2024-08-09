import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import '../assets/styles/BookingConfirmation.css';

const BookingConfirmation = ({ conformationForm }) => {
  const { userInputInfo,setCurrentStep } = useAuth();
  const { selectHrs, amount, phones } = userInputInfo;
  const navigate = useNavigate();

  const completeReview = () => {
    // alert('Payment has been made');
    conformationForm();
    setCurrentStep(2);
    navigate("/PaymentProcessing");
    // navigate("/Succes");

    
  };

  return (
    <div className="results-container">
      <h1>Information Summary</h1>
      <table className="summary-table">
        <tbody>
          <tr>
            <th>Amount of hours you selected</th>
            <td>{selectHrs} hrs</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{phones}</td>
          </tr>
          <tr>
            <th>Amount to be paid</th>
            <td>${amount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <button className="payment-button" onClick={completeReview}>Confirm and make payment</button>
    </div>
  );
};

export default BookingConfirmation;
