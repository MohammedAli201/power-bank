// src/services/websocketService.js
import io from 'socket.io-client';
import config from '../config/config';

// Use the WebSocket protocol if needed and ensure the URL is correct
// const SOCKET_URL = "http://localhost:9000"; 
const SOCKET_URL = `${config.URL}`; 
const socket = io(SOCKET_URL);

const connectSocket = () => {
  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
  });

  socket.on('rentalCompleted', (data) => {
    console.log('Rental completed', data);
    // Implement your logic here, e.g., update UI or state
  });

  socket.on('rentalFailed', (data) => {
    console.log('Rental failed', data);
    // Implement your logic here, e.g., update UI or state
  });
};

export { socket, connectSocket };
