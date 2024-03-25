import { Avatar, Badge, Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewMessages, clearNewMessages } from "../../../redux/reducers";
const Chat = ({ socket, id, participants, messages }) => {
    const [lastMessage, setLastMesssage] = useState(messages.length > 0 ? messages[messages.length - 1] : "");
    const [UserToChat, setUserToChat] = useState([])
    const [time, setTime] = useState("");
    const newMessages = useSelector(state => state.conversations).find(conversation => conversation.conversationId === id)?.newMessages || []
    // const [lastMessage, setLastMessage] = useState("")
    const user = useSelector((state) => state.user)
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        participants.map((participant) => {
            if (participant._id !== user._id) {
                setUserToChat(participant)
            }
        })
        if (lastMessage) {
            setTime(() => {
                //converting String To Date object
                const Time = new Date(lastMessage.updatedAt);
                const date = new Date(lastMessage.updatedAt).toISOString().split('T')[0];
                let hours = Time.getHours();
                let minutes = Time.getMinutes();
                const ampm = hours >= 12 ? 'pm' : 'am';

                // Convert hours to 12-hour format
                hours %= 12;
                hours = hours || 12; // Convert 0 to 12

                // Add leading zero if minutes < 10
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (new Date(date).toDateString() === new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()) {
                    return `Yesterday ${hours}:${minutes} ${ampm}`
                }
                else if (new Date(date).toDateString() === new Date().toDateString()) {
                    return `${hours}:${minutes} ${ampm}`
                } else {
                    return `${date}`
                }
            })
        }
    }, [lastMessage])

    useEffect(() => {
        socket.connect();
        socket.emit("authenticate", user._id);
        socket.on("receive_message", (data) => {
            if (data.conversationId === id) {
                // setnewMessages(prevMessage => [...prevMessage, [data]]);
                console.log("newMessage:", data)
                dispatch(
                    addNewMessages({
                        conversationId: id,
                        newMessages: [data]
                    })
                )
                setLastMesssage(data)
            }
        })
        return () => {
            socket.off("receive_message")
            socket.close()
        }
    }, [socket]);
    return <Box
        sx={{
            display: 'flex',
            borderRadius: 2,
            gap: 2,
            p: 1,
            cursor: "pointer",
            ":hover": { background: theme.palette.background.alt }
        }}
        onClick={() => {
            navigate(`/chats/${id}/messages`);
            dispatch(clearNewMessages({
                conversationId: id
            }))
        }}>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ flex: 1, display: "flex", gap: 2 }}>
                <Badge badgeContent={newMessages.length} color="secondary">
                    <Avatar src={UserToChat.picturePath} sx={{ height: "2.5rem", width: "2.5rem" }}></Avatar>
                </Badge>
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }} >{UserToChat.userName}</Typography>
                        {time}
                    </Box>
                    <Typography sx={{ maxWidth: "30vw", fontSize: "0.8rem", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{lastMessage.message}</Typography>
                </Box>
            </Box>
        </Box>
    </Box>
}
export default Chat;