// // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // import { useAuth } from '../../hooks/AuthProvider';
// // import { connectSocket, socket } from '../../services/websocketService';
// // import '../../assets/styles/Success.css';

// // const Success = () => {
// //     const { userInputInfo } = useAuth();
// //     const { phones } = userInputInfo; // Assume userInputInfo includes userId
// //     const millisecondsPaid = 300000; // Hardcoded for now

// //     const guidGenerator = useCallback(() => {
// //         var S4 = function() {
// //             return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
// //         };
// //         return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
// //     }, []);

// //     const userIdRef = useRef(guidGenerator()); // Generate a unique user ID only once
// //     const userId = userIdRef.current;

// //     const [isSystemUnlocked, setIsSystemUnlocked] = useState(false);
// //     const [remainingTime, setRemainingTime] = useState(0);

// //     const fetchRentalInfo = useCallback(async () => {
// //         const data = {
// //             rentalId: phones,
// //             rentalDurationInMilliseconds: millisecondsPaid,
// //             userId, // Include userId in the request
// //         };

// //         try {
// //             const response = await fetch(`https://danabpowerbank-a0bf50dd740c.herokuapp.com/api/v1/rentals`, {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json'
// //                 },
// //                 body: JSON.stringify(data),
// //             });

// //             if (!response.ok) {
// //                 throw new Error('Failed to unlock system');
// //             }

// //             const rentalData = await response.json();
// //             const startTime = Date.now();
// //             localStorage.setItem('rentalStartTime', startTime);
// //             localStorage.setItem('rentalDuration', millisecondsPaid);

// //             setIsSystemUnlocked(true);
// //             setRemainingTime(millisecondsPaid);
// //             console.log("System unlocked successfully:", rentalData);
// //         } catch (error) {
// //             console.error('Error unlocking system:', error);
// //         }
// //     }, [phones, millisecondsPaid, userId]);

// //     useEffect(() => {
// //         if (userId) {
// //             connectSocket(userId); // Connect to the WebSocket server with the user ID
// //         }

// //         const storedStartTime = parseInt(localStorage.getItem('rentalStartTime'), 10);
// //         const storedDuration = parseInt(localStorage.getItem('rentalDuration'), 10);

// //         console.log('Stored start time:', storedStartTime);
// //         console.log('Stored duration:', storedDuration);

// //         if (storedStartTime && storedDuration) {
// //             const elapsedTime = Date.now() - storedStartTime;
// //             const remaining = storedDuration - elapsedTime;
// //             console.log('Elapsed time:', elapsedTime);
// //             console.log('Remaining time:', remaining);
// //             if (remaining > 0) {
// //                 setRemainingTime(remaining);
// //                 setIsSystemUnlocked(true);
// //             } else {
// //                 localStorage.removeItem('rentalStartTime');
// //                 localStorage.removeItem('rentalDuration');
// //                 setRemainingTime(0);
// //                 setIsSystemUnlocked(false);
// //             }
// //         } else if (millisecondsPaid) {
// //             fetchRentalInfo();
// //         }

// //         socket.on('rentalCompleted', (data) => {
// //             console.log('Rental completed', data);
// //             setIsSystemUnlocked(false);
// //         });

// //         socket.on('rentalFailed', (data) => {
// //             console.log('Rental failed', data);
// //         });

// //         const interval = setInterval(() => {
// //             setRemainingTime(prevTime => {
// //                 if (prevTime <= 1000) {
// //                     localStorage.removeItem('rentalStartTime');
// //                     localStorage.removeItem('rentalDuration');
// //                     clearInterval(interval);
// //                     setIsSystemUnlocked(false);
// //                     return 0;
// //                 }
// //                 return prevTime - 1000;
// //             });
// //         }, 1000);

// //         return () => {
// //             clearInterval(interval);
// //             socket.off('rentalCompleted');
// //             socket.off('rentalFailed');
// //         };
// //     }, [millisecondsPaid, phones, fetchRentalInfo, userId]);

// //     const formatTime = (milliseconds) => {
// //         const totalSeconds = Math.floor(milliseconds / 1000);
// //         const hours = Math.floor(totalSeconds / 3600);
// //         const minutes = Math.floor((totalSeconds % 3600) / 60);
// //         const seconds = totalSeconds % 60;
// //         return `${hours}h ${minutes}m ${seconds}s`;
// //     };

// //     return (
// //         <div className="container">
// //             <div className="notification notification--success">
// //                 <h1>{isSystemUnlocked ? 'System Unlocked' : 'System Locked'}</h1>
// //                 <p>{remainingTime > 0 ? `Time remaining: ${formatTime(remainingTime)}` : 'Remaining time is 0s'}</p>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Success;
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useAuth } from '../../hooks/AuthProvider';
// import { connectSocket, socket } from '../../services/websocketService';
// import '../../assets/styles/Success.css';

