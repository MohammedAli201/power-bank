// import { useState, useEffect, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import getStationCode from "../components/stations/station";
// import '../assets/styles/PaymentProcessing.css';
// import config from "../config/config";
// import { useAuth } from '../hooks/AuthProvider';
// import Loader from "../components/loader";
// import Completed from "../components/completed";
// import moment from 'moment';
// import 'moment-timezone'; 
// const PaymentProcessing = () => {
//   const [endTimeMilliseconds_, setEndTimeMilliseconds] = useState(0);
//   const [slotId_selected, setSlotId_selected] = useState(0);
//   const apiBaseUrl = `${config.URL}api/v1/stations/powerBankRouter/`;
//   const paymentURL = `${config.URL}api/v1/stations/payments/savePaymentInfoWithUserInfo`;
//   const [stationDataBattery, setStationData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const hasFetchedData = useRef(false);
//   const { userInputInfo, paymentCompleted, handleUserInputInfo, setCurrentStep,agreement } = useAuth();
//   const { selectHrs, amount, phones, stationId } = userInputInfo;
//   const stationName = getStationCode(stationId);
//   const navigate = useNavigate();
//   const filterBatteries = (batteries) => {
//     return batteries.filter(battery => {
//         return (
//             battery.lock_status === "1" &&
//             battery.battery_capacity === "100" &&
//             battery.battery_abnormal === "0" &&
//             battery.cable_abnormal === "0" &&
//             battery.contact_abnormal === "0" &&
//             battery.soh === "100"
//         );
//     });
// }
//   const convertMillisToHours = useCallback((millis) => millis / 3600000, []);


  
//   // const timeManager = useCallback(() => {
//   //     const timeZone = 'Africa/Mogadishu'; // Timezone for Mogadishu, Somalia
  
//   //     // Get the current time in Mogadishu
//   //     const currentDateTime = moment().tz(timeZone);
  
//   //     // Format the current time to the desired string format
//   //     const formattedStartTime = currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  
//   //     // Calculate the end time by adding the selected hours
//   //     const endTime = currentDateTime.clone().add(selectHrs, 'hours');
      
//   //     // Format the end time to the desired string format
//   //     const formattedEndTime = endTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    
//   //     // Calculate the duration in milliseconds
//   //     const endTimeMilliseconds = selectHrs * 60 * 60 * 1000; 
    
//   //     // Return the formatted times and other relevant information
//   //     return {
//   //         createdAt: formattedStartTime,
//   //         formattedStartTime,
//   //         formattedEndTime,
//   //         endTimeMilliseconds,
//   //     };
//   // }, [selectHrs]);
  
//   const timeManager = useCallback(() => {
//     const timeZone = 'Africa/Mogadishu'; // Timezone for Mogadishu, Somalia

//     // Get the current time in Mogadishu
//     const currentDateTime = moment().tz(timeZone);

//     // Format the current time to the desired string format
//     const formattedStartTime = currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ");

//     // Calculate the end time by adding the selected hours and an additional 10 minutes
//     const endTime = currentDateTime.clone().add(selectHrs, 'hours').add(10, 'minutes');
    
//     // Format the end time to the desired string format
//     const formattedEndTime = endTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ");

//     // Calculate the duration in milliseconds, accounting for the additional 10 minutes
//     const endTimeMilliseconds = (selectHrs * 60 * 60 * 1000) + (10 * 60 * 1000); 

//     // Return the formatted times and other relevant information
//     return {
//         createdAt: formattedStartTime,
//         formattedStartTime,
//         formattedEndTime,
//         endTimeMilliseconds,
//     };
// }, [selectHrs]);

//   const forceUnlock = useCallback(async (stationIdBattery) => {
//     console.log("Force unlock initiated", stationIdBattery[0].slot_id);
//     const slot_id = stationIdBattery[0].slot_id
//    // const battery_id = filterBatteries(stationIdBattery)[0].battery_id;
//    // const batteryName = filterBatteries(stationIdBattery)[0].battery_name;
//   // console.log("stationIdBattery", filterBatteries(stationIdBattery._b))
//     setSlotId_selected(slot_id);

//     try {
//       const response = await fetch(`${config.URL}api/v1/stations/powerBankRouter/${stationName}/forceUnlock`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ stationName, slot_id }),
//       });

//       if (!response.ok) {
//         console.log(endTimeMilliseconds_, slotId_selected, stationDataBattery, convertMillisToHours(endTimeMilliseconds_));

//         throw new Error('Failed to force unlock');
        
//       }

//       console.log("Force unlock successful");
//     } catch (error) {
//       console.error('Error forcing unlock:', error);
//     }
//   }, [convertMillisToHours, endTimeMilliseconds_, slotId_selected, stationDataBattery, stationName]);

//   const savePaymentWithPowerBank = useCallback(async (referenceId,
//     timestamp,
//     description,
//     transactionId, stationIdBattery) => {
//     const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } = timeManager();



//    // const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } = timeManager(timestamp);
//     // const { referenceId, timestamp, description, transactionId } = evcResponse;
//     console.log("createdAt", createdAt);
//     console.log("formattedStartTime", formattedStartTime);
//     console.log("formattedEndTime", formattedEndTime);
//     console.log("endTimeMilliseconds", endTimeMilliseconds);
//     console.log("referenceId", referenceId);
//     console.log("timestamp", timestamp);


//     const newData = {
//       stationName: stationName,
//       branch_name: stationId,
//       battery_id: stationIdBattery[0].battery_id,
//       userId: referenceId,
//       slotId: stationIdBattery[0].slot_id,
//       evcReference: referenceId,
//       timestampEvc:timestamp ,
//       createdAt: createdAt ,
//       phoneNumber: phones,
//       amount: amount,
//       isPaid: true,
//       endRentTime: formattedEndTime,
//       startTime: formattedStartTime,
//       hoursPaid: selectHrs,
//       term_and_conditions: agreement,
//       millisecondsPaid: endTimeMilliseconds ,
//       currency: "USD",
//       paymentStatus: "active",
//       lockStatus: 1
//     };

//     console.log("newData", newData);
//     handleUserInputInfo({ selectHrs, amount, phones, hrToMs:endTimeMilliseconds, stationId, millisecondsPaid: endTimeMilliseconds });

//     try {
//       const response = await fetch(paymentURL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save payment information');
//       }
//       const res = await response.json();
//       paymentCompleted();
//       setCurrentStep(4);
//       navigate('/Succes');

//       setEndTimeMilliseconds(endTimeMilliseconds);
//       console.log("Payment saved successfully:", res);
//     } catch (error) {
//       console.error('Error saving payment information:', error);
//     }
//   }, [timeManager, stationName, stationId, phones, amount, selectHrs, agreement, handleUserInputInfo, paymentURL, paymentCompleted, setCurrentStep, navigate]);

