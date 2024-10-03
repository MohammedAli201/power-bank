// import { useState, useEffect, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchStationData } from "../services/stationService";  // Service for station API
// import { evcPaymentRequest } from "../services/paymentService";  // Service for payment API
// import Loader from "../components/loader";
// import Completed from "../components/completed";
// import { ToastContainer, toast } from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css'; 
// import '../assets/styles/PaymentProcessing.css';
// import config from "../config/config";
// import { useAuth } from '../hooks/AuthProvider';
// import getStationCode from "../components/stations/station";
// import moment from "moment-timezone";

// const PaymentProcessing = () => {
//   const [loading, setLoading] = useState(true);
//   const hasFetchedData = useRef(false);
//   const { userInputInfo, paymentCompleted, handleUserInputInfo, setCurrentStep, agreement } = useAuth();
//   const { selectHrs, amount, phones, stationId } = userInputInfo;
//   const stationName = getStationCode(stationId);
//   const navigate = useNavigate();
//   const apiBaseUrl = `${config.URL}api/v1/stations/powerBankRouter/`;
  
//   const timeManager = useCallback(() => {
//     const timeZone = 'Africa/Mogadishu'; 
//     const currentDateTime = moment().tz(timeZone);
  
//     // Check if `selectHrs` is in minutes or hours
//     const isMinutes = selectHrs >= 20 && selectHrs <= 40;
  
//     // Calculate the end time based on whether it's minutes or hours
//     const duration = isMinutes ? selectHrs : selectHrs * 60;
  
//     return {
//       createdAt: currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
//       formattedStartTime: currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
//       formattedEndTime: currentDateTime.clone().add(duration, 'minutes').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
//       endTimeMilliseconds: duration * 60 * 1000, // Convert to milliseconds
//       duration,
//     };
//   }, [selectHrs]);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const BullRedisRequest = async (endTimeMilliseconds, phones) => {
//     const data = {
//       rentalId: phones,
//       rentalDurationInMilliseconds: endTimeMilliseconds,
//       userId,
//     };

//     try {
//       const response = await fetch(`${config.URL}api/v1/rentals`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to unlock system');
//       }

//       const rentalData = await response.json();
//       console.log('System unlocked successfully:', rentalData);
//     } catch (error) {
//       console.error('Error unlocking system:', error);
//     }

//   }







//   const processPayment = useCallback(async (stationIdBattery) => {
//     const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } = timeManager();
//       const paidHors = endTimeMilliseconds/3600000
//     const paymentRequestData = {
//       stationName,
//       userId: phones,
//       amount,
//       accountNo: phones,
//       hours: paidHors,
//       currency: "USD",
//       description: "wan diray",
//       // stationId:stationName,
//       // slot_id: stationIdBattery[0].slot_id,
//       // phoneNumber: phones,
//       // branch_name: stationId,
//       // battery_id: stationIdBattery[0].battery_id,
//       // createdAt,
//       // startTime: formattedStartTime,
//       // endRentTime: formattedEndTime,
//       // millisecondsPaid: endTimeMilliseconds,
//       // term_and_conditions: agreement,

//       branch_name: stationId,
//       battery_id: stationIdBattery[0].battery_id,
   
//       slot_id: stationIdBattery[0].slot_id,
      
//       timestampEvc: createdAt,
//       createdAt,
//       phoneNumber: phones,
     
//       isPaid: true,
//       endRentTime: formattedEndTime,
//       startTime: formattedStartTime,
//       hoursPaid: paidHors,
//       millisecondsPaid: endTimeMilliseconds,

//       paymentStatus: "active",
//       lockStatus: 1,
//       term_and_conditions: agreement
//     };

//     try {
//       const paymentResponse = await evcPaymentRequest(paymentRequestData, `${config.URL}api/v1/stations/payments/evc_paymentRequest`);
//       toast.success("Payment processed successfully!");
//       paymentCompleted();
//       setCurrentStep(4);
//       setLoading(false);
//       console.log("Payment response:", paymentResponse);
//       handleUserInputInfo({phones,millisecondsPaid: endTimeMilliseconds });
//       toast.success("Payment processed successfully!");
//      await  BullRedisRequest(endTimeMilliseconds, phones);
      
  
//      // navigate('/Succes', { state: { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } });
//     } catch (error) {
//       toast.error("Payment failed after multiple attempts.");
//       navigate('/ServiceBooking');
//     }
//   }, [timeManager, stationName, phones, amount, stationId, agreement, paymentCompleted, setCurrentStep, handleUserInputInfo, BullRedisRequest, navigate]);

//   const filterBatteries = (batteries) => {
//     return batteries.filter(battery => {
//       return (
//         battery.lock_status === "1" &&
//         battery.battery_capacity === "100" &&
//         battery.battery_abnormal === "0" &&
//         battery.cable_abnormal === "0" &&
//         battery.contact_abnormal === "0" &&
//         battery.soh === "100"
//       );
//     });
//   }

//   const guidGenerator = useCallback(() => {
//     const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
//     return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
//   }, []);

//   const userIdRef = useRef(guidGenerator());
//   const userId = userIdRef.current;



//   useEffect(() => {
//     if (!hasFetchedData.current) {
//       fetchStationData(apiBaseUrl, stationName)
//         .then(stationData => {
//           const stationIdBattery = filterBatteries(stationData.batteries);
//           return processPayment(stationIdBattery);
//         })
//         .catch(error => {
//           toast.error("Failed to fetch station data.");
//           navigate('/ServiceBooking');
//           console.error("Error fetching station data:", error);
//         });
      
