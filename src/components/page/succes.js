// // import React,{useState,useEffect} from 'react';
// // import { useLocation } from 'react-router-dom';
// // import { useAuth } from '../../hooks/AuthProvider';
// // import '../../assets/styles/Sucess.css'; // Ensure the filename is correct
// // import config from '../../config/config';
// // const apiBaseUrl = `${config.URL}api/v1/rentals`;


// // const Success = () => {
// //     const [quesRespnse, setResponse] = useState(null);
// //     const [rentD, setRentD] = useState(null);

// //     const fetchRentalInfo = async () => {
// //         const data = {
// //             rentalId: "06155555",
// //             rentalDurationInMilliseconds: 1000,
// //         };

// //         try {
// //             const response = await fetch("http://localhost:9000/api/v1/rentals", {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json'
// //                 },
// //                 body: JSON.stringify(data),
// //             });

// //             if (!response.ok) {
// //                 throw new Error('Failed to save payment information');
// //             }

// //             const data_res = await response.json();
// //             setResponse(data_res);

// //             console.log("Payment saved successfully:", data_res);
// //         } catch (error) {
// //             console.error('Error saving payment information:', error);
// //         }
// //     };

// //     // useEffect(() => {
// //     //     fetchRentalInfo();
// //     // }, []);
// // const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         await fetchRentalInfo();
// //     }
// //     return (
// //         <div className="container">
// //             <form className="form">
// //                 <label>
// //                     <input type="text" placeholder="Enter Rental ID" />
// //                 </label>
// //                 <button type="submit">Submit</button>

// //             </form>

// //             <div className="notification notification--success">
// //                 <h1>Success</h1>
// //                 <p>{quesRespnse ? JSON.stringify(quesRespnse) : 'Loading...'}</p>
// //             </div>
// //         </div>
// //     );





// //     // const auth = useAuth();
// //     // const location = useLocation();
// //     // console.log(location);
// //     // const { message, error, success } = location.state || { message: '', error: false, success: false };

// // }

// // export default Success;
// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// const Success = () => {
//     const location = useLocation();
//     const { millisecondsPaid, phoneNumber } = location.state || {};

//     const [response, setResponse] = useState(null);
//     const [remainingTime, setRemainingTime] = useState(null);

//     // const addTime = (time) => {
//     //     const date = new Date();
//     //     date.setMilliseconds(date.getMilliseconds() + time);
//     //     return date;
//     // };

//     // first save the paymentInformation. 
//     const fetchRentalInfo = async () => {
//         const data = {
//             rentalId: phoneNumber,
//             rentalDurationInMilliseconds: 300000,
//         };

//         try {
//             const response = await fetch("http://localhost:9000/api/v1/rentals", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to save payment information');
//             }

//             const data_res = await response.json();
//             setResponse(data_res);
//             localStorage.setItem(`${phoneNumber}`, phoneNumber);

//             console.log("Payment saved successfully:", data_res);
//         } catch (error) {
//             console.error('Error saving payment information:', error);
//         }
//     };

//     useEffect(() => {
//         if (millisecondsPaid) {
//             setRemainingTime(300000);
//             fetchRentalInfo();
//         }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [millisecondsPaid, phoneNumber]);

//     useEffect(() => {
//         if (remainingTime !== null) {
//             const interval = setInterval(() => {
//                 setRemainingTime(prevTime => {
//                     if (prevTime <= 1000) {
//                         clearInterval(interval);
//                         return 0;
//                     }
//                     return prevTime - 1000;
//                 });
//             }, 1000);

//             return () => clearInterval(interval);
//         }
//     }, [remainingTime]);

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
//                 <h1>Success</h1>
//                 {response ? (
//                     <p>Response: {JSON.stringify(response)}</p>
//                 ) : (
//                     <p>Waiting for response...</p>
//                 )}
//                 {remainingTime !== null && (
//                     <p>Time remaining: {formatTime(remainingTime)}</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Success;
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
    const location = useLocation();
    const { millisecondsPaid, phoneNumber } = location.state || {};

    const [response, setResponse] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);

    const fetchRentalInfo = useCallback(async () => {
        const data = {
            rentalId: phoneNumber,
            rentalDurationInMilliseconds: 300000, // 5 minutes
        };

        try {
            const response = await fetch("http://localhost:9000/api/v1/rentals", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to save payment information');
            }

            const data_res = await response.json();
            setResponse(data_res);
            localStorage.setItem(`${phoneNumber}`, phoneNumber);

            console.log("Payment saved successfully:", data_res);
        } catch (error) {
            console.error('Error saving payment information:', error);
        }
    }, [phoneNumber]);

    useEffect(() => {
        if (millisecondsPaid) {
            setRemainingTime(300000); // 5 minutes
            fetchRentalInfo();
        }
    }, [millisecondsPaid, phoneNumber, fetchRentalInfo]);

    useEffect(() => {
        if (remainingTime !== null) {
            const interval = setInterval(() => {
                setRemainingTime(prevTime => {
                    if (prevTime <= 1000) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prevTime - 1000;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [remainingTime]);

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
                <h1>Success</h1>
                {response ? (
                    <p>Response: {JSON.stringify(response)}</p>
                ) : (
                    <p>Waiting for response...</p>
                )}
                {remainingTime !== null && (
                    <p>Time remaining: {formatTime(remainingTime)}</p>
                )}
            </div>
        </div>
    );
};

export default Success;
