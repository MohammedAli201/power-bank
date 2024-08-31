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
//   const apiBaseUrl = `${config.URL_LOCAL}api/v1/stations/powerBankRouter/`;
//   const paymentURL = `${config.URL_LOCAL}api/v1/stations/payments/savePaymentInfoWithUserInfo`;

//   const [stationDataBattery, setStationData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const hasFetchedData = useRef(false);
//   const { userInputInfo, paymentCompleted, handleUserInputInfo, setCurrentStep } = useAuth();
//   const { selectHrs, amount, phones, hrToMs, stationId } = userInputInfo;
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
  
//   const timeManager = useCallback(() => {
//       const timeZone = 'Africa/Mogadishu'; // Timezone for Mogadishu, Somalia
  
//       // Get the current time in Mogadishu
//       const currentDateTime = moment().tz(timeZone);
  
//       // Format the current time to the desired string format
//       const formattedStartTime = currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  
//       // Calculate the end time by adding the selected hours
//       const endTime = currentDateTime.clone().add(selectHrs, 'hours');
      
//       // Format the end time to the desired string format
//       const formattedEndTime = endTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    
//       // Calculate the duration in milliseconds
//       const endTimeMilliseconds = selectHrs * 60 * 60 * 1000; 
    
//       // Return the formatted times and other relevant information
//       return {
//           createdAt: formattedStartTime,
//           formattedStartTime,
//           formattedEndTime,
//           endTimeMilliseconds,
//       };
//   }, [selectHrs]);
  
//   // Example usage:
 



 
//   // const timeManager = useCallback((timestamp) => {
//   //   const timeZone = 'Africa/Mogadishu'; // Timezone for Mogadishu, Somalia
  
//   //   const startTime = new Date(timestamp); // Use the provided timestamp as the start time
//   //   const zonedStartTime = toZonedTime(startTime, timeZone); // Convert UTC to Mogadishu time
//   //   const formattedStartTime = formatInTimeZone(zonedStartTime, timeZone, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"); // Convert to ISO 8601 format in Mogadishu time
    
//   //   const endTime = addHours(zonedStartTime, selectHrs); // Calculate end time in Mogadishu time
//   //   const formattedEndTime = formatInTimeZone(endTime, timeZone, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"); // Convert to ISO 8601 format
  
//   //   const createdAt = formattedStartTime; // Reuse the formatted start time
//   //   const endTimeMilliseconds = selectHrs * 60 * 60 * 1000; // End time in milliseconds
  
//   //   return {
//   //     createdAt,
//   //     formattedStartTime,
//   //     formattedEndTime,
//   //     endTimeMilliseconds,
//   //   };
//   // }, [selectHrs]);
  
  
//   // const timeManager = useCallback(() => {
//   //   const startTime = new Date();
//   //   const formattedStartTime = startTime.toISOString(); // Convert to ISO 8601 format
//   //   const endTime = new Date(startTime.getTime() + selectHrs * 60 * 60 * 1000); // Calculate end time
//   //   const formattedEndTime = endTime.toISOString(); // Convert to ISO 8601 format
//   //   const createdAt = formattedStartTime; // Reuse the formatted start time
//   //   const endTimeMilliseconds = selectHrs * 60 * 60 * 1000; // End time in milliseconds

//   //   return {
//   //     createdAt,
//   //     formattedStartTime,
//   //     formattedEndTime,
//   //     endTimeMilliseconds
//   //   };
//   // }, [selectHrs]);

//   const forceUnlock = useCallback(async (stationIdBattery) => {
//     console.log("Force unlock initiated", stationIdBattery[0].slot_id);
//     const slot_id = stationIdBattery[0].slot_id
//    // const battery_id = filterBatteries(stationIdBattery)[0].battery_id;
//    // const batteryName = filterBatteries(stationIdBattery)[0].battery_name;
//    console.log("stationIdBattery", filterBatteries(stationIdBattery))
//     setSlotId_selected(slot_id);

//     try {
//       const response = await fetch(`${config.URL_LOCAL}api/v1/stations/powerBankRouter/${stationName}/forceUnlock`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ stationName, slot_id }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to force unlock');
//       }

//       console.log("Force unlock successful");
//     } catch (error) {
//       console.error('Error forcing unlock:', error);
//     }
//   }, [stationName]);

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
//   }, [timeManager, stationName, stationId, phones, amount, selectHrs, handleUserInputInfo, paymentURL, paymentCompleted, setCurrentStep, navigate]);

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

