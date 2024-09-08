
// import React, { useState, useEffect, useCallback, useRef } from 'react';

// import { useLocation } from 'react-router-dom';
// import { useAuth } from '../../hooks/AuthProvider';
// import { connectSocket, socket } from '../../services/websocketService'; // Ensure correct import
// import '../../assets/styles/Success.css';
// import config from '../../config/config';
// import SmsLetter from '../../services/smsLetter';

// const Success = () => {
//   // const [rentalCompleted, setRentalCompleted] = useState({});
//   const { userInputInfo ,createUserId} = useAuth();
//   const { phones,millisecondsPaid  } = userInputInfo;
//   //const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds, } = useLocation();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   //const data_rental = { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds, phones, millisecondsPaid };
//   //const millisecondsPaid =20000 ; // Hardcoded for now
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
//       const response = await fetch(`${config.URL_LOCAL}api/v1/rentals`, {
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
//       console.log('System unlocked successfully:', rentalData);

//     } catch (error) {
//       console.error('Error unlocking system:', error);
//     }
//   }, [phones, millisecondsPaid, userId, createUserId]);


//  const updateUserPaymentStatus = useCallback(async () => {

//     try {
//       console.log('phones:', phones);

//       const response = await fetch(`${config.URL_LOCAL}api/v1/stations/payments/updatePaymentStatus/${phones}`, {

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
//         // send a message to the user that the rental has been completed
//         return;
//       } 
//       console.log('Rental completed');
//       setIsSystemUnlocked(false);
//       //SmsLetter({ rent: data_rental, type: 'completedRent' });

//       // TODO update the user payment status in the database
//       updateUserPaymentStatus();

      


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




// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import SmsLetter from '../../services/smsLetter';
// import { useLocation } from 'react-router-dom';
// import { useAuth } from '../../hooks/AuthProvider';
// import { connectSocket, socket } from '../../services/websocketService'; // Ensure correct import
// import '../../assets/styles/Success.css';
// import config from '../../config/config';

// const Success = () => {
//   const { userInputInfo } = useAuth();
//   // const { phones } = userInputInfo;
//   // console.log('phones:', phones);
//   const millisecondsPaid = 20000; // Hardcoded for now

//   console.log('millisecondsPaid:', millisecondsPaid);
//   const phones = '616251068';


//   const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } = useLocation();  
// // eslint-disable-next-line react-hooks/exhaustive-deps
// const data_rental = { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds, phones, millisecondsPaid };

  
//   // Generate a unique user ID only once using useRef
//   const guidGenerator = useCallback(() => {
//     const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
//     return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
//   }, []);

//   const userIdRef = useRef(guidGenerator());
//   const userId = userIdRef.current;

//   const [isSystemUnlocked, setIsSystemUnlocked] = useState(false);
//   const [remainingTime, setRemainingTime] = useState(0);



//   // Fetch rental info and unlock system
//   const fetchRentalInfo = useCallback(async () => {
//     const data = {
//       rentalId: phones,
//       rentalDurationInMilliseconds: millisecondsPaid,
//       userId,
//     };

//     // Create userId
//     // createUserId(userId);
//     console.log('User ID passed to createUserId:', userId);

//     try {
//       const response = await fetch(`${config.URL_LOCAL}api/v1/rentals`, {
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
//       const startTime = Date.now();
//       localStorage.setItem(`${userId}-rentalStartTime`, startTime);
//       localStorage.setItem(`${userId}-rentalDuration`, millisecondsPaid);
//       console.log('Rental data:', rentalData);

//       setIsSystemUnlocked(true);
//     //   const rent = {
//     //     formattedStartTime: '10:00 AM',
//     //     formattedEndTime: '12:00 PM',
//     //     phones: '616251068'
//     // };
    
//     const type = 'createRent'; 
//       const sendSms = SmsLetter({ rent: data_rental, type: type });
//       console.log('SMS response:', sendSms);
//      const sms_test_data=  await sendSms();  // This will send the SMS

