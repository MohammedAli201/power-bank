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
      <table className="summary-table">
        <tbody>
          <tr>
            <th>Amount of hours you selected</th>
            <td>{formData.selectHrs} hrs</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{formData.phone}</td>
          </tr>
          <tr>
            <th>Amount to be paid</th>
            <td>${formData.amount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <div className="account-info">
        <h2>Our Account for Payment</h2>
        <table className="account-table">
          <tbody>
            <tr>
              <th>Account Number</th>
              <td>89858</td>
            </tr>
            <tr>
              <th>Bank</th>
              <td>Example Bank</td>
            </tr>
            <tr>
              <th>SWIFT Code</th>
              <td>EXAMP123</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="payment-button" onClick={completeReview}>Confirm and make payment</button>
    </div>
  );
};

export default DisplayResults;
