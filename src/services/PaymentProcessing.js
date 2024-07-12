
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import getStationCode from "../components/stations/station";
import '../assets/styles/PaymentProcessing.css';
import FaceCapture from '../components/FaceCapture';
import config from "../config/config";
import { useAuth } from '../hooks/AuthProvider';

const PaymentProcessing = () => {

  // const location = useLocation();
  // const userInfo = location.state;
  // const stationName = 'WSEP161683346505';
  const apiBaseUrl = `${config.URL}api/v1/stations/powerBankRouter/`;
  const paymentURL = "http://localhost:9000/api/v1/stations/payments/savePaymentInfoWithUserInfo";

  const [error, setError] = useState("");
  const [stationData, setStationData] = useState(null);
  const [paymentIsSucceeded, setPaymentIsSucceeded] = useState(true);
  const [paymentInfores, setPaymentInfores] = useState(null);
  const hasFetchedData = useRef(false);
  const {userInputInfo,paymentCompleted} = useAuth();
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
    const slotId = stationData.batteries[0].slotId;


    try {
      const response = await fetch(`${config.URL}api/v1/stations/powerBankRouter/${stationName}/forceUnlock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stationName, slotId })
      });

      if (!response.ok) {
        throw new Error('Failed to force unlock');
      }

      const data_res = await response.json();
      console.log("Force unlock successful:", data_res);
    } catch (error) {
      console.error('Error forcing unlock:', error);
    }
  }, [stationData, stationName]);

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
  }, [forceUnlock, stationName, amount, phones, selectHrs]);

  const savePaymentWithPowerBank = useCallback(async () => {
    const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } = timeManager();

    const newData = {
      stationName: stationName,
      userId: "EVC-REF-456",
      slotId: 1,
      evcReference: "EVC-REF-456",
      timestampEvc: "2024-07-10T10:00:00Z",
      createdAt: createdAt,
      phoneNumber: phones,
      amount: amount,
      isPaid: true,
      endRentTime: formattedEndTime,
      startTime: formattedStartTime,
      hoursPaid: convertMillisToHours(selectHrs),
      millisecondsPaid: hrToMs,
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
      paymentCompleted();
      navigate('/Success', {
        state: {
          millisecondsPaid: endTimeMilliseconds,
          phoneNumber: phones
        }
      });
      console.log("Payment saved successfully:", res);
    } catch (error) {
      console.error('Error saving payment information:', error);
      setError('Error saving payment information');
    }
  }, [ convertMillisToHours, navigate, paymentURL, timeManager, amount, phones, selectHrs, paymentCompleted, hrToMs, stationName]);

  const fetchDataAndMakePayment = useCallback(async () => {
    try {
      const stationResponse = await fetch(`${apiBaseUrl}${stationName}`, { method: 'GET' });

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
  }, [apiBaseUrl, evcPaymentRequest, stationName]);

  useEffect(() => {
  
    savePaymentWithPowerBank();

    if (!hasFetchedData.current) {
      fetchDataAndMakePayment();
      hasFetchedData.current = true;
    }
  }, [fetchDataAndMakePayment, savePaymentWithPowerBank, userInputInfo]);

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
              stationName={stationName}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentProcessing;
