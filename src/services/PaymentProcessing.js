// import { useState, useEffect, useRef } from "react";
// import {   useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import '../assets/styles/PaymentProcessing.css';
// import FaceCapture from '../components/FaceCapture';
// import config from "../config/config";
// import { useAuth } from '../hooks/AuthProvider';
// const PaymentProcessing = () => {
//   const location = useLocation();
//   const userInfo = location.state;
//   const stationId = 'WSEP161683346505';
//   const apiBaseUrl = `${config.URL}api/v1/stations/powerBankRouter/`;
//   const paymentURL = "http://localhost:9000/api/v1/stations/payments/savePaymentInfoWithUserInfo";

//   const [error, setError] = useState("");
//   const [stationData, setStationData] = useState(null);
//   const [paymentIsSucceeded, setPaymentIsSucceeded] = useState(true);
//   const [paymentInfores, setPaymentInfores] = useState(null);
//   const hasFetchedData = useRef(false);
//   const auth = useAuth();
// const navigate = useNavigate();
//   useEffect(() => {
//     console.warn("Payment Processing:", userInfo);
//     savePaymentWithPowerBank()

//     if (!hasFetchedData.current) {
//       fetchDataAndMakePayment();
//       hasFetchedData.current = true;
//     }
//   }, );
// // TODO: This function should only save the payment information with the power bank
// const timeManger = () => {
//   const MogadishuTime = new Intl.DateTimeFormat("en-GB", {
//     timeZone: "Africa/Mogadishu",
//     year: "numeric",
//     month: "numeric",
//     day: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     second: "numeric"
//   });
  

//   const startTime = new Date();
//   const formattedStartTime = MogadishuTime.format(startTime);

//   const endTime = new Date(startTime.getTime() +converMillToHr( userInfo.selectHrs) * 60 * 60 * 1000); // Add req_time hours
//   const formattedEndTime = MogadishuTime.format(endTime);
//   const createdAt = MogadishuTime.format(new Date());

//   const endTimeMilliseconds =converMillToHr( userInfo.selectHrs * 60 * 60 * 1000);

//   return {
//     createdAt,
//     formattedStartTime,
//     formattedEndTime,
//     endTimeMilliseconds
//   };
// };

// const converMillToHr = (mill) => {
//   return mill / 3600000;
// }

// const savePaymentWithPowerBank = async () => {
//   const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } = timeManger();
//   console.log(createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds);

//   const newData = {
//     stationId: stationId,
//     userId: "EVC-REF-456",
//     slotId: 1,
//     evcReference: "EVC-REF-456",
//     timestampEvc: "2024-07-10T10:00:00Z",
//     createdAt: createdAt,
//     phoneNumber: userInfo.phones,
//     amount: userInfo.amount,
//     isPaid: true,
//     endRentTime: formattedEndTime,
//     startTime: formattedStartTime,
//     hoursPaid: converMillToHr(userInfo.selectHrs),
//     millisecondsPaid: userInfo.selectHrs ,
//     currency: "USD",
//     paymentStatus: "active",
//     lockStatus: 1
//   };

//   console.log(newData);

//   try {
//     const response = await fetch(paymentURL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newData),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch station information');
//     }

//     const res = await response.json();
//     auth.paymentCompleted()
//     navigate('/Succes', {
//       state: {
//         millisecondsPaid: endTimeMilliseconds,
//         phoneNumber: userInfo.phones
//       }
//     });
//     console.log("Payment saved successfully:", res);

//   } catch (error) {
//     console.error('Error fetching station data or making payment:', error);
//     setError('Error fetching station data or making payment');
//   }
// };

//   // Fetch station information and make payment request
//   const fetchDataAndMakePayment = async () => {
//     try {

//       // Fetch station information
//       const stationResponse = await fetch(`${apiBaseUrl}${stationId}`, {
//         method: 'GET',
//       });

//       if (!stationResponse.ok) {
//         throw new Error('Failed to fetch station information');
//       }

//       const stationData = await stationResponse.json();
//       console.log("Station Data:", stationData.batteries);
//       setStationData(stationData);

//       // After successfully fetching station data, make the payment request
//       await evcPaymentRequest();
//     } catch (error) {
//       console.error('Error fetching station data or making payment:', error);
//       setError('Error fetching station data or making payment');
//     }
//   };

//   // Make EVC payment request
//   const evcPaymentRequest = async () => {
//     const data = {
//       stationId: stationId,
//       userId: userInfo.userId,
//       amount: userInfo.amount,
//       accountNo : userInfo.phones,
//       hours: userInfo.selectHrs,
//       currency: "USD",
//       description: "wan diray"
    
//     };
//     console.warn("Payment Request Data:", data);

//     try {
//       const response = await fetch(`${config.URL}api/v1/stations/payments/evc_paymentRequest`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save payment information');
//       }

//       const data_res = await response.json();
//        await forceUnlock
//       setPaymentIsSucceeded(true);
//       setPaymentInfores(data_res);
//       console.log("Payment saved successfully:", data_res);
//     } catch (error) {
//       console.error('Error saving payment information:', error);
//       setError('Error saving payment information');
//     }
//   };
// const forceUnlock = async () => {
//   const statId_available = stationData.batteries[0]
//   try {
//     const response = await fetch(`${config.URL}api/v1/stations/powerBankRouter/${stationId}/forceUnlock`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ stationId: stationId, slotId: statId_available.slotId })
//     });

//     if (!response.ok) {
//       throw new Error('Failed to force unlock');
//     }

//     const data_res = await response.json();
//     console.log("Force unlock successful:", data_res);
//   } catch (error) {
//     console.error('Error forcing unlock:', error);
//   }

