import React ,{useState, useEffect}from "react";
import axios from 'axios';
import ApiService from "./apiService";
const ServiceTimer = ({paymentIsSucced}) => {


    const [isLocked, setIsLocked] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (paymentIsSucced = true);
        fetchData();
        // send api request to unlock power bank
         
       
    if ( localStorage.getItem('paymentStartTime') === null) {
        startTimer();
        }
    // Retrieve the stored start time from local storage on component mount
    const storedStartTime = localStorage.getItem('paymentStartTime');
    if (storedStartTime) {
      const interval = setInterval(() => {
        const startTime = parseInt(storedStartTime, 10);
        const currentTime = Date.now();
        const elapsed = Math.floor((currentTime - startTime) / 1000);
        setElapsedTime(elapsed);
        if (elapsed >= 100) { // 3600 seconds = 1 hour
          setIsLocked(true);
          clearInterval(interval);
        //  lockPowerBank();
        }
      }, 1000);

      return () => clearInterval(interval); // Clear interval on component unmount
    }
  }, []);

  const fetchData = async () => {
    const result = await ApiService({
      apiUrl: "https://jsonplaceholder.typicode.com/todos/1",
      method: "GET",
    });
    if (result.error) {
      setError(result.error);
    } else {
      setResponse(result);

    }
  };

  const startTimer = () => {
    const paymentStartTime = Date.now();
    localStorage.setItem('paymentStartTime', paymentStartTime);
    setElapsedTime(0);
    setIsLocked(false);
  };

  
    return (
 
            <div>
      <p>Elapsed Time: {elapsedTime} seconds</p>
      <p>Status: {isLocked ? 'Locked' : 'Unlocked'}</p>
    </div>
       
    );
}

export default ServiceTimer;