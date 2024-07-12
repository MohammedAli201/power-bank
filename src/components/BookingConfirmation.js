import React  from "react";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import '../assets/styles/BookingConfirmation.css';

const BookingConfirmation = ({ conformationForm }) => {
  const {userInputInfo} = useAuth();
  console.log("From BookingConfirmation",userInputInfo)
  const {selectHrs,amount,phones} = userInputInfo
  // console.log(userInputInfo.selectHrs,userInputInfo.amount,userInputInfo.phones);
  // const location = useLocation();
  // const formData = location.state;
  const navigate = useNavigate();

  const completeReview = () => {
    alert('Payment has been made');
    conformationForm();
    // TODO: conver the hours to milliseconds
    
    //  const hrToMs = selectHrs * 3600000;
    //  selectHrs = hrToMs;
    // const formData = { selectHrs, amount, phones };

    // navigate("/PaymentProcessing");
    navigate("/PaymentProcessing");

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
      {/* <div className="account-info">
        <h2>Our Account for Payment</h2>
        <table className="account-table">
          <tbody>
            <tr>
              <th>Account Number</th>
              <td>89858</td>
            </tr>
            <tr>
              <th>Bank</th>
              <td>Salam Bank</td>
            </tr>
            <tr>
              <th>SWIFT Code</th>
              <td>SALAM123</td>
            </tr>
          </tbody>
        </table>
      </div> */}
      <button className="payment-button" onClick={completeReview}>Confirm and make payment</button>
    </div>
  );
};

export default BookingConfirmation;