// const Success = () => {
//     const { userInputInfo } = useAuth();
//     const { phones } = userInputInfo;
//     const millisecondsPaid = 1000; // Hardcoded for now

//     const guidGenerator = useCallback(() => {
//         var S4 = function() {
//             return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
//         };
//         return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
//     }, []);

//     const userIdRef = useRef(guidGenerator()); // Generate a unique user ID only once
//     const userId = userIdRef.current;

//     const [isSystemUnlocked, setIsSystemUnlocked] = useState(false);
//     const [remainingTime, setRemainingTime] = useState(0);

//     const fetchRentalInfo = useCallback(async () => {
//         const data = {
//             rentalId: phones,
//             rentalDurationInMilliseconds: millisecondsPaid,
//             userId,
//         };

//         try {
//             const response = await fetch(`http://localhost:9000/api/v1/rentals`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to unlock system');
//             }

//             const rentalData = await response.json();
//             const startTime = Date.now();
//             localStorage.setItem('rentalStartTime', startTime);
//             localStorage.setItem('rentalDuration', millisecondsPaid);

//             setIsSystemUnlocked(true);
//             setRemainingTime(millisecondsPaid);
//             console.log("System unlocked successfully:", rentalData);
//         } catch (error) {
//             console.error('Error unlocking system:', error);
//         }
//     }, [phones, millisecondsPaid, userId]);

//     useEffect(() => {
//         if (userId) {
//             connectSocket(userId); // Connect to the WebSocket server with the user ID
//         }

//         const storedStartTime = parseInt(localStorage.getItem('rentalStartTime'), 10);
//         const storedDuration = parseInt(localStorage.getItem('rentalDuration'), 10);

//         console.log('Stored start time:', storedStartTime);
//         console.log('Stored duration:', storedDuration);

//         if (!isNaN(storedStartTime) && !isNaN(storedDuration)) {
//             const elapsedTime = Date.now() - storedStartTime;
//             const remaining = storedDuration - elapsedTime;
//             console.log('Elapsed time:', elapsedTime);
//             console.log('Remaining time:', remaining);
//             if (remaining > 0) {
//                 setRemainingTime(remaining);
//                 setIsSystemUnlocked(true);
//             } else {
//                 localStorage.removeItem('rentalStartTime');
//                 localStorage.removeItem('rentalDuration');
//                 setRemainingTime(0);
//                 setIsSystemUnlocked(false);
//             }
//         } else if (millisecondsPaid) {
//             fetchRentalInfo();
//         }

//         socket.on('rentalCompleted', (data) => {
//             console.log('Rental completed', data);
//             setIsSystemUnlocked(false);
//         });

//         socket.on('rentalFailed', (data) => {
//             console.log('Rental failed', data);
//         });

//         const interval = setInterval(() => {
//             setRemainingTime(prevTime => {
//                 if (prevTime <= 1000) {
//                     localStorage.removeItem('rentalStartTime');
//                     localStorage.removeItem('rentalDuration');
//                     clearInterval(interval);
//                     setIsSystemUnlocked(false);
//                     return 0;
//                 }
//                 return prevTime - 1000;
//             });
//         }, 1000);

//         return () => {
//             clearInterval(interval);
//             socket.off('rentalCompleted');
//             socket.off('rentalFailed');
//         };
//     }, [millisecondsPaid, phones, fetchRentalInfo, userId]);

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
//                 <p>user id ID: {userId}</p>
//             </div>
//         </div>
//     );
// };

// export default Success;
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import { connectSocket, socket } from '../../services/websocketService'; // Ensure correct import
import '../../assets/styles/Success.css';
import config from '../../config/config';

const Success = () => {
  // const [rentalCompleted, setRentalCompleted] = useState({});
  const { userInputInfo } = useAuth();
  const { phones } = userInputInfo;
  const millisecondsPaid = 20000; // Hardcoded for now

  const guidGenerator = useCallback(() => {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }, []);

  const userIdRef = useRef(guidGenerator()); // Generate a unique user ID only once
  const userId = userIdRef.current;

  const [isSystemUnlocked, setIsSystemUnlocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const fetchRentalInfo = useCallback(async () => {
    const data = {
      rentalId: phones,
      rentalDurationInMilliseconds: millisecondsPaid,
      userId,
    };

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
  }, [phones, millisecondsPaid, userId]);

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
        // const { rentalId, userId } = data;
        // setRentalCompleted({
        //   rentalId,
        //   userId,
        // });
        // localStorage.removeItem(`${userId}-rentalStartTime`);
      setIsSystemUnlocked(false);
    });

    // console.log('rentalCompleted:', rentalCompleted);

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
  }, [millisecondsPaid, phones, fetchRentalInfo, userId]);

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
