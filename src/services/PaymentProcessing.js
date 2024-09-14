


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
  const { withRetry } = useRetries(3);  // Max attempts = 3 for retry logic
  const { userInputInfo, paymentCompleted, handleUserInputInfo, setCurrentStep, agreement } = useAuth();
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

    handleUserInputInfo({ selectHrs, amount, phones, hrToMs: endTimeMilliseconds, stationId });

    try {
      await withRetry(savePayment, [paymentURL, newData]);
      toast.success("Payment saved successfully!");
      paymentCompleted();
      setCurrentStep(4);
      setLoading(false);
      navigate('/Succes', { state: { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } });
    } catch (error) {
      toast.error("Failed to save payment after multiple attempts.");
      console.error("Error saving payment:", error);
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
      
      await withRetry(forceUnlock, [apiBaseUrl, stationName, stationIdBattery[0].slot_id]);  // Force unlock logic
      await savePaymentWithRetries(referenceId, timestamp, description, transactionId, stationIdBattery);  // Save payment logic
    } catch (error) {
      toast.error("Payment failed after multiple attempts.");
      console.error("Error processing payment:", error);
    }
  }, [withRetry, phones, amount, selectHrs, apiBaseUrl, stationName, savePaymentWithRetries]);

  useEffect(() => {
    if (!hasFetchedData.current) {
      fetchStationData(apiBaseUrl, stationName)
        .then(stationData => {
          const stationIdBattery = filterBatteries(stationData.batteries);
          return processPayment(stationIdBattery);
        })
        .catch(error => {
          toast.error("Failed to fetch station data.");
          console.error("Error fetching station data:", error);
        });
      
      hasFetchedData.current = true;
    }
  }, [apiBaseUrl, stationName, processPayment]);

  return (
    <div className="payment-container">
      {loading ? <Loader message="Payment is Under Process" /> : <Completed message="The payment is completed" />}
      <ToastContainer />
    </div>
  );
};

export default PaymentProcessing;
