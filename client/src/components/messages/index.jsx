import { Box, Divider } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Message from "./message";
// import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const Messages = ({ socket, conversationId, updateMessage }) => {
    const token = useSelector((state) => state.token);
    // const socket = io("http://localhost:3001");
    const [messagesByDate, setMessagesByDate] = useState({});
    const messagesEndRef = useRef(null);

    const getMessages = async () => {
        const res = await fetch(`http://localhost:3001/chats/${conversationId}/messages`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        // console.log(data);
        organizeMessagesByDate(data);
    };

    const organizeMessagesByDate = (messages) => {
        const groupedMessages = {};
        messages.forEach(message => {
            const date = new Date(message.createdAt).toISOString().split('T')[0];
            if (!groupedMessages[date]) {
                groupedMessages[date] = [];
            }
            groupedMessages[date].push(message);
        });
        setMessagesByDate(groupedMessages);
    };

    useEffect(() => {
        getMessages();
    }, [conversationId, updateMessage]);

    useEffect(() => {
        // socket.on("connect", () => {
        //     socket.emit("authenticate", user._id);
        //     console.log(socket.connected)
        //     if (socket.connected) {
        // console.log("receivedMessage", receivedMessage);
        // organizeMessagesByDate([...messagesByDate, receivedMessage]);
        socket.on('receive_message', (receivedMessage) => {
            if (receivedMessage.conversationId === conversationId) {
                const date = new Date(receivedMessage.createdAt).toISOString().split('T')[0];
                setMessagesByDate(prevMessagesByDate => {
                    const updatedMessagesByDate = { ...prevMessagesByDate };
                    if (!updatedMessagesByDate[date]) {
                        updatedMessagesByDate[date] = [receivedMessage];
                    } else {
                        updatedMessagesByDate[date] = [...updatedMessagesByDate[date], receivedMessage];
                    }
                    return updatedMessagesByDate;
                });
            }
        });
        // });
        return () => {
            socket.off('receive_message');
            socket.close();
        }
    }, [socket]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messagesByDate]);

    return (
        <Box sx={{ height: "90%", flex: 1, p: 1, mb: "1rem", overflowY: "auto", scrollbarWidth: "thin" }}>
            {Object.entries(messagesByDate).map(([date, messages]) => (
                <Box key={date}>
                    {
                        new Date(date).toDateString() === new Date().toDateString() ?
                            <Divider flexItem >Today</Divider> :
                            new Date(date).toDateString() === new Date(new Date().setDate(new Date().getDate() - 1)).toDateString() ?
                                <Divider flexItem >Yesterday</Divider> : <Divider flexItem >{date}</Divider>
                    }
                    {messages.map(message => (
                        <Message key={message._id} message={message.message} senderId={message.senderId._id} senderProfilePic={message.senderId.picturePath} createdAt={message.createdAt}></Message>
                    ))}
                </Box>
            ))}
            <Box ref={messagesEndRef}></Box>
        </Box>
    );
};

export default Messages;