//      console.log('SMS sent successfully:', sms_test_data);
//       setRemainingTime(millisecondsPaid);
//       console.log('System unlocked successfully:', rentalData);
//     } catch (error) {
//       console.error('Error unlocking system:', error);
//     }
//   }, [phones, millisecondsPaid, userId, data_rental]);
//   useEffect(() => {
//     // Check if socket exists and initialize it if not
//     if (userId && (!socket || !socket.connected)) {
//       console.log('Connecting socket with userId:', userId);
//       connectSocket(userId); // Connect to the WebSocket server with the user ID
//     }
  
//     // Retrieve rental info from localStorage if available
//     const storedStartTime = parseInt(localStorage.getItem(`${userId}-rentalStartTime`), 10);
//     const storedDuration = parseInt(localStorage.getItem(`${userId}-rentalDuration`), 10);
//     console.log(`Stored rental data for userId ${userId}:`, storedStartTime, storedDuration);
  
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
  
//     // Set up event listeners for socket events
//     if (socket) {
//       socket.on('rentalCompleted', (data) => {
//         console.log('Rental completed event received:', data);
//         if (userId !== data.userId) {
//           console.log('Received userId does not match current userId');
//           return;
//         }
//         console.log('Rental completed for user:', userId);
//         setIsSystemUnlocked(false);
//       });
  
//       socket.on('rentalFailed', (data) => {
//         console.log('Rental failed', data);
//       });
//     }
  
//     // Clean up the socket connection and event listeners when component unmounts
//     return () => {
//       if (socket) {
//         socket.off('rentalCompleted');
//         socket.off('rentalFailed');
//       }
//     };
//   }, [userId, millisecondsPaid, phones, fetchRentalInfo]); // Add relevant dependencies here
  
  
//   // useEffect(() => {
//   //   if (userId) {
//   //     console.log('Connecting socket with userId:', userId);
//   //     connectSocket(userId); // Connect to the WebSocket server with the user ID
//   //   }

//   //   const storedStartTime = parseInt(localStorage.getItem(`${userId}-rentalStartTime`), 10);
//   //   const storedDuration = parseInt(localStorage.getItem(`${userId}-rentalDuration`), 10);
//   //   console.log(`Stored rental data for userId ${userId}:`, storedStartTime, storedDuration);

//   //   if (storedStartTime && storedDuration) {
//   //     const elapsedTime = Date.now() - storedStartTime;
//   //     const remaining = storedDuration - elapsedTime;
//   //     if (remaining > 0) {
//   //       setRemainingTime(remaining);
//   //       setIsSystemUnlocked(true);
//   //     } else {
//   //       localStorage.removeItem(`${userId}-rentalStartTime`);
//   //       localStorage.removeItem(`${userId}-rentalDuration`);
//   //       setRemainingTime(0);
//   //       setIsSystemUnlocked(false);
//   //     }
//   //   } else if (millisecondsPaid) {
//   //     fetchRentalInfo();
//   //   }

//   //   socket.on('rentalCompleted', (data) => {
//   //     console.log('Rental completed event received:', data);
//   //     if (userId !== data.userId) {
//   //       console.log('Received userId does not match current userId');
//   //       return;
//   //     }
//   //     console.log('Rental completed for user:', userId);
//   //     setIsSystemUnlocked(false);
//   //   //  updateUserPaymentStatus();
//   //   });

//   //   socket.on('rentalFailed', (data) => {
//   //     console.log('Rental failed', data);
//   //   });

//   //   const interval = setInterval(() => {
//   //     setRemainingTime((prevTime) => {
//   //       if (prevTime <= 1000) {
//   //         localStorage.removeItem(`${userId}-rentalStartTime`);
//   //         localStorage.removeItem(`${userId}-rentalDuration`);
//   //         clearInterval(interval);
//   //         setIsSystemUnlocked(false);
//   //         return 0;
//   //       }
//   //       return prevTime - 1000;
//   //     });
//   //   }, 1000);

//   //   return () => {
//   //     clearInterval(interval);
//   //     socket.off('rentalCompleted');
//   //     socket.off('rentalFailed');
//   //   };
//   // }, [millisecondsPaid, phones, fetchRentalInfo, userId]);

//   // Time formatting
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
//       </div>
//     </div>
//   );
// };

// export default Success;


