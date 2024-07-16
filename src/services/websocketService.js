import io from 'socket.io-client';
import config from '../config/config';

const SOCKET_URL = `${config.URL}`;

const socket = io(SOCKET_URL, {
  transports: ['websocket'], // Specify transports to use only WebSocket
});

const connectSocket = (userId) => {
  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
    socket.emit('join', userId); // Join the user's room
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
  });

  socket.on('rentalCompleted', (data) => {
    console.log('Rental completed', data);
    // You can pass this to your components via state or context
  });

  socket.on('rentalFailed', (data) => {
    console.log('Rental failed', data);
    // You can pass this to your components via state or context
  });
};

export { socket, connectSocket };
