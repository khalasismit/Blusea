import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Message from "./message";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
const Messages = ({ conversationId, updateMessage }) => {
    const user = useSelector((state) => state.user);
    const socket = io("http://localhost:3001");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const getMessages = async () => {
        const res = await fetch(`http://localhost:3001/chats/${conversationId}/messages`, {
            method: "GET",
            headers: {}
        })
        const data = await res.json();
        setMessages(data);
    }
    useEffect(() => {
        getMessages();
    }, [conversationId, updateMessage]);
    useEffect(() => {
        socket.on("connect", () => {
            socket.emit("authenticate", user._id);
            console.log(socket.connected)
            if (socket.connected) {
                socket.on('receive_message', (receivedMessage) => {
                    console.log("receivedMessage", receivedMessage);
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                });
            }
        });
    }, [socket])
    useEffect(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [messages]);
    return <Box sx={{ height: "90%", flex: 1, overflowY: "auto", scrollbarWidth: "thin" }}>
        {
            messages && messages.map((message) => (
                <Message key={message._id} message={message.message} senderId={message.senderId._id} senderProfilePic={message.senderId.picturePath}  ></Message>
            ))
        }
        <Box ref={messagesEndRef}></Box>
    </Box>
}
export default Messages;