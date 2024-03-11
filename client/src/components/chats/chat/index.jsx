import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Chat = ({ id, participants, messages }) => {
    const lastMessage = messages[messages.length - 1];
    const [UserToChat, setUserToChat] = useState([])
    const [time, setTime] = useState("");
    // const [lastMessage, setLastMessage] = useState("")
    const user = useSelector((state) => state.user)
    const theme = useTheme();
    const navigate = useNavigate()
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
    }, [])
    return <Box sx={{ display: 'flex', borderRadius: 2, gap: 2, p: 1, cursor: "pointer", ":hover": { background: theme.palette.background.default } }} onClick={() => { navigate(`/chats/${id}/messages`) }}>
        {/* {
            profilePic === "" ?
                <Avatar sx={{ borderRadius: 2, height: "2.5rem", width: "2.5rem" }}></Avatar>
                :
                <Avatar src={profilePic} sx={{ borderRadius: 2, height: "2.5rem", width: "2.5rem" }}></Avatar>
        } */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ flex: 1, display: "flex", gap: 2 }}>
                <Avatar src={UserToChat.picturePath} sx={{ height: "2.5rem", width: "2.5rem" }}></Avatar>
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