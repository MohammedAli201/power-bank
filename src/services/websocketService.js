// // services/websocketService.js
import io from 'socket.io-client';
import config from '../config/config';

// Function to connect to WebSocket and return socket instance
const connectSocket = (userId) => {
    const SOCKET_URL = `${config.URL}`;
    const socket = io(SOCKET_URL, {
        transports: ['websocket'],
        query: { userId }
    });

    // Log when connected
    socket.on('connect', () => {
        console.log('Connected to WebSocket server');
        socket.emit('join', userId);  // Join a room based on userId
    });

    return socket;
};

export { connectSocket };
