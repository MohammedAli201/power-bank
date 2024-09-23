import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import '../../assets/styles/Success.css';
import config from '../../config/config';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const { userInputInfo, createUserId } = useAuth();
  const { phones, millisecondsPaid } = userInputInfo;
  const { state } = useLocation();
  const { formattedStartTime, formattedEndTime } = state;

  const [isSystemUnlocked, setIsSystemUnlocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const guidGenerator = useCallback(() => {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }, []);
  const userIdRef = useRef(guidGenerator());
  const userId = userIdRef.current;

  // Function to generate a unique user ID
 

  // Fetch rental information and unlock the system
  const fetchRentalInfo = useCallback(async () => {
    const data = {
      rentalId: phones,
      rentalDurationInMilliseconds: millisecondsPaid,
      formattedStartTime,
      formattedEndTime,
      userId,
    };
    createUserId(userId);

    try {
      const response = await fetch(`${config.URL_LOCAL}api/v1/rentals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to unlock system');
      }

      const rentalData = await response.json();
      const startTime = Date.now();
      localStorage.setItem(`${userId}-rentalStartTime`, startTime);
      localStorage.setItem(`${userId}-rentalDuration`, millisecondsPaid);

      setIsSystemUnlocked(true);
      setRemainingTime(millisecondsPaid);

      console.log('System unlocked successfully:', rentalData);
    } catch (error) {
      console.error('Error unlocking system:', error);
    }
  }, [phones, millisecondsPaid, formattedStartTime, formattedEndTime, userId, createUserId]);

  // Update user payment status in the database
  const updateUserPaymentStatus = useCallback(async () => {
    try {
      const response = await fetch(`${config.URL_LOCAL}api/v1/stations/payments/updatePaymentStatus/${phones}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to update user payment status');
      }

      const updatedData = await response.json();
      console.log('User payment status updated successfully:', updatedData);
    } catch (error) {
      console.error('Error updating user payment status:', error);
    }
  }, [phones]);

  // Check and manage the remaining time for the rental
  useEffect(() => {
    const storedStartTime = parseInt(localStorage.getItem(`${userId}-rentalStartTime`), 10);
    const storedDuration = parseInt(localStorage.getItem(`${userId}-rentalDuration`), 10);

    if (storedStartTime && storedDuration) {
      const elapsedTime = Date.now() - storedStartTime;
      const remaining = storedDuration - elapsedTime;
      if (remaining > 0) {
        setRemainingTime(remaining);
        setIsSystemUnlocked(true);
      } else {
        localStorage.removeItem(`${userId}-rentalStartTime`);
        localStorage.removeItem(`${userId}-rentalDuration`);
        setRemainingTime(0);
        setIsSystemUnlocked(false);
      }
    } else if (millisecondsPaid) {
      fetchRentalInfo();
    }

    const interval = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime <= 1000) {
          localStorage.removeItem(`${userId}-rentalStartTime`);
          localStorage.removeItem(`${userId}-rentalDuration`);
          clearInterval(interval);
          setIsSystemUnlocked(false);
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [millisecondsPaid, phones, fetchRentalInfo, userId]);

  // Manually complete the rental and update payment status
  const completeRental = useCallback(async () => {
    setIsSystemUnlocked(false);
    await updateUserPaymentStatus();
  }, [updateUserPaymentStatus]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="container">
      <div className="notification notification--success">
        <h1>{isSystemUnlocked ? 'System Unlocked' : 'System Locked'}</h1>
        <p>{remainingTime > 0 ? `Time remaining: ${formatTime(remainingTime)}` : 'Remaining time is 0s'}</p>
        <button onClick={completeRental} disabled={!isSystemUnlocked}>
          Complete Rental
        </button>
      </div>
    </div>
  );
};

export default Success;