//   const evcPaymentRequest = useCallback(async (stationIdBattery) => {
//     const data = {
//       stationName,
//       userId: phones,
//       amount,
//       accountNo: phones,
//       hours: selectHrs,
//       currency: "USD",
//       description: "wan diray"
//     };
// console.log("stationIdBattery", data);
//     try {
//       const response = await fetch(`${config.URL}api/v1/stations/payments/evc_paymentRequest`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text(); // Get detailed error message from server
//         console.error('Failed to make payment request:', errorMessage);
//         throw new Error('Failed to make payment request');
//       }

//       const data_res = await response.json();

//       if (data_res && data_res.params) {
//         const { referenceId, transactionId, description } = data_res.params;
//         const { timestamp } = data_res;

//         // setEvcResponse({
//         //   referenceId,
//         //   timestamp,
//         //   description,
//         //   transactionId
//         // });

//         console.log("Payment request successful:", data_res);
//         await forceUnlock(stationIdBattery);

//         // Ensure savePaymentWithPowerBank is called last
//         savePaymentWithPowerBank(referenceId,
//           timestamp,
//           description,
//           transactionId, stationIdBattery);
//         setLoading(false);
//         setCurrentStep(4);
//         navigate('/Succes');
//       } else {
//         throw new Error('Unexpected response structure');
//       }
//     } catch (error) {
//       console.error('Error making payment request:', error);
//     }
//   }, [stationName, amount, phones, selectHrs, forceUnlock, savePaymentWithPowerBank, setCurrentStep, navigate]);

//   const fetchDataAndMakePayment = useCallback(async () => {
//     console.log("stationName", stationName);

//     try {
//       const stationResponse = await fetch(`${apiBaseUrl}${stationName}`, { method: 'GET' });

//       if (!stationResponse.ok) {
//         throw new Error('Failed to fetch station information');
//       }

//       const stationData_ = await stationResponse.json();

//       const stationIdBattery = stationData_.batteries;
//       setStationData(stationIdBattery);
//     //  console.log("stationIdBattery", stationIdBattery);
//       await evcPaymentRequest(stationIdBattery);
//     //const stationIdBattery = filterBatteries(stationData_.batteries);
//    // console.log("Filtered Batteries", stationIdBattery);
//     } catch (error) {
//       console.error('Error fetching station data or making payment:', error);
//     }
//   }, [stationName, apiBaseUrl, evcPaymentRequest]);

//   useEffect(() => {
//     if (!hasFetchedData.current) {
//       fetchDataAndMakePayment();
//       hasFetchedData.current = true;
//     }
//   }, [fetchDataAndMakePayment]);

//   return (
//     <div className="payment-container">
//       {loading ? (
//         <Loader message="Payment is Under Process" />
//       ) : (
//         <div className="response--1">
//           <Completed message="The payment is completed" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentProcessing;

// import { useState, useEffect, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import getStationCode from "../components/stations/station";
// import '../assets/styles/PaymentProcessing.css';
// import config from "../config/config";
// import { useAuth } from '../hooks/AuthProvider';
// import Loader from "../components/loader";
// import Completed from "../components/completed";
// import moment from 'moment-timezone'; 

// const PaymentProcessing = () => {
//   const [loading, setLoading] = useState(true);
//   const hasFetchedData = useRef(false);
  
//   const { userInputInfo, paymentCompleted, handleUserInputInfo, setCurrentStep } = useAuth();
//   const { selectHrs, amount, phones, stationId } = userInputInfo;

//   const stationName = getStationCode(stationId);
//   const navigate = useNavigate();

//   const apiBaseUrl = `${config.URL}api/v1/stations/powerBankRouter/`;
//   const paymentURL = `${config.URL}api/v1/stations/payments/savePaymentInfoWithUserInfo`;

//   const timeManager = useCallback(() => {
//     const timeZone = 'Africa/Mogadishu'; 
//     const currentDateTime = moment().tz(timeZone);
    
//     return {
//       createdAt: currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
//       formattedStartTime: currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
//       formattedEndTime: currentDateTime.clone().add(selectHrs, 'hours').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
//       endTimeMilliseconds: selectHrs * 60 * 60 * 1000,
//     };
//   }, [selectHrs]);

//   const filterBatteries = useCallback((batteries) => {
//     return batteries.filter(battery => (
//       battery.lock_status === "1" &&
//       battery.battery_capacity === "100" &&
//       battery.battery_abnormal === "0" &&
//       battery.cable_abnormal === "0" &&
//       battery.contact_abnormal === "0" &&
//       battery.soh === "100"
//     ));
//   }, []);

//   const forceUnlock = useCallback(async (stationIdBattery) => {
//     const slot_id = stationIdBattery[0].slot_id;
//     console.log("Force unlock initiated", slot_id);

//     try {
//       const response = await fetch(`${apiBaseUrl}${stationName}/forceUnlock`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ stationName, slot_id }),
//       });

//       if (!response.ok) throw new Error('Failed to force unlock');
//       console.log("Force unlock successful");
//     } catch (error) {
//       console.error('Error forcing unlock:', error);
//     }
//   }, [stationName, apiBaseUrl]);

//   const savePaymentWithPowerBank = useCallback(async (referenceId, timestamp, description, transactionId, stationIdBattery) => {
//     const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } = timeManager();

//     const newData = {
//       stationName,
//       branch_name: stationId,
//       battery_id: stationIdBattery[0].battery_id,
//       userId: referenceId,
//       slotId: stationIdBattery[0].slot_id,
//       evcReference: referenceId,
//       timestampEvc: timestamp,
//       createdAt,
//       phoneNumber: phones,
//       amount,
//       isPaid: true,
//       endRentTime: formattedEndTime,
//       startTime: formattedStartTime,
//       hoursPaid: selectHrs,
//       millisecondsPaid: endTimeMilliseconds,
//       currency: "USD",
//       paymentStatus: "active",
//       lockStatus: 1
//     };

//     handleUserInputInfo({ selectHrs, amount, phones, hrToMs: endTimeMilliseconds, stationId });

//     try {
//       const response = await fetch(paymentURL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify(newData),
// //       });

// //       if (!response.ok) throw new Error('Failed to save payment information');

// //       paymentCompleted();
// //       setCurrentStep(4);
// //       navigate('/Succes');
// //     } catch (error) {
// //       console.error('Error saving payment information:', error);
// //     }
// //   }, [timeManager, stationName, stationId, phones, amount, selectHrs, handleUserInputInfo, paymentURL, paymentCompleted, setCurrentStep, navigate]);

// //   const evcPaymentRequest = useCallback(async (stationIdBattery) => {
// //     const data = {
// //       stationName,
// //       userId: phones,
// //       amount,
// //       accountNo: phones,
// //       hours: selectHrs,
// //       currency: "USD",
// //       description: "wan diray"
// //     };

// //     try {
// //       const response = await fetch(`${config.URL}api/v1/stations/payments/evc_paymentRequest`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify(data),
// //       });

