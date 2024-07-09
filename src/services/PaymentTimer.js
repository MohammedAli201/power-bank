import React, { useState, useEffect } from "react";
import config from "../config/config";

const PaymentTimer = ({ paymentIsSucced }) => {
  // First we want to check if the payment is successful
  // Before we start the timer, we want to save the time the payment was made, and payment information, 
  // and then start the timer
  const [isLocked, setIsLocked] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [testData, setTestData] = useState(null);

  const savePaymentTime = async () => {
    // Payment with time will be saved in the database
    const stationId = 'WSEP161683346505';
    const data = {
      paymentTime: new Date().toISOString(),
      paymentInfo: 'payment_002'
    };
    setTimer(new Date().getTime());
    try {
      const response = await fetch(`${config}/api/v1/stations/${stationId}/savePaymentInfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data_res = await response.json();
      setTestData(response);
      console.log("Data is saved successfully", data_res);
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    savePaymentTime();
  }, []);

  console.log("Payment time is saved!");

  return (
    <div>
      <p>Elapsed Time: seconds is see: {timer}</p>
      {/* <p>Status: {isLocked ? 'Locked' : 'Unlocked'}</p> */}
    </div>
  );
}

export default PaymentTimer;