// import React, { useState, useEffect, useCallback, useRef } from 'react';
// // import { useLocation } from 'react-router-dom';
// import { useAuth } from '../../hooks/AuthProvider';
// // immprt uselocation from react-router-dom
// import { useLocation } from 'react-router-dom';
// import { connectSocket, socket } from '../../services/websocketService'; // Ensure correct import
// import '../../assets/styles/Success.css';
// import config from '../../config/config';
// import SmsLetter from '../../services/smsLetter';

// const Success = () => {
//   // const [rentalCompleted, setRentalCompleted] = useState({});
//   const { userInputInfo ,createUserId,} = useAuth();
//   const { phones,millisecondsPaid  } = userInputInfo;



//   function removeAllExcept252(phoneNumber) {
//     // Convert the phone number to a string and remove all occurrences of '252'
//     const modifiedPhoneNumber = phoneNumber.toString().replace(/252/g, '');
  
//     return modifiedPhoneNumber;
//   }
//   // const { phones,millisecondsPaid  } = userInputInfo;
//   // const millisecondsPaid =20000 ; // Hardcoded for now
//   // //console.log('millisecondsPaid:', millisecondsPaid);
//   // const phones = '252617921092';

//   // get value that was passed from navigator
   
//   const { state } = useLocation();
//   const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds } = state;

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
//       const response = await fetch(`${config.URL_LOCAL}api/v1/rentals`, {
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
//       const type = 'createRent';
//       const dummyRentalData = {
//         formattedStartTime, // Example ISO 8601 formatted start time
//         formattedEndTime,   // Example ISO 8601 formatted end time
//         endTimeMilliseconds, // Example time 2 hours from now
//         phones: removeAllExcept252(phones),  // Example phone number
//         millisecondsPaid // Example of 2 hours in milliseconds (2 * 60 * 60 * 1000)
//       };      // send sms 
//       // const sendSms = SmsLetter({ rent: data_rental, type: type });
//       const sendSms = SmsLetter({ rent: dummyRentalData, type: type });
//     console.log('SMS response:', sendSms); // This will log a promise, not the actual response
//     const sms_test_data = await sendSms(); 
//     console.log('SMS sent successfully:', sms_test_data);

//      const startTime = Date.now();
//       localStorage.setItem(`${userId}-rentalStartTime`, startTime);
//       localStorage.setItem(`${userId}-rentalDuration`, millisecondsPaid);

//       setIsSystemUnlocked(true);
//       setRemainingTime(millisecondsPaid);
//       console.log('System unlocked successfully:', rentalData);
//     } catch (error) {
//       console.error('Error unlocking system:', error);
//     }
//   }, [phones, millisecondsPaid, userId, createUserId, formattedStartTime, formattedEndTime, endTimeMilliseconds]);


//  const updateUserPaymentStatus = useCallback(async () => {

//     try {
//       console.log('phones:', phones);

//       const response = await fetch(`${config.URL_LOCAL}api/v1/stations/payments/updatePaymentStatus//${phones}`, {

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
// import { useLocation } from 'react-router-dom';
// import { connectSocket, socket } from '../../services/websocketService'; // Ensure correct import
// import '../../assets/styles/Success.css';
// import config from '../../config/config';
// import SmsLetter from '../../services/smsLetter';

// const Success = () => {
//   const { userInputInfo, createUserId } = useAuth();
//   // const { phones, millisecondsPaid } = userInputInfo;
//   const phones = '252616251068';
//   const millisecondsPaid = 20000; // Hardcoded for now
//   // const { state } = useLocation();
//   const { formattedStartTime, formattedEndTime, endTimeMilliseconds } = {
//     formattedStartTime: '10:00 AM',
//     formattedEndTime: '12:00 PM',
//     endTimeMilliseconds: Date.now() + 2 * 60 * 60 * 1000,
//   };

//   const [isSystemUnlocked, setIsSystemUnlocked] = useState(false);
//   const [remainingTime, setRemainingTime] = useState(0);
//   const [smsSent, setSmsSent] = useState(false); // Flag to track if SMS has been sent

//   const guidGenerator = useCallback(() => {
//     const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
//     return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
//   }, []);

//   const userIdRef = useRef(guidGenerator()); // Generate a unique user ID only once
//   const userId = userIdRef.current;