// };
//   return (
//     <div className="payment-container">
//       <h1>Payment</h1>
//       {error ? (
//         <div className="error-message">
//           <h3>Error: {error}</h3>
//         </div>
//       ) : (
//         <div className="response-container">
//           <h3>{paymentIsSucceeded ? 'Payment is successful' : 'Processing payment...'}</h3>
      
//           {/* Only render FaceCapture if stationData and payment information are available */}
//           {stationData && paymentInfores && (
//             <FaceCapture
//               slots={stationData.batteries}
//               paymentInfores={paymentInfores}
//               paymentIsSucceeded={paymentIsSucceeded}
//               stationId={stationId} // Pass stationId as prop
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentProcessing;
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../assets/styles/PaymentProcessing.css';
import FaceCapture from '../components/FaceCapture';
import config from "../config/config";
import { useAuth } from '../hooks/AuthProvider';

const PaymentProcessing = () => {
  const location = useLocation();
  const userInfo = location.state;
  const stationId = 'WSEP161683346505';
  const apiBaseUrl = `${config.URL}api/v1/stations/powerBankRouter/`;
  const paymentURL = "http://localhost:9000/api/v1/stations/payments/savePaymentInfoWithUserInfo";

  const [error, setError] = useState("");
  const [stationData, setStationData] = useState(null);
  const [paymentIsSucceeded, setPaymentIsSucceeded] = useState(true);
  const [paymentInfores, setPaymentInfores] = useState(null);
  const hasFetchedData = useRef(false);
  const auth = useAuth();
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
    const endTime = new Date(startTime.getTime() + convertMillisToHours(userInfo.selectHrs) * 60 * 60 * 1000);
    const formattedEndTime = MogadishuTime.format(endTime);
    const createdAt = MogadishuTime.format(new Date());
    const endTimeMilliseconds = convertMillisToHours(userInfo.selectHrs * 60 * 60 * 1000);

    return {
      createdAt,
      formattedStartTime,
      formattedEndTime,
      endTimeMilliseconds
    };
  }, [convertMillisToHours, userInfo.selectHrs]);

  const forceUnlock = useCallback(async () => {
    const slotId = stationData.batteries[0].slotId;

    try {
      const response = await fetch(`${config.URL}api/v1/stations/powerBankRouter/${stationId}/forceUnlock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stationId, slotId })
      });

      if (!response.ok) {
        throw new Error('Failed to force unlock');
      }

      const data_res = await response.json();
      console.log("Force unlock successful:", data_res);
    } catch (error) {
      console.error('Error forcing unlock:', error);
    }
  }, [stationData, stationId]);

  const evcPaymentRequest = useCallback(async () => {
    const data = {
      stationId: stationId,
      userId: userInfo.userId,
      amount: userInfo.amount,
      accountNo: userInfo.phones,
      hours: userInfo.selectHrs,
      currency: "USD",
      description: "wan diray"
    };

    try {
      const response = await fetch(`${config.URL}api/v1/stations/payments/evc_paymentRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to make payment request');
      }

      const data_res = await response.json();
      await forceUnlock();
      setPaymentIsSucceeded(true);
      setPaymentInfores(data_res);
      console.log("Payment saved successfully:", data_res);
    } catch (error) {
      console.error('Error making payment request:', error);
      setError('Error making payment request');
    }
  }, [forceUnlock, stationId, userInfo.amount, userInfo.phones, userInfo.selectHrs, userInfo.userId]);

  const savePaymentWithPowerBank = useCallback(async () => {
    const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } = timeManager();

    const newData = {
      stationId: stationId,
      userId: "EVC-REF-456",
      slotId: 1,
      evcReference: "EVC-REF-456",
      timestampEvc: "2024-07-10T10:00:00Z",
      createdAt: createdAt,
      phoneNumber: userInfo.phones,
      amount: userInfo.amount,
      isPaid: true,
      endRentTime: formattedEndTime,
      startTime: formattedStartTime,
      hoursPaid: convertMillisToHours(userInfo.selectHrs),
      millisecondsPaid: userInfo.selectHrs,
      currency: "USD",
      paymentStatus: "active",
      lockStatus: 1
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
      auth.paymentCompleted();
      navigate('/Success', {
        state: {
          millisecondsPaid: endTimeMilliseconds,
          phoneNumber: userInfo.phones
        }
      });
      console.log("Payment saved successfully:", res);
    } catch (error) {
      console.error('Error saving payment information:', error);
      setError('Error saving payment information');
    }
  }, [auth, convertMillisToHours, navigate, paymentURL, timeManager, userInfo.amount, userInfo.phones, userInfo.selectHrs]);

  const fetchDataAndMakePayment = useCallback(async () => {
    try {
      const stationResponse = await fetch(`${apiBaseUrl}${stationId}`, { method: 'GET' });

      if (!stationResponse.ok) {
        throw new Error('Failed to fetch station information');
      }

      const stationData = await stationResponse.json();
      setStationData(stationData);
      await evcPaymentRequest();
    } catch (error) {
      console.error('Error fetching station data or making payment:', error);
      setError('Error fetching station data or making payment');
    }
  }, [apiBaseUrl, evcPaymentRequest, stationId]);

  useEffect(() => {
    console.warn("Payment Processing:", userInfo);
    savePaymentWithPowerBank();

    if (!hasFetchedData.current) {
      fetchDataAndMakePayment();
      hasFetchedData.current = true;
    }
  }, [fetchDataAndMakePayment, savePaymentWithPowerBank, userInfo]);

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
          {stationData && paymentInfores && (
            <FaceCapture
              slots={stationData.batteries}
              paymentInfores={paymentInfores}
              paymentIsSucceeded={paymentIsSucceeded}
              stationId={stationId}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentProcessing;
