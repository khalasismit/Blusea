import { io } from 'socket.io-client';

const socket = io('http://localhost:3001'); // Initialize Socket.IO instance

export default socket;