import { useState, useEffect } from "react";
import ServiceTimer from "./ServiceTimer";
import ApiService from "./apiService";
import '../assets/styles/EvcPayment.css';
import PreventDoubleUse from "./preventDoubleUse";
import ReleaseBattery from "../ReleaseBatteries/releaseBattery";

const EvcPayment = () => {
  const paymentInfo = {
    mobileNumber: '0618056580',
    paymentId: "payment_002",
  };
  const [response, setResponse] = useState(null);
  const [paymentIsSucceeded, setPaymentIsSucceeded] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await ApiService({
        apiUrl: "https://jsonplaceholder.typicode.com/todos/1",
        method: "GET",
      });
      if (result.error) {
        setError(result.error);
      } else {
        setResponse(result);

      }
    };

    fetchData();
  }, []);


  


  return (
    <div className="payment-container">
      <h1>Payment</h1>
      {error ? (
        <div className="error-message">
          <h3>Error: {error}</h3>
        </div>
      ) : (
        <div className="response-container">
          {/* <h3>Response:</h3>
          {response && (
            <pre className="response-data">{JSON.stringify(response, null, 2)}</pre>
          )} */}
          {paymentIsSucceeded && <ServiceTimer paymentIsSucceeded={paymentIsSucceeded} />}
          <PreventDoubleUse paymentInfo={paymentInfo} />

        </div>
      )}
    </div>
  );
};

export default EvcPayment;