// //       if (!response.ok) throw new Error('Failed to make payment request');

// //       const data_res = await response.json();

// //       if (data_res?.params) {
// //         const { referenceId, transactionId, description } = data_res.params;
// //         const { timestamp } = data_res;

// //         await forceUnlock(stationIdBattery);

// //         savePaymentWithPowerBank(referenceId, timestamp, description, transactionId, stationIdBattery);
// //         setLoading(false);
// //         setCurrentStep(4);
// //         navigate('/Succes');
// //       } else {
// //         throw new Error('Unexpected response structure');
// //       }
// //     } catch (error) {
// //       console.error('Error making payment request:', error);
// //     }
// //   }, [stationName, amount, phones, selectHrs, forceUnlock, savePaymentWithPowerBank, setCurrentStep, navigate]);

// //   const fetchDataAndMakePayment = useCallback(async () => {
// //     try {
// //       const stationResponse = await fetch(`${apiBaseUrl}${stationName}`, { method: 'GET' });

// //       if (!stationResponse.ok) throw new Error('Failed to fetch station information');

// //       const stationData_ = await stationResponse.json();

// //       const stationIdBattery = filterBatteries(stationData_.batteries);

// //       await evcPaymentRequest(stationIdBattery);
// //     } catch (error) {
// //       console.error('Error fetching station data or making payment:', error);
// //     }
// //   }, [stationName, apiBaseUrl, evcPaymentRequest, filterBatteries]);

// //   useEffect(() => {
// //     if (!hasFetchedData.current) {
// //       fetchDataAndMakePayment();
// //       hasFetchedData.current = true;
// //     }
// //   }, [fetchDataAndMakePayment]);

// //   return (
// //     <div className="payment-container">
// //       {loading ? (
// //         <Loader message="Payment is Under Process" />
// //       ) : (
// //         <div className="response--1">
// //           <Completed message="The payment is completed" />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PaymentProcessing;





// batteries.filter is not a function
//     at filterBatteries (PaymentProcessing.js:24:1)
//     at PaymentProcessing.js:263:1  import { useState, useEffect, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import getStationCode from "../components/stations/station";
// import '../assets/styles/PaymentProcessing.css';
// import config from "../config/config";
// import { useAuth } from '../hooks/AuthProvider';
// import Loader from "../components/loader";
// import Completed from "../components/completed";
// import moment from 'moment';
// import 'moment-timezone'; 
// const PaymentProcessing = () => {
//   const [endTimeMilliseconds_, setEndTimeMilliseconds] = useState(0);
//   const [slotId_selected, setSlotId_selected] = useState(0);
//   const apiBaseUrl = `${config.URL}api/v1/stations/powerBankRouter/`;
//   const paymentURL = `${config.URL}api/v1/stations/payments/savePaymentInfoWithUserInfo`;
//   const [stationDataBattery, setStationData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const hasFetchedData = useRef(false);
//   const { userInputInfo, paymentCompleted, handleUserInputInfo, setCurrentStep,agreement } = useAuth();
//   const { selectHrs, amount, phones, stationId } = userInputInfo;
//   const stationName = getStationCode(stationId);
//   const navigate = useNavigate();
//   const filterBatteries = (batteries) => {
//     return batteries.filter(battery => {
//         return (
//             battery.lock_status === "1" &&
//             battery.battery_capacity === "100" &&
//             battery.battery_abnormal === "0" &&
//             battery.cable_abnormal === "0" &&
//             battery.contact_abnormal === "0" &&
//             battery.soh === "100"
//         );
//     });
// }
//   const convertMillisToHours = useCallback((millis) => millis / 3600000, []);
  
  // const timeManager = useCallback(() => {
  //     const timeZone = 'Africa/Mogadishu'; // Timezone for Mogadishu, Somalia
  
  //     // Get the current time in Mogadishu
  //     const currentDateTime = moment().tz(timeZone);
  
  //     // Format the current time to the desired string format
  //     const formattedStartTime = currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  
  //     // Calculate the end time by adding the selected hours
  //     const endTime = currentDateTime.clone().add(selectHrs, 'hours');
      
  //     // Format the end time to the desired string format
  //     const formattedEndTime = endTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    
  //     // Calculate the duration in milliseconds
  //     const endTimeMilliseconds = selectHrs * 60 * 60 * 1000; 
    
  //     // Return the formatted times and other relevant information
  //     return {
  //         createdAt: formattedStartTime,
  //         formattedStartTime,
  //         formattedEndTime,
  //         endTimeMilliseconds,
  //     };
  // }, [selectHrs]);
  
//   const timeManager = useCallback(() => {
//     const timeZone = 'Africa/Mogadishu'; // Timezone for Mogadishu, Somalia

//     // Get the current time in Mogadishu
//     const currentDateTime = moment().tz(timeZone);

//     // Format the current time to the desired string format
//     const formattedStartTime = currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ");

//     // Calculate the end time by adding the selected hours and an additional 10 minutes
//     const endTime = currentDateTime.clone().add(selectHrs, 'hours').add(10, 'minutes');
    
//     // Format the end time to the desired string format
//     const formattedEndTime = endTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ");

//     // Calculate the duration in milliseconds, accounting for the additional 10 minutes
//     const endTimeMilliseconds = (selectHrs * 60 * 60 * 1000) + (10 * 60 * 1000); 

//     // Return the formatted times and other relevant information
//     return {
//         createdAt: formattedStartTime,
//         formattedStartTime,
//         formattedEndTime,
//         endTimeMilliseconds,
//     };
// }, [selectHrs]);

//   const forceUnlock = useCallback(async (stationIdBattery) => {
//     console.log("Force unlock initiated", stationIdBattery[0].slot_id);
//     const slot_id = stationIdBattery[0].slot_id
//    // const battery_id = filterBatteries(stationIdBattery)[0].battery_id;
//    // const batteryName = filterBatteries(stationIdBattery)[0].battery_name;
//    console.log("stationIdBattery", filterBatteries(stationIdBattery))
//     setSlotId_selected(slot_id);

//     try {
//       const response = await fetch(`${config.URL}api/v1/stations/powerBankRouter/${stationName}/forceUnlock`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ stationName, slot_id }),
//       });

//       if (!response.ok) {
//         console.log(endTimeMilliseconds_, slotId_selected, stationDataBattery, convertMillisToHours(endTimeMilliseconds_));

//         throw new Error('Failed to force unlock');
        
//       }

//       console.log("Force unlock successful");
//     } catch (error) {
//       console.error('Error forcing unlock:', error);
//     }
//   }, [convertMillisToHours, endTimeMilliseconds_, slotId_selected, stationDataBattery, stationName]);

//   const savePaymentWithPowerBank = useCallback(async (referenceId,
//     timestamp,
//     description,
//     transactionId, stationIdBattery) => {
//     const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } = timeManager();



