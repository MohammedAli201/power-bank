
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// // import { useLocation } from 'react-router-dom';
// import { useAuth } from '../../hooks/AuthProvider';
// import { connectSocket, socket } from '../../services/websocketService'; // Ensure correct import
// import '../../assets/styles/Success.css';
// import config from '../../config/config';

// import SmsLetter from '../../services/smsLetter';

// const Success = () => {
//   // const [rentalCompleted, setRentalCompleted] = useState({});
//   const { userInputInfo ,createUserId} = useAuth();
//   // const { phones,millisecondsPaid  } = userInputInfo;
//   const millisecondsPaid =20000 ; // Hardcoded for now
//   const phones = "616251068"
//   const [isSent, setIsSent] = useState(false);
//   const [isCompletedRent, setIsCompletedRent ] = useState(false);
//   //console.log('millisecondsPaid:', millisecondsPaid);

//   // get value that was passed from navigator
   
//   //const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds, } = useLocation();


//   const guidGenerator = useCallback(() => {
//     const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
//     return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
//   }, []);

//   const userIdRef = useRef(guidGenerator()); // Generate a unique user ID only once
//   const userId = userIdRef.current;

//   const [isSystemUnlocked, setIsSystemUnlocked] = useState(false);
//   const [remainingTime, setRemainingTime] = useState(0);

//   const fetchRentalInfo = useCallback(async () => {
//     const data = {
//       rentalId: phones,
//       rentalDurationInMilliseconds: millisecondsPaid,
//       userId,
//     };
//     createUserId(userId);

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
//      const startTime = Date.now();
//       localStorage.setItem(`${userId}-rentalStartTime`, startTime);
//       localStorage.setItem(`${userId}-rentalDuration`, millisecondsPaid);

//       setIsSystemUnlocked(true);
//       setRemainingTime(millisecondsPaid);
//       if (isSent === false) {
//         const rent = {
//           formattedStartTime: '10:00 AM',
//           formattedEndTime: '12:00 PM',
//           phones: '616251068'
//       };
      
//       const type = 'createRent'; 
//         const sendSms = SmsLetter({ rent: rent, type: type });
//         console.log('SMS response:', sendSms);
//        const sms_test_data=   sendSms();
//        console.log('sms_test_data:', sms_test_data);
//         setIsSent(true);
//       }
//       // 
//       console.log('System unlocked successfully:', rentalData);
//     } catch (error) {
//       console.error('Error unlocking system:', error);
//     }
//   }, [phones, millisecondsPaid, userId, createUserId]);


//  const updateUserPaymentStatus = useCallback(async () => {

//     try {
//       console.log('phones:', phones);

//       const response = await fetch(`${config.URL}api/v1/stations/payments/updatePaymentStatus/${phones}`, {

//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         }
       
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update user payment status');
//       }

//       const updatedData = await response.json();
//       console.log('User payment status updated successfully:', updatedData);
//     } catch (error) {
//       console.error('Error updating user payment status:', error);
//     }
//   } , [phones]);


//   useEffect(() => {
//     if (userId) {
//       connectSocket(userId); // Connect to the WebSocket server with the user ID
//     }

//     const storedStartTime = parseInt(localStorage.getItem(`${userId}-rentalStartTime`), 10);
//     const storedDuration = parseInt(localStorage.getItem(`${userId}-rentalDuration`), 10);

//     if (storedStartTime && storedDuration) {
//       const elapsedTime = Date.now() - storedStartTime;
//       const remaining = storedDuration - elapsedTime;
//       if (remaining > 0) {
//         setRemainingTime(remaining);
//         setIsSystemUnlocked(true);
//       } else {
//         localStorage.removeItem(`${userId}-rentalStartTime`);
//         localStorage.removeItem(`${userId}-rentalDuration`);
//         setRemainingTime(0);
//         setIsSystemUnlocked(false);
//       }
//     } else if (millisecondsPaid) {
//       fetchRentalInfo();
//     }

