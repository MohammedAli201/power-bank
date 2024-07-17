import io from 'socket.io-client';
import config from '../config/config';

const SOCKET_URL = `${config.URL}`;

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  query: { userId: 'your_user_id' } // Ensure to pass userId as a query parameter
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
    // Handle the rental completion event
  });

  socket.on('rentalFailed', (data) => {
    console.log('Rental failed', data);
    // Handle the rental failure event
  });
};

export { socket, connectSocket };