//    // const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } = timeManager(timestamp);
//     // const { referenceId, timestamp, description, transactionId } = evcResponse;
//     console.log("createdAt", createdAt);
//     console.log("formattedStartTime", formattedStartTime);
//     console.log("formattedEndTime", formattedEndTime);
//     console.log("endTimeMilliseconds", endTimeMilliseconds);
//     console.log("referenceId", referenceId);
//     console.log("timestamp", timestamp);


//     const newData = {
//       stationName: stationName,
//       branch_name: stationId,
//       battery_id: stationIdBattery[0].battery_id,
//       userId: referenceId,
//       slotId: stationIdBattery[0].slot_id,
//       evcReference: referenceId,
//       timestampEvc:timestamp ,
//       createdAt: createdAt ,
//       phoneNumber: phones,
//       amount: amount,
//       isPaid: true,
//       endRentTime: formattedEndTime,
//       startTime: formattedStartTime,
//       hoursPaid: selectHrs,
//       term_and_conditions: agreement,
//       millisecondsPaid: endTimeMilliseconds ,
//       currency: "USD",
//       paymentStatus: "active",
//       lockStatus: 1
//     };

//     console.log("newData", newData);
//     handleUserInputInfo({ selectHrs, amount, phones, hrToMs:endTimeMilliseconds, stationId, millisecondsPaid: endTimeMilliseconds });

//     try {
//       const response = await fetch(paymentURL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save payment information');
//       }
//       const res = await response.json();
//       paymentCompleted();
//       setCurrentStep(4);
//       navigate('/Succes');

//       setEndTimeMilliseconds(endTimeMilliseconds);
//       console.log("Payment saved successfully:", res);
//     } catch (error) {
//       console.error('Error saving payment information:', error);
//     }
//   }, [timeManager, stationName, stationId, phones, amount, selectHrs, agreement, handleUserInputInfo, paymentURL, paymentCompleted, setCurrentStep, navigate]);

//   const evcPaymentRequest = useCallback(async (stationIdBattery) => {
//     const data = {
//       stationName,
//       userId: phones,
//       amount,
//       accountNo: phones,
//       hours: selectHrs,
//       currency: "USD",
//       description: "wan diray"
//     };
// console.log("stationIdBattery", data);
//     try {
//       const response = await fetch(`${config.URL}api/v1/stations/payments/evc_paymentRequest`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text(); // Get detailed error message from server
//         console.error('Failed to make payment request:', errorMessage);
//         throw new Error('Failed to make payment request');
//       }

//       const data_res = await response.json();

//       if (data_res && data_res.params) {
//         const { referenceId, transactionId, description } = data_res.params;
//         const { timestamp } = data_res;

//         // setEvcResponse({
//         //   referenceId,
//         //   timestamp,
//         //   description,
//         //   transactionId
//         // });

//         console.log("Payment request successful:", data_res);
//         await forceUnlock(stationIdBattery);

//         // Ensure savePaymentWithPowerBank is called last
//         savePaymentWithPowerBank(referenceId,
//           timestamp,
//           description,
//           transactionId, stationIdBattery);
//         setLoading(false);
//         setCurrentStep(4);
//         navigate('/Succes');
//       } else {
//         throw new Error('Unexpected response structure');
//       }
//     } catch (error) {
//       console.error('Error making payment request:', error);
//     }
//   }, [stationName, amount, phones, selectHrs, forceUnlock, savePaymentWithPowerBank, setCurrentStep, navigate]);

//   const fetchDataAndMakePayment = useCallback(async () => {
//     console.log("stationName", stationName);

//     try {
//       const stationResponse = await fetch(`${apiBaseUrl}${stationName}`, { method: 'GET' });

//       if (!stationResponse.ok) {
//         throw new Error('Failed to fetch station information');
//       }

//       const stationData_ = await stationResponse.json();

//       const stationIdBattery = stationData_.batteries;
//       setStationData(stationIdBattery);
//     //  console.log("stationIdBattery", stationIdBattery);

//      // await evcPaymentRequest(stationIdBattery);
//      console("filterBatteries", filterBatteries(stationData_));
//     } catch (error) {
//       console.error('Error fetching station data or making payment:', error);
//     }
//   }, [stationName, apiBaseUrl, evcPaymentRequest]);

//   useEffect(() => {
//     if (!hasFetchedData.current) {
//       fetchDataAndMakePayment();
//       hasFetchedData.current = true;
//     }
//   }, [fetchDataAndMakePayment]);

//   return (
//     <div className="payment-container">
//       {loading ? (
//         <Loader message="Payment is Under Process" />
//       ) : (
//         <div className="response--1">
//           <Completed message="The payment is completed" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentProcessing;

// import { useState, useEffect, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import getStationCode from "../components/stations/station";
// import '../assets/styles/PaymentProcessing.css';
// import config from "../config/config";
// import { useAuth } from '../hooks/AuthProvider';
// import Loader from "../components/loader";
// import Completed from "../components/completed";
// import moment from 'moment-timezone'; 
// import PowerBankError from "../components/errorPages/PowerBankError";

// const PaymentProcessing = () => {
//   const [loading, setLoading] = useState(true);
//   const hasFetchedData = useRef(false);
  
//   // const { userInputInfo, paymentCompleted, handleUserInputInfo, setCurrentStep } = useAuth();
//     const { userInputInfo, paymentCompleted, handleUserInputInfo, setCurrentStep,agreement } = useAuth();

//   const { selectHrs, amount, phones, stationId } = userInputInfo;

//   const stationName = getStationCode(stationId);
//   const navigate = useNavigate();

//   const apiBaseUrl = `${config.URL_LOCAL}api/v1/stations/powerBankRouter/`;
//   const paymentURL = `${config.URL_LOCAL}api/v1/stations/payments/savePaymentInfoWithUserInfo`;

//   const timeManager = useCallback(() => {
//     const timeZone = 'Africa/Mogadishu'; 
//     const currentDateTime = moment().tz(timeZone);
    
//     return {
//       createdAt: currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
//       formattedStartTime: currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
//       formattedEndTime: currentDateTime.clone().add(selectHrs, 'hours').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
//       endTimeMilliseconds: selectHrs * 60 * 60 * 1000,
//     };
//   }, [selectHrs]);

//   const filterBatteries = useCallback((batteries) => {
//     return batteries.filter(battery => (
//       battery.lock_status === "1" &&
//       battery.battery_capacity === "100" &&
//       battery.battery_abnormal === "0" &&
//       battery.cable_abnormal === "0" &&
//       battery.contact_abnormal === "0" &&
//       battery.soh === "100"
//     ));
//   }, []);

//   const forceUnlock = useCallback(async (stationIdBattery) => {
//     const slot_id = stationIdBattery[0].slot_id;
//     console.log("Force unlock initiated", slot_id);

