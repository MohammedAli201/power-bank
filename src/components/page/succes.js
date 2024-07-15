// import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import { connectSocket, socket } from '../../services/websocketService';
import '../../assets/styles/Success.css';

import React, { useState, useEffect, useCallback } from 'react';

import '../../assets/styles/Success.css';

// import { useNavigate } from 'react-router-dom';

// import { useAuth } from '../../hooks/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import { connectSocket, socket } from '../../services/websocketService';
import '../../assets/styles/Success.css';

const Success = () => {
    const { userInputInfo } = useAuth();
    const { phones } = userInputInfo;
    //TODO: This millisecondsPaid should be from the user input but for now it is hardcoded
    const millisecondsPaid= 300000;
    // const navigate = useNavigate();

    const [isSystemUnlocked, setIsSystemUnlocked] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

    const fetchRentalInfo = useCallback(async () => {
        const data = {
            rentalId: phones,
            rentalDurationInMilliseconds: millisecondsPaid,
        };

        try {
            const response = await fetch(`https://danabpowerbank-a0bf50dd740c.herokuapp.com/api/v1/rentals`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to unlock system');
            }

            const rentalData = await response.json();
            const startTime = Date.now();
            localStorage.setItem('rentalStartTime', startTime);
            localStorage.setItem('rentalDuration', millisecondsPaid);

            setIsSystemUnlocked(true);
            setRemainingTime(millisecondsPaid);
            console.log("System unlocked successfully:", rentalData);
        } catch (error) {
            console.error('Error unlocking system:', error);
        }
    }, [phones, millisecondsPaid]);

    useEffect(() => {
        connectSocket();

        const storedStartTime = parseInt(localStorage.getItem('rentalStartTime'), 10);
        const storedDuration = parseInt(localStorage.getItem('rentalDuration'), 10);

        if (storedStartTime && storedDuration) {
            const elapsedTime = Date.now() - storedStartTime;
            const remaining = storedDuration - elapsedTime;
            if (remaining > 0) {
                setRemainingTime(remaining);
                setIsSystemUnlocked(true);
            } else {
                localStorage.removeItem('rentalStartTime');
                localStorage.removeItem('rentalDuration');
                setRemainingTime(0);
                setIsSystemUnlocked(false);
            }
        } else if (millisecondsPaid) {
            fetchRentalInfo();
        }

        socket.on('rentalCompleted', (data) => {
            console.log('Rental completed', data);
            setIsSystemUnlocked(false);
        });

        socket.on('rentalFailed', (data) => {
            console.log('Rental failed', data);
        });

        const interval = setInterval(() => {
            setRemainingTime(prevTime => {
                if (prevTime <= 1000) {
                    localStorage.removeItem('rentalStartTime');
                    localStorage.removeItem('rentalDuration');
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
    }, [millisecondsPaid, phones, fetchRentalInfo]);

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