//     socket.on('rentalCompleted', (data) => {
//       if (userId !== data.userId) {
//         return;
//       } 
//       console.log('Rental completed');
//       setIsSystemUnlocked(false);
//       // TODO update the user payment status in the database
//       updateUserPaymentStatus();
//       if (isCompletedRent === false) {
//         setIsCompletedRent(true);
//          const rent = {
//         formattedStartTime: '10:00 AM',
//         formattedEndTime: '12:00 PM',
//         phones: '616251068'
//     };
    
//     const type = 'completedRent'; 
//       const sendSms = SmsLetter({ rent: rent, type: type });
//       console.log('SMS response:', sendSms);
//      const sms_test_data=   sendSms();
//      console.log('completedRent:', sms_test_data);

//   }


//     });

//     socket.on('rentalFailed', (data) => {
//       console.log('Rental failed');
//     });

//     const interval = setInterval(() => {
//       setRemainingTime(prevTime => {
//         if (prevTime <= 1000) {
//           localStorage.removeItem(`${userId}-rentalStartTime`);
//           localStorage.removeItem(`${userId}-rentalDuration`);
//           clearInterval(interval);
//           setIsSystemUnlocked(false);
//           return 0;
//         }
//         return prevTime - 1000;
//       });
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//       socket.off('rentalCompleted');
//       socket.off('rentalFailed');


//     };
//   }, [millisecondsPaid, phones, fetchRentalInfo, userId, updateUserPaymentStatus]);

//   const formatTime = (milliseconds) => {
//     const totalSeconds = Math.floor(milliseconds / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;
//     return `${hours}h ${minutes}m ${seconds}s`;
//   };

 

//   return (
//     <div className="container">
//       <div className="notification notification--success">
//         <h1>{isSystemUnlocked ? 'System Unlocked' : 'System Locked'}</h1>
//         <p>{remainingTime > 0 ? `Time remaining: ${formatTime(remainingTime)}` : 'Remaining time is 0s'}</p>
//         {/* <p>userId: {userId}</p> */}

//         {/* {rentalCompleted.userId && <p>Rental completed by userId: {rentalCompleted.userId}</p>} */}
//       </div>
//     </div>
//   );
// };

// export default Success;


// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useAuth } from '../../hooks/AuthProvider';
// import { connectSocket } from '../../services/websocketService';
// import config from '../../config/config';
// import '../../assets/styles/Success.css';

// const guidGenerator = () => {
//     const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
//     return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
// };

// const Success = () => {
//     const { userInputInfo } = useAuth();
//     const { phones, millisecondsPaid } = userInputInfo;
//     const userIdRef = useRef(guidGenerator());
//     const [isSystemUnlocked, setIsSystemUnlocked] = useState(false);
//     const [remainingTime, setRemainingTime] = useState(0);

//     // Update payment status function
//     const updateUserPaymentStatus = useCallback(async () => {
//         try {
//             const response = await fetch(`${config.URL}api/v1/stations/payments/updatePaymentStatus/${phones}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ userId: userIdRef.current })
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to update user payment status');
//             }

//             const updatedData = await response.json();
//             console.log('User payment status updated successfully:', updatedData);
//         } catch (error) {
//             console.error('Error updating user payment status:', error);
//         }
//     }, [phones]);

//     useEffect(() => {
//         const newSocket = connectSocket(userIdRef.current);

//         newSocket.on('rentalCompleted', (data) => {
//             console.log('Rental completed:', data);
//             setIsSystemUnlocked(false);
//             updateUserPaymentStatus();
//         });

//         newSocket.on('rentalFailed', (data) => {
//             console.log('Rental failed:', data);
//         });

//         return () => {
//             newSocket.off('rentalCompleted');
//             newSocket.off('rentalFailed');
//             newSocket.close();
//         };
//     }, [updateUserPaymentStatus]);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setRemainingTime(prevTime => {
//                 if (prevTime <= 1000) {
//                     clearInterval(interval);
//                     setIsSystemUnlocked(false);
//                     return 0;
//                 }
//                 return prevTime - 1000;
//             });
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [millisecondsPaid]);

