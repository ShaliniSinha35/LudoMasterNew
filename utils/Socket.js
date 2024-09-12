import io from 'socket.io-client';

const socket = io('https://ludomaster.net', {
  path: '/socket.io',
  transports: ['websocket', 'polling'],
  secure: true,
  reconnection: true,
  reconnectionAttempts: 5,
  timeout: 20000,
});

// socket.on('connect', () => {
//   console.log('Connected through Apache proxy');
// });

// socket.on('connect_error', (error) => {
//   console.error('Connection error:', error);
//   console.log(error.code);     
//   console.log(error.message);  
//   console.log(error.context);
// });

export default socket;
