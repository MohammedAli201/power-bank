
import io from 'socket.io-client';
import config from '../config/config';
const SOCKET_URL = `${config.URL}`;
const socket = io(SOCKET_URL, {
  transports: ['websocket']
});

const connectSocket = (userId) => {
  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
    socket.emit('join', userId); // Emit with dynamic userId
  });

  // Listen to rental completion specifically for this userId
  const onRentalCompleted = (callback) => {
    socket.on('rentalCompleted', (data) => {
      if (data.userId === userId) {
        callback(data);
      }
    });
  };

  const onRentaGraceTime = (callback) => {
    socket.on('rentalCompleted', (data) => {
      if (data.userId === userId) {
        callback(data);
      }
    });
  };

  const onRentalFailed = (callback) => {
    socket.on('rentalFailed', (data) => {
      if (data.userId === userId) {
        callback(data);
      }
    });
  };

  // const lockForOveruse = (callback) => {
  //   socket.on('rentalFailed', (data) => {
  //     if (data.userId === userId) {
  //       callback(data);
  //     }
  //   });
  // };

  const disconnectEvents = () => {
    socket.off('rentalCompleted');
    socket.off('rentalFailed');
    socket.off('gracePeriodEnded');


  };

  return { onRentalCompleted, onRentalFailed, disconnectEvents,onRentaGraceTime };
};

export { socket, connectSocket };