//     try {
//       const response = await fetch(`${apiBaseUrl}${stationName}/forceUnlock`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ stationName, slot_id }),
//       });

//       if (!response.ok) throw new Error('Failed to force unlock');
//       console.log("Force unlock successful");
//     } catch (error) {
//       console.error('Error forcing unlock:', error);
//     }
//   }, [stationName, apiBaseUrl]);

//   const savePaymentWithPowerBank = useCallback(async (referenceId, timestamp, description, transactionId, stationIdBattery) => {
//     const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } = timeManager();

//     const newData = {
//       stationName,
//       branch_name: stationId,
//       battery_id: stationIdBattery[0].battery_id,
//       userId: referenceId,
//       slotId: stationIdBattery[0].slot_id,
//       evcReference: referenceId,
//       timestampEvc: timestamp,
//       createdAt,
//       phoneNumber: phones,
//       amount,
//       isPaid: true,
//       endRentTime: formattedEndTime,
//       startTime: formattedStartTime,
//       hoursPaid: selectHrs,
//       millisecondsPaid: endTimeMilliseconds,
//       currency: "USD",
//       paymentStatus: "active",
//       lockStatus: 1,
//       term_and_conditions: agreement

//     };

//     handleUserInputInfo({ selectHrs, amount, phones, hrToMs: endTimeMilliseconds, stationId });

//     try {
//       const response = await fetch(paymentURL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newData),
//       });

//       if (!response.ok) throw new Error('Failed to save payment information');

//       paymentCompleted();
//       setCurrentStep(4);
//       navigate('/Succes', { formattedStartTime,  formattedEndTime});
//     } catch (error) {
//       console.error('Error saving payment information:', error);
//     }
//   }, [timeManager, stationName, stationId, phones, amount, selectHrs, agreement, handleUserInputInfo, paymentURL, paymentCompleted, setCurrentStep, navigate]);

//   const evcPaymentRequest = useCallback(async (stationIdBattery) => {
//     const data = {
//       stationName,
//       userId: phones,
//       amount,
//       accountNo: phones,
//       hours: selectHrs,
//       currency: "USD",
//       description: "wan diray"
//     };

//     try {
//       const response = await fetch(`${config.URL_LOCAL}api/v1/stations/payments/evc_paymentRequest`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) throw new Error('Failed to make payment request');

//       const data_res = await response.json();

//       if (data_res?.params) {
//         const { referenceId, transactionId, description } = data_res.params;
//         const { timestamp } = data_res;

//         await forceUnlock(stationIdBattery);

//         savePaymentWithPowerBank(referenceId, timestamp, description, transactionId, stationIdBattery);
//         setLoading(false);
//         setCurrentStep(4);
//         navigate('/Succes');
//       } else {
//         throw new Error('Unexpected response structure');
//       }
//     } catch (error) {
//       console.error('Error making payment request:', error);
//     }
//   }, [stationName, amount, phones, selectHrs, forceUnlock, savePaymentWithPowerBank, setCurrentStep, navigate]);

//   // const fetchDataAndMakePayment = useCallback(async () => {
//   //   console.log("stationName", stationName);
//   //   try {
//   //     const stationResponse = await fetch(`${apiBaseUrl}${stationName}`, { method: 'GET' });
      
//   //     if (!stationResponse.status==="402") 
//   //         PowerBankError("resourceNotFound");
//   //    //   throw new Error('Failed to fetch station information');

//   //     if (!stationResponse.ok) throw new Error('Failed to fetch station information');

//   //     const stationData_ = await stationResponse.json();

//   //     const stationIdBattery = filterBatteries(stationData_.batteries);
//   //     console.log("stationIdBattery", stationIdBattery);

//   //  //await evcPaymentRequest(stationIdBattery);
//   //    paymentCompleted();
//   //    setCurrentStep(4);
//   //    navigate('/Succes', { formattedStartTime:new Date(),  formattedEndTime:new Date()});

//   //   } catch (error) {
//   //     console.error('Error fetching station data or making payment:', error);
//   //   }
//   // }, [stationName, apiBaseUrl, evcPaymentRequest, filterBatteries]);
//   const fetchDataAndMakePayment = useCallback(async () => {
//     console.log("stationName", stationName);
    
//     try {
//       // Fetch the station data
//       const stationResponse = await fetch(`${apiBaseUrl}${stationName}`, { method: 'GET' });
  
//       // Check for 402 status and handle other errors
//       if (stationResponse.status === 402) {
//         PowerBankError("paymentRequired");
//         return; // Exit the function since 402 should be handled separately
//       }
      
//       if (!stationResponse.ok) {
//         throw new Error('Failed to fetch station information');
//       }
  
//       // Parse the response as JSON
//       const stationData_ = await stationResponse.json();
      
//       // Filter batteries (assuming filterBatteries is a valid function)
//       const stationIdBattery = filterBatteries(stationData_.batteries);
//       console.log("stationIdBattery", stationIdBattery);
  
//       // Call payment request (assuming evcPaymentRequest is a valid function)
//       await evcPaymentRequest(stationIdBattery);
  
//       // If payment is completed, navigate to the success page
//       paymentCompleted();
//       setCurrentStep(4);
//       navigate('/Succes', { formattedStartTime: new Date(), formattedEndTime: new Date() });
  
//     } catch (error) {
//       console.error('Error fetching station data or making payment:', error);
//     }
//   }, [stationName, apiBaseUrl, evcPaymentRequest, filterBatteries, navigate, setCurrentStep]);
  
  
//   useEffect(() => {
//     if (!hasFetchedData.current) {
//       fetchDataAndMakePayment();
//       hasFetchedData.current = true;
//     }
//   }, [fetchDataAndMakePayment]);

//   return (
//     <div className="payment-container">
//       {loading ? (
//         <Loader message="Payment is Under Process" />
//       ) : (
//         <div className="response--1">
//           <Completed message="The payment is completed" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentProcessing;




// import { useState, useEffect, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import getStationCode from "../components/stations/station";
// import '../assets/styles/PaymentProcessing.css';
// import config from "../config/config";
// import { useAuth } from '../hooks/AuthProvider';
// import Loader from "../components/loader";
// import Completed from "../components/completed";
// import moment from 'moment-timezone'; 
// import { ToastContainer, toast } from 'react-toastify';  // Import Toastify
// import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS

// const PaymentProcessing = () => {
//   const [loading, setLoading] = useState(true);
//   const hasFetchedData = useRef(false);

//   const { userInputInfo, paymentCompleted, handleUserInputInfo, setCurrentStep, agreement } = useAuth();
//   const { selectHrs, amount, phones, stationId } = userInputInfo;

//   const stationName = getStationCode(stationId);
//   const navigate = useNavigate();
//   const apiBaseUrl = `${config.URL_LOCAL}api/v1/stations/powerBankRouter/`;
//   const paymentURL = `${config.URL_LOCAL}api/v1/stations/payments/savePaymentInfoWithUserInfo`;

