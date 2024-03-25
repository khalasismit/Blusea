import { Box, InputAdornment, TextField, useMediaQuery, useTheme } from "@mui/material";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
const TextArea = ({ participants, updateMessage, socket }) => {
    // const socket = io("http://localhost:3001");
    const [message, setMessage] = useState("");
    const [UserToChat, setUserToChat] = useState([]);
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const theme = useTheme();
    // console.log("participants",participants)
    const isNonMobile = useMediaQuery('(min-width:1000px)');
    useEffect(() => {
        // socket.emit("authenticate", user._id);
        if (participants) {
            participants.map((participant) => {
                if (participant._id !== user._id) {
                    setUserToChat(participant)
                }
            })
        }
    }, [participants, user._id, socket])
    const sendMessage = async () => {
        try {
            if (message === "") return;
            const res = await fetch(`http://localhost:3001/chats/message/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    senderId: user._id,
                    receiverId: UserToChat._id,
                    message,
                })
            })
            const data = await res.json(); // GET NewMessage Data (Encrypted Message)
            const res2 = await fetch("http://localhost:3001/chats/message/decrypt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    message: data.NewMessage.message,
                })
            });
            const decryptedData = await res2.json(); // Decrypted Message
            data.NewMessage.message = await decryptedData; // Replace Encrypted Message with Decrypted Message
            socket.emit("send_message", { receiverId: UserToChat._id, message: data }) // Send Message to Receiver
            updateMessage(data)
            setMessage("");
        } catch (error) {
            console.log("Error in sending message: ", error)
        }
    }
    useEffect(() => {
        socket.connect();
        return () => {
            socket.close()
        }
    }, [])
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    };
    return (
        <Box sx={{
            width: "100%",
            background: theme.palette.background.default,
            p: 1,
            position: "sticky",
            bottom: isNonMobile ? "0rem" : "3.2rem",
            right: "0",
            left: isNonMobile ? "16rem" : "0"
        }}>
            {/* <form action=""> */}
                <TextField
                    multiline={true}
                    value={message}
                    onChange={(e) => { setMessage(e.target.value) }}
                    onKeyDown={handleKeyDown}
                    variant="outlined"
                    fullWidth
                    label="Type a message"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start" sx={{ p: "0 0 0 1rem" }}>
                                <SendOutlinedIcon sx={{ fontSize: "2rem", cursor: "pointer" }} onClick={sendMessage} />
                                {/* <AccountCircle /> */}
                            </InputAdornment>
                        ),
                    }}
                />
            {/* </form> */}
        </Box>
    );
};
export default TextArea;