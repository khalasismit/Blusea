import { Server } from "socket.io";
import express from "express";
import http from "http";

export const app = express();
export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: ["*", "http://localhost:3001", "http://localhost:3000", "https://storage.googleapis.com"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["*"]
  }
});
const users = {};

io.on('connection', (socket) => {
  socket.on('connect', () => {
    console.log(`New connection ${socket.id}`);
  });

  socket.on('authenticate', (userId) => {
    console.log("user added to users:", userId)
    if (users[userId]) {
      console.log(`User ${userId} already has a socket ID associated with it`);
      // we disconnect the previous socket here
      io.to(users[userId]).emit('forceDisconnect', 'You have been disconnected due to a new connection');
      delete users[userId]; // Remove previous socket ID
    }
    users[userId] = socket.id;
    console.log(users)
  });

  socket.on('send_message', (data) => {
    const { receiverId, message } = data;
    // console.log("message: ",message.NewMessage)
    // Find the recipient's socket ID
        const recipientSocketId = users[receiverId];
        
        // If recipient's socket ID is found, emit the message directly to that socket
        if (recipientSocketId) {
          console.log("receiver socketId:",recipientSocketId)
            io.to(recipientSocketId).emit('receive_message', message.NewMessage);
            console.log(`message sent to receiver :${receiverId}`);
        } else {
            // Handle case where recipient is not connected or does not exist
            console.log(`User ${receiverId} is not connected`);
        }
  })

  socket.on('like',(data)=>{
    const {newNotif} = data;
    const recipientSocketId = users[newNotif._doc.receiverId]
    if (recipientSocketId) {
        io.to(recipientSocketId).emit('notification',newNotif);
        console.log(`notification sent to receiver :${newNotif._doc.receiverId}`);
    } else {
        // Handle case where recipient is not connected or does not exist
        console.log(`User ${newNotif._doc.receiverId} is not connected`);
    }
  })

  socket.on('disconnect',()=>{
    // Find the user ID associated with the disconnected socket
    const disconnectedUserId = Object.keys(users).find(userId => users[userId] === socket.id);

    if ( disconnectedUserId) {
      // console.log(`User ${disconnectedUserId} disconnected`);
      delete users[disconnectedUserId]; // Remove the user's entry from the users object
    } else {
      // console.log('Unknown user disconnected');
    }
  });
});
