import { useState, useEffect } from "react";
import ServiceTimer from "./ServiceTimer";
import ApiService from "./apiService";
import '../assets/styles/EvcPayment.css';
import PreventDoubleUse from "./preventDoubleUse";

import SlotsComponent from "../SlotSelection/SlotsComponent";
// import ApiStationInformation from "./apiStationInformation";
const EvcPayment = () => {

  const paymentInfo = {
    mobileNumber: '0618056580',
    paymentId: "payment_002",
  };
  const stationId = 'WSEP161683346505';
  const [response, setResponse] = useState(null);
  const [stationData, setStationData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [paymentIsSucceeded, setPaymentIsSucceeded] = useState(true);
  const [error, setError] = useState(null);
// This will fetch the payment data from the API
  useEffect(() => {
    // const fetchData = async () => {
    //   const result = await ApiService({
    //     apiUrl: "https://jsonplaceholder.typicode.com/todos/1",
    //     method: "GET",
    //   });
    //   if (result.error) {
    //     setError(result.error);
    //   } else {
    //     setResponse(result);
    //     // fetchStationInfo();
        

    //   }
    // };

    fetchStationInfo();
  }, []);

  
  const fetchStationInfo = async () => {
    try {
        const response = await ApiService({
            apiUrl: `/v1/station/${stationId}`, // Directly use stationId
        });
        setStationData(response);
        setSuccess(true)
        setError('');
    } catch (err) {
        setError(`Error: ${err.message}`);
        setStationData(null);
    }
};

// This will fetch the slots data from the API
// useEffect(() => {
//  const { stationData, error } = FetchStationData(stationId);
//   if (error) {
//     setError(error);
//   }
//   if (stationData) {
//     setSlotsData(stationData);
//   }
// }
// , []);


  
console.log("slotsData",stationData);

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
           {/* <SlotsComponent slots={stationData.batteries} paymentIsSucceeded={paymentIsSucceeded} /> */}
          {/* {paymentIsSucceeded && <ServiceTimer paymentIsSucceeded={paymentIsSucceeded} />} */}
          {/* <PreventDoubleUse paymentInfo={paymentInfo} /> */}

          {success && <SlotsComponent slots={stationData.batteries} paymentIsSucceeded={paymentIsSucceeded} />}

        </div>
      )}
    </div>
  );
};

export default EvcPayment;