//     const formatTime = (milliseconds) => {
//         const totalSeconds = Math.floor(milliseconds / 1000);
//         const hours = Math.floor(totalSeconds / 3600);
//         const minutes = Math.floor((totalSeconds % 3600) / 60);
//         const seconds = totalSeconds % 60;
//         return `${hours}h ${minutes}m ${seconds}s`;
//     };

//     return (
//         <div className="container">
//             <div className="notification notification--success">
//                 <h1>{isSystemUnlocked ? 'System Unlocked' : 'System Locked'}</h1>
//                 <p>{remainingTime > 0 ? `Time remaining: ${formatTime(remainingTime)}` : 'Remaining time is 0s'}</p>
//             </div>
//         </div>
//     );
// };

// export default Success;



import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import { connectSocket, socket } from '../../services/websocketService';
import '../../assets/styles/Success.css';
import config from '../../config/config';
import SmsLetter from '../../services/smsLetter';
import { useLocation } from 'react-router-dom';
const Success = () => {
  const { userInputInfo, createUserId } = useAuth();
  const { phones, millisecondsPaid } = userInputInfo;
  // const millisecondsPaid = 20000; // Hardcoded for now
  // const phones = "616251068";
  const {state} = useLocation();
  const { formattedStartTime, formattedEndTime} = state;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rent ={
    formattedStartTime,
    formattedEndTime,
    phones

  }
  const [isCompletedRent, setIsCompletedRent] = useState(false);
  const [isSystemUnlocked, setIsSystemUnlocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const smsSentOnUnlockRef = useRef(false); // Use useRef to avoid rerenders
  const smsSentOnLockRef = useRef(false);

  const guidGenerator = useCallback(() => {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }, []);

  const userIdRef = useRef(guidGenerator());
  const userId = userIdRef.current;

  const fetchRentalInfo = useCallback(async () => {
    const data = {
      rentalId: phones,
      rentalDurationInMilliseconds: millisecondsPaid,
      userId,
    };
    createUserId(userId);

    try {
      const response = await fetch(`${config.URL}api/v1/rentals`, {
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

      if (!smsSentOnUnlockRef.current) {
        // const rent = {
        //   formattedStartTime: '2024-09-07T19:20:42+03:00',
        //   formattedEndTime: '2024-09-07T20:20:42+03:00',
        //   phones: '616251068'
        // };
        const type = 'createRent'; 
        const sendSms = SmsLetter({ rent: rent, type: type });
        sendSms();
        smsSentOnUnlockRef.current = true; // Mark SMS as sent
      }

      console.log('System unlocked successfully:', rentalData);
    } catch (error) {
      console.error('Error unlocking system:', error);
    }
  }, [phones, millisecondsPaid, userId, createUserId, rent]);

  const updateUserPaymentStatus = useCallback(async () => {
    try {
      const response = await fetch(`${config.URL}api/v1/stations/payments/updatePaymentStatus/${phones}`, {
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

  useEffect(() => {
    if (userId) {
      connectSocket(userId);
    }

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

    socket.on('rentalCompleted', (data) => {
      if (userId !== data.userId) {
        return;
      }
      console.log('Rental completed');
      setIsSystemUnlocked(false);
      updateUserPaymentStatus();

      if (!isCompletedRent) {
        setIsCompletedRent(true);
        if (!smsSentOnLockRef.current) {
          // const rent = {
          //   formattedStartTime: '2024-09-07T19:20:42+03:00',
          //   formattedEndTime: '2024-09-07T20:20:42+03:00',
          //   phones: '616251068'
          // };
          const type = 'completedRent'; 
          const sendSms = SmsLetter({ rent: rent, type: type });
          sendSms();
          smsSentOnLockRef.current = true; // Mark SMS as sent
        }
      }
    });

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
      socket.off('rentalCompleted');
      socket.off('rentalFailed');
    };
  }, [millisecondsPaid, phones, fetchRentalInfo, userId, updateUserPaymentStatus, isCompletedRent, rent]);

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
      </div>
    </div>
  );
};

export default Success;
