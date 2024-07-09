import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import '../assets/styles/PaymentProcessing.css';
import FaceCapture from '../components/FaceCapture';
import config from "../config/config";
const PaymentProcessing = () => {
  const location = useLocation();
  const userInfo = location.state;
  const stationId = 'WSEP161683346505';
  const apiBaseUrl = `${config.URL}api/v1/stations/powerBankRouter/`;
  const [error, setError] = useState("");
  const [stationData, setStationData] = useState(null);
  const [paymentIsSucceeded, setPaymentIsSucceeded] = useState(false);
  const [paymentInfores, setPaymentInfores] = useState(null);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    console.warn("Payment Processing:", userInfo);
    if (!hasFetchedData.current) {
      fetchDataAndMakePayment();
      hasFetchedData.current = true;
    }
  }, );

  // Fetch station information and make payment request
  const fetchDataAndMakePayment = async () => {
    try {
      // Fetch station information
      const stationResponse = await fetch(`${apiBaseUrl}${stationId}`, {
        method: 'GET',
      });

      if (!stationResponse.ok) {
        throw new Error('Failed to fetch station information');
      }

      const stationData = await stationResponse.json();
      console.log("Station Data:", stationData.batteries);
      setStationData(stationData);

      // After successfully fetching station data, make the payment request
      await evcPaymentRequest();
    } catch (error) {
      console.error('Error fetching station data or making payment:', error);
      setError('Error fetching station data or making payment');
    }
  };

  // Make EVC payment request
  const evcPaymentRequest = async () => {
    const data = {
      stationId: stationId,
      userId: userInfo.userId,
      amount: userInfo.amount,
      accountNo : userInfo.phones,
      hours: userInfo.selectHrs,
      currency: "USD",
      description: "wan diray"
         
    

    };
    console.warn("Payment Request Data:", data);

    try {
      const response = await fetch(`${config.URL}api/v1/stations/payments/evc_paymentRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save payment information');
      }

      const data_res = await response.json();
      setPaymentIsSucceeded(true);
      setPaymentInfores(data_res);
      console.log("Payment saved successfully:", data_res);
    } catch (error) {
      console.error('Error saving payment information:', error);
      setError('Error saving payment information');
    }
  };

  return (
    <div className="payment-container">
      <h1>Payment</h1>
      {error ? (
        <div className="error-message">
          <h3>Error: {error}</h3>
        </div>
      ) : (
        <div className="response-container">
          <h3>{paymentIsSucceeded ? 'Payment is successful' : 'Processing payment...'}</h3>
      
          {/* Only render FaceCapture if stationData and payment information are available */}
          {stationData && paymentInfores && (
            <FaceCapture
              slots={stationData.batteries}
              paymentInfores={paymentInfores}
              paymentIsSucceeded={paymentIsSucceeded}
              stationId={stationId} // Pass stationId as prop
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentProcessing;