//   const timeManager = useCallback(() => {
//     const timeZone = 'Africa/Mogadishu'; 
//     const currentDateTime = moment().tz(timeZone);
    
//     return {
//       createdAt: currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
//       formattedStartTime: currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
//       formattedEndTime: currentDateTime.clone().add(selectHrs, 'hours').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
//       endTimeMilliseconds: selectHrs * 60 * 60 * 1000,
//     };
//   }, [selectHrs]);

//   const filterBatteries = useCallback((batteries) => {
//     return batteries.filter(battery => (
//       battery.lock_status === "1" &&
//       battery.battery_capacity === "100" &&
//       battery.battery_abnormal === "0" &&
//       battery.cable_abnormal === "0" &&
//       battery.contact_abnormal === "0" &&
//       battery.soh === "100"
//     ));
//   }, []);

//   // const forceUnlock = useCallback(async (stationIdBattery) => {
//   //   const slot_id = stationIdBattery[0].slot_id;
//   //   console.log("Force unlock initiated", slot_id);

//   //   try {
//   //     const response = await fetch(`${apiBaseUrl}${stationName}/forceUnlock`, {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json'
//   //       },
//   //       body: JSON.stringify({ stationName, slot_id }),
//   //     });

//   //     if (!response.ok)
//   //       toast.error("Failed to  unlock the powerbank");  // Show error toast
//   //        // Try to force unlock the power bank
//   //     // if (!response.ok)
//   //     //  
//   //        throw new Error('Failed to force unlock');
      
//   //   } catch (error) {
//   //     console.error('Error forcing unlock:', error);
//   //     toast.error("Error forcing unlock");  // Show error toast
//   //   }
//   // }, [stationName, apiBaseUrl]);
//   const forceUnlock = useCallback(async (stationIdBattery) => {
//     const slot_id = stationIdBattery[0].slot_id;
//     console.log("Force unlock initiated", slot_id);
  
//     let attempts = 0;
//     const maxAttempts = 3;
  
//     while (attempts < maxAttempts) {
//       try {
//         // Try to force unlock the power bank
//         const response = await fetch(`${apiBaseUrl}${stationName}/forceUnlock`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ stationName, slot_id }),
//         });
  
//         if (response.ok) {
//           console.log("Force unlock successful");
//           toast.success("Powerbank unlocked successfully!");  // Show success toast
          
//           return; // Exit the function if successful
//         }
  
//         attempts += 1;
//         console.warn(`Attempt ${attempts} to force unlock failed`);
  
//         // If the unlock failed, throw an error to trigger retry
//         if (attempts >= maxAttempts) {
//           throw new Error('Failed to force unlock after 3 attempts');
//         }
  
//       } catch (error) {
//         console.error(`Error forcing unlock on attempt ${attempts}:`, error);
  
//         if (attempts >= maxAttempts) {
//           toast.error("Failed to unlock the powerbank after 3 attempts.");  // Show error toast after max attempts
//           break;  // Stop retrying after maxAttempts
//         } else {
//           toast.warn(`Retrying unlock... (${attempts}/${maxAttempts})`);  // Show retry message
//         }
//       }
//     }
//   }, [stationName, apiBaseUrl]);
  
//   // const savePaymentWithPowerBank = useCallback(async (referenceId, timestamp, description, transactionId, stationIdBattery) => {
//   //   const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } = timeManager();

//   //   const newData = {
//   //     stationName,
//   //     branch_name: stationId,
//   //     battery_id: stationIdBattery[0].battery_id,
//   //     userId: referenceId,
//   //     slotId: stationIdBattery[0].slot_id,
//   //     evcReference: referenceId,
//   //     timestampEvc: timestamp,
//   //     createdAt,
//   //     phoneNumber: phones,
//   //     amount,
//   //     isPaid: true,
//   //     endRentTime: formattedEndTime,
//   //     startTime: formattedStartTime,
//   //     hoursPaid: selectHrs,
//   //     millisecondsPaid: endTimeMilliseconds,
//   //     currency: "USD",
//   //     paymentStatus: "active",
//   //     lockStatus: 1,
//   //     term_and_conditions: agreement
//   //   };

//   //   handleUserInputInfo({ selectHrs, amount, phones, hrToMs: endTimeMilliseconds, stationId });

//   //   try {
//   //     const response = await fetch(paymentURL, {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json'
//   //       },
//   //       body: JSON.stringify(newData),
//   //     });

//   //     if (!response.ok) throw new Error('Failed to save payment information');

//   //     toast.success("Payment saved successfully!");  // Show success toast
//   //     paymentCompleted();
//   //     setCurrentStep(4);
//   //     navigate('/Succes', { formattedStartTime,  formattedEndTime });
//   //   } catch (error) {
//   //     console.error('Error saving payment information:', error);
//   //     toast.error("Error saving payment information");  // Show error toast
//   //   }
//   // }, [timeManager, stationName, stationId, phones, amount, selectHrs, agreement, handleUserInputInfo, paymentURL, paymentCompleted, setCurrentStep, navigate]);
//   const savePaymentWithPowerBank = useCallback(async (referenceId, timestamp, description, transactionId, stationIdBattery) => {
//     const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } = timeManager();
  
//     const newData = {
//       stationName,
//       branch_name: stationId,
//       battery_id: stationIdBattery[0].battery_id,
//       userId: referenceId,
//       slotId: stationIdBattery[0].slot_id,
//       evcReference: referenceId,
//       timestampEvc: timestamp,
//       createdAt,
//       phoneNumber: phones,
//       amount,
//       isPaid: true,
//       endRentTime: formattedEndTime,
//       startTime: formattedStartTime,
//       hoursPaid: selectHrs,
//       millisecondsPaid: endTimeMilliseconds,
//       currency: "USD",
//       paymentStatus: "active",
//       lockStatus: 1,
//       term_and_conditions: agreement
//     };
  
//     handleUserInputInfo({ selectHrs, amount, phones, hrToMs: endTimeMilliseconds, stationId });
  
//     let attempts = 0;
//     const maxAttempts = 3;
  
//     while (attempts < maxAttempts) {
//       try {
//         // Attempt to save payment information
//         const response = await fetch(paymentURL, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(newData),
//         });
  
//         if (!response.ok) {
//           throw new Error('Failed to save payment information');
//         }
  
//         // If the request is successful
//         toast.success("Payment paid successfully!");  // Show success toast
//         paymentCompleted();
//         setCurrentStep(4);
//         navigate('/Succes', { formattedStartTime, formattedEndTime });
//         return; // Exit the loop after success
//       } catch (error) {
//         attempts += 1;
//         console.error(`Error saving payment information, attempt ${attempts}:`, error);
  
//         if (attempts >= maxAttempts) {
//           toast.error("Failed to save payment information after 3 attempts.");  // Show final error toast

