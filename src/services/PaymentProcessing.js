


import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRetries } from '../hooks/useRetries';  // Custom Hook for retries
import { fetchStationData, forceUnlock } from "../services/stationService";  // Service for station API
import { savePayment, evcPaymentRequest } from "../services/paymentService";  // Service for payment API
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
  const { withRetry } = useRetries(1);  // Max attempts = 3 for retry logic
  const { userInputInfo, paymentCompleted, handleUserInputInfo, setCurrentStep, agreement } = useAuth();
  const { selectHrs, amount, phones, stationId } = userInputInfo;
  const stationName = getStationCode(stationId);
  const navigate = useNavigate();
  const apiBaseUrl = `${config.URL}api/v1/stations/powerBankRouter/`;
  const paymentURL = `${config.URL}api/v1/stations/payments/savePaymentInfoWithUserInfo`;
  // const timeManager = useCallback(() => {
  //   const timeZone = 'Africa/Mogadishu'; 
  //   const currentDateTime = moment().tz(timeZone);
    
  //   return {
  //     createdAt: currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
  //     formattedStartTime: currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
  //     formattedEndTime: currentDateTime.clone().add(selectHrs, 'hours').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
  //     endTimeMilliseconds: selectHrs * 60 * 60 * 1000,
  //   };
  // }, [selectHrs]);


  

const timeManager = useCallback(() => {
  const timeZone = 'Africa/Mogadishu'; 
  const currentDateTime = moment().tz(timeZone);

  // Check if `selectHrs` is in minutes or hours
  const isMinutes = selectHrs >= 20 && selectHrs <= 40;

  // Calculate the end time based on whether it's minutes or hours
  const duration = isMinutes ? selectHrs : selectHrs * 60;

  return {
    createdAt: currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    formattedStartTime: currentDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    formattedEndTime: currentDateTime.clone().add(duration, 'minutes').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    endTimeMilliseconds: duration * 60 * 1000, // Convert to milliseconds
  };
}, [selectHrs]);

  const savePaymentWithRetries = useCallback(async (referenceId, timestamp, description, transactionId, stationIdBattery) => {
   
    const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } = timeManager();
    const hoursPaidFromMill = endTimeMilliseconds/3600000;

    const newData = {
      stationName,
      branch_name: stationId,
      battery_id: stationIdBattery[0].battery_id,
      userId: referenceId,
      slot_id: stationIdBattery[0].slot_id,
      evcReference: referenceId,
      timestampEvc: timestamp,
      createdAt,
      phoneNumber: phones,
      amount,
      isPaid: true,
      endRentTime: formattedEndTime,
      startTime: formattedStartTime,
      hoursPaid: hoursPaidFromMill,
      millisecondsPaid: endTimeMilliseconds,
      currency: "USD",
      paymentStatus: "active",
      lockStatus: 1,
      term_and_conditions: agreement,
    };

    handleUserInputInfo({ selectHrs:hoursPaidFromMill, amount, phones, hrToMs: endTimeMilliseconds, stationId, millisecondsPaid: endTimeMilliseconds });

    try {
      await withRetry(savePayment, [paymentURL, newData]);
      toast.success("Payment saved successfully!");
      paymentCompleted();
      setCurrentStep(4);
      setLoading(false);
      console.log("Payment saved successfully!");
      console.log("createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds:", createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds);
      navigate('/Succes', { state: { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } });
    } catch (error) {

      toast.error("Failed to save payment after multiple attempts.");
      navigate('/ServiceBooking');
    }
  }, [timeManager, stationName, stationId, phones, amount, selectHrs, agreement, handleUserInputInfo, withRetry, paymentURL, paymentCompleted, setCurrentStep, navigate]);
  const filterBatteries = (batteries) => {
        return batteries.filter(battery => {
            return (
                battery.lock_status === "1" &&
                battery.battery_capacity === "100" &&
                battery.battery_abnormal === "0" &&
                battery.cable_abnormal === "0" &&
                battery.contact_abnormal === "0" &&
                battery.soh === "100"
           
            );
        });
    }

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
      const paymentResponse = await withRetry(evcPaymentRequest, [data, `${config.URL}api/v1/stations/payments/evc_paymentRequest`]);
      const { referenceId, transactionId, description, timestamp } = paymentResponse.params;
      const slot_id = stationIdBattery[0].slot_id;
      await withRetry(forceUnlock, [apiBaseUrl, stationName, slot_id]);  // Force unlock logic
      await savePaymentWithRetries(referenceId, timestamp, description, transactionId, stationIdBattery);  // Save payment logic
    } catch (error) {
      toast.error("Payment failed after multiple attempts.");
      navigate('/ServiceBooking');

    }
  }, [stationName, phones, amount, selectHrs, withRetry, apiBaseUrl, savePaymentWithRetries, navigate]);

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