//       if (!response.ok) {
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
//     try {
//       const stationResponse = await fetch(`${apiBaseUrl}${stationName}`, { method: 'GET' });

//       if (!stationResponse.ok) {
//         throw new Error('Failed to fetch station information');
//       }

//       const stationData_ = await stationResponse.json();

//       const stationIdBattery = stationData_.batteries;
//       setStationData(stationIdBattery);

//       await evcPaymentRequest(stationIdBattery);
//     } catch (error) {
//       console.error('Error fetching station data or making payment:', error);
//     }
//   }, [stationName, apiBaseUrl, handleUserInputInfo, selectHrs, amount, phones, hrToMs, stationId, evcPaymentRequest]);

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
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import getStationCode from "../components/stations/station";
import '../assets/styles/PaymentProcessing.css';
import config from "../config/config";
import { useAuth } from '../hooks/AuthProvider';
import Loader from "../components/loader";
import Completed from "../components/completed";
import moment from 'moment-timezone'; 

const PaymentProcessing = () => {
  const [loading, setLoading] = useState(true);
  const hasFetchedData = useRef(false);
  
  const { userInputInfo, paymentCompleted, handleUserInputInfo, setCurrentStep } = useAuth();
  const { selectHrs, amount, phones, stationId } = userInputInfo;

  const stationName = getStationCode(stationId);
  const navigate = useNavigate();

  const apiBaseUrl = `${config.URL}api/v1/stations/powerBankRouter/`;
  const paymentURL = `${config.URL}api/v1/stations/payments/savePaymentInfoWithUserInfo`;

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

  const forceUnlock = useCallback(async (stationIdBattery) => {
    const slot_id = stationIdBattery[0].slot_id;
    try {
      const response = await fetch(`${apiBaseUrl}${stationName}/forceUnlock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stationName, slot_id }),
      });

      if (!response.ok) throw new Error('Failed to force unlock');
      console.log("Force unlock successful");
    } catch (error) {
      console.error('Error forcing unlock:', error);
    }
  }, [stationName, apiBaseUrl]);

  const savePaymentWithPowerBank = useCallback(async (referenceId, timestamp, description, transactionId, stationIdBattery) => {
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
      lockStatus: 1
    };

    handleUserInputInfo({ selectHrs, amount, phones, hrToMs: endTimeMilliseconds, stationId });

    try {
      const response = await fetch(paymentURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) throw new Error('Failed to save payment information');

      paymentCompleted();
      setCurrentStep(4);
      navigate('/Succes');
    } catch (error) {
      console.error('Error saving payment information:', error);
    }
  }, [timeManager, stationName, stationId, phones, amount, selectHrs, handleUserInputInfo, paymentURL, paymentCompleted, setCurrentStep, navigate]);

  const evcPaymentRequest = useCallback(async (stationIdBattery) => {
    const data = {
      stationName,
      userId: phones,
      amount,
      accountNo: phones,
      hours: selectHrs,
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

      if (!response.ok) throw new Error('Failed to make payment request');

      const data_res = await response.json();

      if (data_res?.params) {
        const { referenceId, transactionId, description } = data_res.params;
        const { timestamp } = data_res;

        await forceUnlock(stationIdBattery);

        savePaymentWithPowerBank(referenceId, timestamp, description, transactionId, stationIdBattery);
        setLoading(false);
        setCurrentStep(4);
        navigate('/Succes');
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error making payment request:', error);
    }
  }, [stationName, amount, phones, selectHrs, forceUnlock, savePaymentWithPowerBank, setCurrentStep, navigate]);

  const fetchDataAndMakePayment = useCallback(async () => {
    try {
      const stationResponse = await fetch(`${apiBaseUrl}${stationName}`, { method: 'GET' });

      if (!stationResponse.ok) throw new Error('Failed to fetch station information');

      const stationData_ = await stationResponse.json();

      const stationIdBattery = filterBatteries(stationData_.batteries);

      await evcPaymentRequest(stationIdBattery);
    } catch (error) {
      console.error('Error fetching station data or making payment:', error);
    }
  }, [stationName, apiBaseUrl, evcPaymentRequest, filterBatteries]);

  useEffect(() => {
    if (!hasFetchedData.current) {
      fetchDataAndMakePayment();
      hasFetchedData.current = true;
    }
  }, [fetchDataAndMakePayment]);

  return (
    <div className="payment-container">
      {loading ? (
        <Loader message="Payment is Under Process" />
      ) : (
        <div className="response--1">
          <Completed message="The payment is completed" />
        </div>
      )}
    </div>
  );
};

export default PaymentProcessing;
