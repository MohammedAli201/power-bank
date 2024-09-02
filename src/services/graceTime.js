import React, { useEffect } from 'react';
import { connectSocket } from '../../services/websocketService';
import { useAuth } from '../../hooks/AuthProvider';

const GraceTime = () => {
// Replace with actual logic to retrieve the current user's ID
  
  const { userId} = useAuth();

  // Function to send notification API call
  const sendNotification = async (message) => {
    try {
      const response = await fetch('http://localhost:3000/api/notifications', {
        method: 'POST',
                headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, message })
      });
      const responseData = await response.json();
      console.log('Notification API response:', responseData);
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  };

  useEffect(() => {
    const { onGracePeriodEnded, disconnectEvents } = connectSocket(userId);

    // When grace period ends, make an API call
    onGracePeriodEnded((data) => {
      console.log('Grace period ended, notification should be sent:', data.message);
      sendNotification(data.message);
    });

    return () => {
      disconnectEvents(); // Disconnects the grace period event listener
    };
  }, []); // Ensures this setup is only run once upon mounting

  return null; // No rendering output
};

export default GraceTime;
