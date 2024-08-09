
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import getStationCode from "../components/stations/station";
import '../assets/styles/PaymentProcessing.css';
// import FaceCapture from '../components/FaceCapture';
import config from "../config/config";
import { useAuth } from '../hooks/AuthProvider';
import Loader from "../components/loader";
import Completed from "../components/completed";
const PaymentProcessing = () => {
  const [endTimeMilliseconds_, setEndTimeMilliseconds] = useState(0);
 
  const apiBaseUrl = `${config.URL_LOCAL}api/v1/stations/powerBankRouter/`;
  const paymentURL = `${config.URL_LOCAL}api/v1/stations/payments/savePaymentInfoWithUserInfo`;

  // const [error, setError] = useState("");
  const [stationData, setStationData] = useState(null);
  // const [paymentIsSucceeded, setPaymentIsSucceeded] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  // const [paymentInfores, setPaymentInfores] = useState(null);
  const hasFetchedData = useRef(false);
  const {userInputInfo,paymentCompleted,handleUserInputInfo,setCurrentStep} = useAuth();
  const {selectHrs,amount,phones,hrToMs,stationId} = userInputInfo
  const stationName = getStationCode(stationId);
  const navigate = useNavigate();
  const convertMillisToHours = useCallback((millis) => millis / 3600000, []);
  const timeManager = useCallback(() => {
    const MogadishuTime = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Mogadishu",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });

    const startTime = new Date();
    const formattedStartTime = MogadishuTime.format(startTime);
    const endTime = new Date(startTime.getTime() + convertMillisToHours(selectHrs) * 60 * 60 * 1000);
    const formattedEndTime = MogadishuTime.format(endTime);
    const createdAt = MogadishuTime.format(new Date());
    const endTimeMilliseconds = convertMillisToHours(selectHrs * 60 * 60 * 1000);

    return {
      createdAt,
      formattedStartTime,
      formattedEndTime,
      endTimeMilliseconds
    };
  }, [convertMillisToHours, selectHrs]);

  const forceUnlock = useCallback(async () => {
    // const slotId = stationData.batteries[0].slotId;
    const slotId = 1;
    const stationName_ = "WSEP161683346505";
    try {
      const response = await fetch(`${config.URL_LOCAL}api/v1/stations/powerBankRouter/${stationName_}/forceUnlock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stationName, slotId })
      });

      if (!response.ok) {
        // navigate('/Succes')
        throw new Error('Failed to force unlock');
       
      }

      const data_res = await response.json();
      navigate('/Succes')
      console.log("Force unlock successful:", data_res);
    } catch (error) {
      console.error('Error forcing unlock:', error);
    }
  }, [stationData, stationName, navigate]);

  const evcPaymentRequest = useCallback(async () => {
    const data = {
      stationName: stationName,
      userId: "userId",
      amount: amount,
      accountNo: phones,
      hours: selectHrs,
      currency: "USD",
      description: "wan diray"
    };

    // try {
    //   const response = await fetch(`${config.URL_LOCAL}api/v1/stations/payments/evc_paymentRequest`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   // if (!response.ok) {
    //   //   // navigate('/Succes')
    //   //   throw new Error('Failed to make payment request');
    //   // }

    //   const data_res = await response.json();
    //   await forceUnlock();
    //   setLoading(false);
    //   // setPaymentIsSucceeded(true);
    //   // setPaymentInfores(data_res);
      
    //   console.log("Payment saved successfully:", data_res);
    // } catch (error) {
    //   console.error('Error making payment request:', error);
    //   // setError('Error making payment request');
    // }

    await forceUnlock();
  }, [forceUnlock, stationName, amount, phones, selectHrs]);

  const savePaymentWithPowerBank = useCallback(async () => {
    const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } = timeManager();

    const newData = {
      stationName: stationName, // stationId in JSON
      userId: "EVC-REF-456", // "is-120" in JSON
      slotId: 1, // matches JSON
      evcReference: "EVC-REF-456", // matches JSON
      timestampEvc: "2024-07-10T10:00:00Z", // "2024-07-20T10:00:00Z" in JSON
      createdAt: createdAt, // "2024-07-28T08:00:00Z" in JSON
      phoneNumber: phones, // matches JSON
      amount: amount, // matches JSON
      isPaid: true, // matches JSON
      endRentTime: formattedEndTime, // "2024-07-28T22:16:04Z" in JSON
      startTime: formattedStartTime, // "2024-07-28T22:12:04Z" in JSON
      hoursPaid: convertMillisToHours(selectHrs), // 4 in JSON
      millisecondsPaid: hrToMs, // "7200" in JSON (make sure this is a string if expected in JSON)
      currency: "USD", // not in JSON
      paymentStatus: "active", // matches JSON
      lockStatus: 1 // matches JSON
    };
    

    try {
      const response = await fetch(paymentURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error('Failed to save payment information');
      }

      const res = await response.json();
      paymentCompleted();
      setCurrentStep(4)
      navigate('/Succes')
   
      setEndTimeMilliseconds(endTimeMilliseconds);
      console.log("Payment saved successfully:", res);
    } catch (error) {
      console.error('Error saving payment information:', error);
      // setError('Error saving payment information');
    }
  }, [timeManager, stationName, phones, amount, convertMillisToHours, selectHrs, hrToMs, paymentURL, paymentCompleted, setCurrentStep, navigate]);

  const fetchDataAndMakePayment = useCallback(async () => {
    try {
      const stationResponse = await fetch(`${apiBaseUrl}${stationName}`, { method: 'GET' });

      if (!stationResponse.ok) {
        // throw new Error('Failed to fetch station information');
        handleUserInputInfo({ selectHrs, amount, phones, hrToMs ,stationId, millisecondsPaid:hrToMs});
        // setCurrentStep(4)
        // navigate('/Succes')
      }

      const stationData = await stationResponse.json();
      setStationData(stationData);
      await evcPaymentRequest();
    } catch (error) {
      console.error('Error fetching station data or making payment:', error);
      // setError('Error fetching station data or making payment');
    }
  }, [apiBaseUrl, evcPaymentRequest, stationName, handleUserInputInfo, setCurrentStep, selectHrs, amount, phones, hrToMs, stationId,navigate]);

  useEffect(() => {
   
  
    savePaymentWithPowerBank();

    if (!hasFetchedData.current) {
      fetchDataAndMakePayment();
      hasFetchedData.current = true;
    }
  }, [fetchDataAndMakePayment, savePaymentWithPowerBank, userInputInfo, endTimeMilliseconds_, phones, navigate]);


  return (
    
    <div className="payment-container">
    
      {loading ? (
        <Loader message="Payment is Under Process" />
      ) : (
        <div className="response--1">
          {/* <h3> 'Payment is successful' : 'Processing payment...'</h3> */}
          <Completed message ="The payment is completed"/>
        </div>
      )}
    </div>
  );
  
  // return (


  //   <div className="payment-container">
  //     <h1>Payment</h1>
  //     {error ? (
  //       <div className="error-message">
  //         <h3>Error: {error}</h3>
  //       </div>
  //     ) : (
  //       <div className="response-container">
  //         <h3>{paymentIsSucceeded ? 'Payment is successful' : 'Processing payment...'}</h3>
  //         {stationData && paymentInfores && (
  //           <FaceCapture
  //             slots={stationData.batteries}
  //             paymentInfores={paymentInfores}
  //             paymentIsSucceeded={paymentIsSucceeded}
  //             stationName={stationName}
  //           />
  //         )}
  //       </div>
  //     )}
  //   </div>
  // );
};

export default PaymentProcessing;