//   function removeAllExcept252(phoneNumber) {
//     return phoneNumber.toString().replace(/252/g, '');
//   }

//   const fetchRentalInfo = useCallback(async () => {
//     const data = {
//       rentalId: phones,
//       rentalDurationInMilliseconds: millisecondsPaid,
//       userId,
//     };
//     createUserId(userId);

//     try {
//       const response = await fetch(`${config.URL_LOCAL}api/v1/rentals`, {
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
//       const dummyRentalData = {
//         formattedStartTime,
//         formattedEndTime,
//         endTimeMilliseconds,
//         phones: removeAllExcept252(phones),
//         millisecondsPaid,
//       };

//       // Only send SMS if it hasn't been sent yet
//       if (!smsSent) {
//         const sendSms = SmsLetter({ rent: dummyRentalData, type: 'createRent' });
//         const smsTestData = await sendSms();
//         console.log('SMS sent successfully:', smsTestData);
//         setSmsSent(true); // Mark SMS as sent
//       }

//       const startTime = Date.now();
//       localStorage.setItem(`${userId}-rentalStartTime`, startTime);
//       localStorage.setItem(`${userId}-rentalDuration`, millisecondsPaid);

//       setIsSystemUnlocked(true);
//       setRemainingTime(millisecondsPaid);
//       console.log('System unlocked successfully:', rentalData);
//     } catch (error) {
//       console.error('Error unlocking system:', error);
//     }
//   }, [phones, millisecondsPaid, userId, createUserId, formattedStartTime, formattedEndTime, endTimeMilliseconds, smsSent]);

//   useEffect(() => {
//     if (userId) {
//       const socketConnection = connectSocket(userId); // Connect WebSocket

//       socketConnection.onRentalCompleted((data) => {
//         if (!smsSent) { // Ensure SMS is only sent once
//           console.log('Rental completed');
//           fetchRentalInfo(); // Fetch rental info and send SMS
//         }
//       });

//       return () => {
//         socketConnection.disconnectEvents(); // Clean up listeners
//       };
//     }
//   }, [userId, fetchRentalInfo, smsSent]);

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
//       </div>
//     </div>
//   );
// };

// export default Success;



import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
import { connectSocket, socket } from '../../services/websocketService'; // Ensure correct import
import '../../assets/styles/Success.css';
import config from '../../config/config';

const Success = () => {
  // const [rentalCompleted, setRentalCompleted] = useState({});
  const { userInputInfo ,createUserId} = useAuth();
  //const { phones,millisecondsPaid  } = userInputInfo;

  const millisecondsPaid =20000 ; // Hardcoded for now
  const phones = '616251068';
  //console.log('millisecondsPaid:', millisecondsPaid);

  // get value that was passed from navigator
   
  //const { createdAt, formattedStartTime, formattedEndTime, endTimeMilliseconds, } = useLocation();


  const guidGenerator = useCallback(() => {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }, []);

  const userIdRef = useRef(guidGenerator()); // Generate a unique user ID only once
  const userId = userIdRef.current;

  const [isSystemUnlocked, setIsSystemUnlocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const fetchRentalInfo = useCallback(async () => {
    console.log('phomillisecondsPaidnes:', millisecondsPaid);
    console.log('phones:', phones);
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
      console.log('System unlocked successfully:', rentalData);
    } catch (error) {
      console.error('Error unlocking system:', error);
    }
  }, [phones, millisecondsPaid, userId, createUserId]);


 const updateUserPaymentStatus = useCallback(async () => {

    try {
      console.log('phones:', phones);

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
  } , [phones]);


  useEffect(() => {
    if (userId) {
      connectSocket(userId); // Connect to the WebSocket server with the user ID
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
      // TODO update the user payment status in the database
      updateUserPaymentStatus();

      


    });

    socket.on('rentalFailed', (data) => {
      console.log('Rental failed');
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
  }, [millisecondsPaid, phones, fetchRentalInfo, userId, updateUserPaymentStatus]);

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
        {/* <p>userId: {userId}</p> */}

        {/* {rentalCompleted.userId && <p>Rental completed by userId: {rentalCompleted.userId}</p>} */}
      </div>
    </div>
  );
};

export default Success;