//       hasFetchedData.current = true;
//     }
//   }, [apiBaseUrl, stationName, processPayment, navigate]);

//   return (
//     <div className="payment-container">
//       {loading ? <Loader message="Payment is Under Process" /> : <Completed message="The payment is completed" />}
//       <ToastContainer />
//     </div>
//   );
// };

// export default PaymentProcessing;


import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStationData } from "../services/stationService";  // Service for station API
import { evcPaymentRequest } from "../services/paymentService";  // Service for payment API
import Loader from "../components/loader";
import Completed from "../components/completed";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import '../assets/styles/PaymentProcessing.css';
import config from "../config/config";
import { useAuth } from '../hooks/AuthProvider';
import getStationCode from "../components/stations/station";
import moment from "moment-timezone";

const PaymentProcessing = () => {
  const [loading, setLoading] = useState(true);
  const hasFetchedData = useRef(false);
  const { userInputInfo, paymentCompleted, handleUserInputInfo, setCurrentStep, agreement } = useAuth();
  const { selectHrs, amount, phones, stationId } = userInputInfo;
  const stationName = getStationCode(stationId);
  const navigate = useNavigate();
  const apiBaseUrl = `${config.URL}api/v1/stations/powerBankRouter/`;

  const timeManager = useCallback(() => {
    const timeZone = 'Africa/Mogadishu'; 
    const currentDateTime = moment().tz(timeZone);
  
    const isMinutes = selectHrs >= 20 && selectHrs <= 40;
    const duration = isMinutes ? selectHrs : selectHrs * 60;

    return {
      createdAt: currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      formattedStartTime: currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      formattedEndTime: currentDateTime.clone().add(duration, 'minutes').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      endTimeMilliseconds: duration * 60 * 1000, 
      duration,
    };
  }, [selectHrs]);
  const guidGenerator = useCallback(() => {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }, []);
  
  const userIdRef = useRef(guidGenerator());
  const userId = userIdRef.current;

  const BullRedisRequest = useCallback(async ( formattedStartTime,
    formattedEndTime,
    phones,
    userId,endTimeMilliseconds) => {


    const rent ={
      rentalDurationInMilliseconds:endTimeMilliseconds,
      formattedStartTime,
      formattedEndTime,
      rentalId:phones,
      userId,
  
    }

    try {
      const response = await fetch(`${config.URL}api/v1/rentals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rent),
      });

      if (!response.ok) {
        throw new Error('Failed to unlock system');
      }

      const rentalData = await response.json();
      console.log('System unlocked successfully:', rentalData);
    } catch (error) {
      console.error('Error unlocking system:', error);
      toast.error("Failed to unlock the system.");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);


  const processPayment = useCallback(async (stationIdBattery) => {
    const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } = timeManager();
    const paidHors = endTimeMilliseconds / 3600000;

    const paymentRequestData = {
      stationName,
      userId: phones,
      amount,
      accountNo: phones,
      hours: paidHors,
      currency: "USD",
      description: "wan diray",
      branch_name: stationId,
      battery_id: stationIdBattery[0].battery_id,
      slot_id: stationIdBattery[0].slot_id,
      timestampEvc: createdAt,
      createdAt,
      phoneNumber: phones,
      isPaid: true,
      endRentTime: formattedEndTime,
      startTime: formattedStartTime,
      hoursPaid: paidHors,
      millisecondsPaid: endTimeMilliseconds,
      paymentStatus: "active",
      lockStatus: 1,
      term_and_conditions: agreement
    };

    try {
      const paymentResponse = await evcPaymentRequest(paymentRequestData, `${config.URL}api/v1/stations/payments/evc_paymentRequest`);
      toast.success("Payment processed successfully!");
      console.log("Payment response:", paymentResponse);
   
      handleUserInputInfo({ phones, millisecondsPaid: endTimeMilliseconds });
      paymentCompleted();
      setCurrentStep(4);
      setLoading(false);
   const res = await BullRedisRequest(  formattedStartTime,
        formattedEndTime,
        phones,
        userId,endTimeMilliseconds);
        console.log("bull res ",res)
        
     
    } catch (error) {
      toast.error("Payment failed.");
      navigate('/ServiceBooking');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeManager, stationName, phones, amount, stationId, agreement, handleUserInputInfo, BullRedisRequest, paymentCompleted, setCurrentStep, navigate]);

  const filterBatteries = (batteries) => {
    return batteries.filter(battery => (
      battery.lock_status === "1" &&
      battery.battery_capacity === "100" &&
      battery.battery_abnormal === "0" &&
      battery.cable_abnormal === "0" &&
      battery.contact_abnormal === "0" &&
      battery.soh === "100"
    ));
  }

 

  useEffect(() => {
    if (!hasFetchedData.current) {
      fetchStationData(apiBaseUrl, stationName)
        .then(stationData => {
          const stationIdBattery = filterBatteries(stationData.batteries);
          return processPayment(stationIdBattery);
        })
        .catch(error => {
          toast.error("Failed to fetch station data.");
          navigate('/ServiceBooking');
          console.error("Error fetching station data:", error);
        });

      hasFetchedData.current = true;
    }
  }, [apiBaseUrl, stationName, processPayment, navigate]);

  return (
    <div className="payment-container">
      {loading ? <Loader message="Payment is Under Process" /> : <Completed message="The payment is completed" />}
      <ToastContainer />
    </div>
  );
};

export default PaymentProcessing;