//           break; // Stop retrying after 3 attempts
//         } else {
//           toast.warn(`Retrying to save payment... Attempt ${attempts}/${maxAttempts}`);  // Show retry toast
//         }
//       }
//     }
//   }, [timeManager, stationName, stationId, phones, amount, selectHrs, agreement, handleUserInputInfo, paymentURL, paymentCompleted, setCurrentStep, navigate]);
  
//   // const evcPaymentRequest = useCallback(async (stationIdBattery) => {
//   //   const data = {
//   //     stationName,
//   //     userId: phones,
//   //     amount,
//   //     accountNo: phones,
//   //     hours: selectHrs,
//   //     currency: "USD",
//   //     description: "wan diray"
//   //   };

//   //   try {
//   //     const response = await fetch(`${config.URL_LOCAL}api/v1/stations/payments/evc_paymentRequest`, {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json'
//   //       },
//   //       body: JSON.stringify(data),
//   //     });

//   //     if (!response.ok) throw new Error('Failed to make payment request');

//   //     const data_res = await response.json();

//   //     if (data_res?.params) {
//   //       const { referenceId, transactionId, description } = data_res.params;
//   //       const { timestamp } = data_res;

//   //       await forceUnlock(stationIdBattery);

//   //       savePaymentWithPowerBank(referenceId, timestamp, description, transactionId, stationIdBattery);
//   //       setLoading(false);
//   //       setCurrentStep(4);
//   //       navigate('/Succes');
//   //     } else {
//   //       throw new Error('Unexpected response structure');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error making payment request:', error);
//   //     toast.error("Error processing payment request");  // Show error toast
//   //   }
//   // }, [stationName, amount, phones, selectHrs, forceUnlock, savePaymentWithPowerBank, setCurrentStep, navigate]);
//   const evcPaymentRequest = useCallback(async (stationIdBattery) => {
//     const data = {
//       stationName,
//       userId: phones,
//       amount,
//       accountNo: phones,
//       hours: selectHrs,
//       currency: "USD",
//       description: "wan diray",
//     };
  
//     let attempts = 0;
//     const maxAttempts = 3;
  
//     while (attempts < maxAttempts) {
//       try {
//         const response = await fetch(`${config.URL_LOCAL}api/v1/stations/payments/evc_paymentRequest`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//         });
  
//         if (!response.ok) throw new Error('Failed to make payment request');
  
//         const data_res = await response.json();
  
//         if (data_res?.params) {
//           const { referenceId, transactionId, description } = data_res.params;
//           const { timestamp } = data_res;
  
//           // Force unlock the battery
//           await forceUnlock(stationIdBattery);
  
//           // Proceed to save the payment with the power bank
//           await savePaymentWithPowerBank(referenceId, timestamp, description, transactionId, stationIdBattery);
  
//           // Stop loading and update the step
//           setLoading(false);
//           setCurrentStep(4);
//           navigate('/Succes');
  
//           return; // Exit the loop on success
//         } else {
//           throw new Error('Unexpected response structure');
//         }
  
//       } catch (error) {
//         attempts += 1;
//         console.error(`Error making payment request, attempt ${attempts}:`, error);
  
//         if (attempts >= maxAttempts) {
//           toast.error("Failed to process payment after 3 attempts.");  // Show final error toast after max attempts
//           break;  // Stop retrying after 3 attempts
//         } else {
//           toast.warn(`Retrying payment request... Attempt ${attempts}/${maxAttempts}`);  // Show retry warning toast
//         }
//       }
//     }
//   }, [stationName, amount, phones, selectHrs, forceUnlock, savePaymentWithPowerBank, setCurrentStep, navigate]);
  
//   const fetchDataAndMakePayment = useCallback(async () => {
//     console.log("stationName", stationName);
    
//     try {
//       const stationResponse = await fetch(`${apiBaseUrl}${stationName}`, { method: 'GET' });

//       if (stationResponse.status === 402) {
//         toast.error("walal station wa offiline!. ");  // Use toast.error for 402 status
//         setTimeout(() => {
//           navigate(`/ServiceBooking/${stationId}`);  // Redirect to your desired page
//         }, 3000);
//         // setCurrentStep(0);
//         // navigate(`/ServiceBooking/${stationId}`);
//         return;
//       }

//       if (!stationResponse.ok) {
//         toast.error("Waxa jirta cilada xaga internet ah, markale isku day walal adu mahadsan");
//         setTimeout(() => {
//           navigate(`/ServiceBooking/${stationId}`);  // Redirect to your desired page
//         }, 3000);  // Show error toast
//         throw new Error('Failed to fetch station information');
//       }

//       const stationData_ = await stationResponse.json();
//       const stationIdBattery = filterBatteries(stationData_.batteries);
//       console.log("stationIdBattery", stationIdBattery);  
//      // await evcPaymentRequest(stationIdBattery);

//       paymentCompleted();
//       setCurrentStep(4);
//       navigate('/Succes', { formattedStartTime: new Date(), formattedEndTime: new Date() });

//     } catch (error) {
//       console.error('Error fetching station data or making payment:', error);
//       toast.error("Error fetching station data or making payment");  // Show error toast
//     }
//   }, [stationName, apiBaseUrl, evcPaymentRequest, filterBatteries, navigate, setCurrentStep]);

//   useEffect(() => {
//     // const batteries = [
//     //   {
//     //     battery_id: "BATT1234",
//     //     lock_status: "1",
//     //     battery_capacity: "100",
//     //     battery_abnormal: "0",
//     //     cable_abnormal: "0",
//     //     contact_abnormal: "0",
//     //     soh: "100",
//     //     slot_id: "SLOT001"
//     //   },
//     //   {
//     //     battery_id: "BATT5678",
//     //     lock_status: "1",
//     //     battery_capacity: "100",
//     //     battery_abnormal: "0",
//     //     cable_abnormal: "0",
//     //     contact_abnormal: "0",
//     //     soh: "100",
//     //     slot_id: "SLOT002"
//     //   },
//     //   {
//     //     battery_id: "BATT9101",
//     //     lock_status: "0",  // Doesn't match filter (lock_status not "1")
//     //     battery_capacity: "100",
//     //     battery_abnormal: "0",
//     //     cable_abnormal: "0",
//     //     contact_abnormal: "0",
//     //     soh: "100",
//     //     slot_id: "SLOT003"
//     //   },
//     //   {
//     //     battery_id: "BATT1122",
//     //     lock_status: "1",
//     //     battery_capacity: "95",  // Doesn't match filter (battery_capacity not "100")
//     //     battery_abnormal: "0",
//     //     cable_abnormal: "0",
//     //     contact_abnormal: "0",
//     //     soh: "100",
//     //     slot_id: "SLOT004"
//     //   },
//     //   {
//     //     battery_id: "BATT3344",
//     //     lock_status: "1",
//     //     battery_capacity: "100",
//     //     battery_abnormal: "0",
//     //     cable_abnormal: "0",
//     //     contact_abnormal: "0",
//     //     soh: "100",
//     //     slot_id: "SLOT005"
//     //   }
//     // ];
    
//     // Filtering the batteries based on your condition

    
    
//     if (!hasFetchedData.current) {
//       fetchDataAndMakePayment();
     
//       hasFetchedData.current = true;
//     }
//   }, [fetchDataAndMakePayment]);

//   return (
//     <div className="payment-container">
//       {loading ? (
//         <Loader message="Payment is Under Process" />
//       ) : (
//         <div className="response--1">
//           <Completed message="The payment is completed" />
//         </div>
//       )}

//       {/* Toast container to display toasts */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default PaymentProcessing;





import { useState, useEffect, useRef, useCallback } from "react";
import '../assets/styles/PaymentProcessing.css';

import { useNavigate } from "react-router-dom";
import { useRetries } from '../hooks/useRetries';  // Custom Hook for retries
import { fetchStationData, forceUnlock } from "../services/stationService";  // Service for station API
import { savePayment, evcPaymentRequest } from "../services/paymentService";  // Service for payment API
import Loader from "../components/loader";
import Completed from "../components/completed";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import config from "../config/config";
import { useAuth } from '../hooks/AuthProvider';
import getStationCode from "../components/stations/station";
import moment from "moment-timezone";
const PaymentProcessing = () => {
  const [loading, setLoading] = useState(true);
  const hasFetchedData = useRef(false);
  const { withRetry } = useRetries(3);  // Max attempts = 3 for retry logic
  const { userInputInfo, paymentCompleted, handleUserInputInfo, setCurrentStep, agreement } = useAuth();
  const { selectHrs, amount, phones, stationId } = userInputInfo;
  const stationName = getStationCode(stationId);
  const navigate = useNavigate();
  const apiBaseUrl = `${config.URL_LOCAL}api/v1/stations/powerBankRouter/`;
  const paymentURL = `${config.URL_LOCAL}api/v1/stations/payments/savePaymentInfoWithUserInfo`;

  const timeManager = useCallback(() => {
    const timeZone = 'Africa/Mogadishu'; 
    const currentDateTime = moment().tz(timeZone);
    
    return {
      createdAt: currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      formattedStartTime: currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      formattedEndTime: currentDateTime.clone().add(selectHrs, 'hours').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      endTimeMilliseconds: selectHrs * 60 * 60 * 1000,
    };
  }, [selectHrs]);
  const filterBatteries = useCallback((batteries) => {
    return batteries.filter(battery => (
      battery.lock_status === "1" &&
      battery.battery_capacity === "100" &&
      battery.battery_abnormal === "0" &&
      battery.cable_abnormal === "0" &&
      battery.contact_abnormal === "0" &&
      battery.soh === "100"
    ));
  }, []);
  const savePaymentWithRetries = useCallback(async (referenceId, timestamp, description, transactionId, stationIdBattery) => {
    const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } = timeManager();
    const newData = {
      stationName,
      branch_name: stationId,
      battery_id: stationIdBattery[0].battery_id,
      userId: referenceId,
      slotId: stationIdBattery[0].slot_id,
      evcReference: referenceId,
      timestampEvc: timestamp,
      createdAt,
      phoneNumber: phones,
      amount,
      isPaid: true,
      endRentTime: formattedEndTime,
      startTime: formattedStartTime,
      hoursPaid: selectHrs,
      millisecondsPaid: endTimeMilliseconds,
      currency: "USD",
      paymentStatus: "active",
      lockStatus: 1,
      term_and_conditions: agreement,
    };

    handleUserInputInfo({ selectHrs, amount, phones, hrToMs: endTimeMilliseconds, stationId, millisecondsPaid:endTimeMilliseconds });

    try {
      await withRetry(savePayment, [paymentURL, newData]);
      toast.success("Payment saved successfully!");
      paymentCompleted();
      setCurrentStep(4);
      console.log("formattedStartTime", formattedStartTime);
    
      console.log("endTimeMilliseconds", endTimeMilliseconds);
      console.log("millisecondsPaid", endTimeMilliseconds);

      navigate('/Succes', {
        state: {
          createdAt,
          formattedStartTime,
          formattedEndTime,
          endTimeMilliseconds,
          millisecondsPaid: endTimeMilliseconds
        }
      });
          } catch (error) {
      toast.error("Failed to save payment after multiple attempts.");
      setTimeout(() => {
        navigate(`/ServiceBooking/${stationId}`);
        
      }, 3000);
      console.error("Error saving payment:", error);
    }
  }, [timeManager, stationName, stationId, phones, amount, selectHrs, agreement, handleUserInputInfo, withRetry, paymentURL, paymentCompleted, setCurrentStep, navigate]);

  const processPayment = useCallback(async (stationIdBattery) => {
    const data = {
      stationName,
      userId: phones,
      amount,
      accountNo: phones,
      hours: selectHrs,
      currency: "USD",
      description: "wan diray",
    };

    try {
      const paymentResponse = await withRetry(evcPaymentRequest, [data, `${config.URL_LOCAL}api/v1/stations/payments/evc_paymentRequest`]);
     // const { referenceId, transactionId, description } = data_res.params;
//         const { timestamp } = data_res
      const { referenceId, transactionId, description } = paymentResponse.params;
      const { timestamp } = paymentResponse;
      
      await withRetry(forceUnlock, [apiBaseUrl, stationName, stationIdBattery[0].slot_id]);  // Force unlock logic
      await savePaymentWithRetries(referenceId, timestamp, description, transactionId, stationIdBattery);  // Save payment logic
    } catch (error) {
      toast.error("Payment failed after multiple attempts.");
      setTimeout(() => {
        navigate(`/ServiceBooking/${stationId}`);
        
      }, 3000);
      console.error("Error processing payment:", error);
    }
  }, [stationName, phones, amount, selectHrs, withRetry, apiBaseUrl, savePaymentWithRetries, navigate, stationId]);

  useEffect(() => {
    if (!hasFetchedData.current) {
      fetchStationData(apiBaseUrl, stationName)
        .then(stationData => {
          const stationIdBattery = filterBatteries(stationData.batteries);
          return processPayment(stationIdBattery);
        })
        .catch(error => {
          toast.error("Failed to fetch station data.");
          setTimeout(() => {
            navigate(`/ServiceBooking/${stationId}`);
            
          }, 3000);
       
          console.error("Error fetching station data:", error);
        });
      
      hasFetchedData.current = true;
    }
  }, [apiBaseUrl, stationName, processPayment, filterBatteries]);

  return (
    <div className="payment-container">
      {loading ? <Loader message="Payment is Under Process" /> : <Completed message="The payment is completed" />}
      <ToastContainer />
    </div>
  );
};

export default PaymentProcessing;
