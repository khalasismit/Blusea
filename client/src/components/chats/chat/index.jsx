import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Chat = ({ id, participants, messages:lastMessage }) => {
    // const lastMessage = messages[messages.length - 1].message;
    const [UserToChat, setUserToChat] = useState([])
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
    }, [])
    return <Box sx={{ display: 'flex', borderRadius: 2, gap: 2, p: 1, cursor: "pointer", ":hover": { background: theme.palette.background.default } }} onClick={() => { navigate(`/chats/${id}/messages`) }}>
        {/* {
            profilePic === "" ?
                <Avatar sx={{ borderRadius: 2, height: "2.5rem", width: "2.5rem" }}></Avatar>
                :
                <Avatar src={profilePic} sx={{ borderRadius: 2, height: "2.5rem", width: "2.5rem" }}></Avatar>
        } */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: 2 }}>
                <Avatar src={UserToChat.picturePath} sx={{ height: "2.5rem", width: "2.5rem" }}></Avatar>
                <Box>
                    <Typography sx={{ fontSize: "1rem",fontWeight:"bold" }} >{UserToChat.userName}</Typography>
                    <Typography sx={{ fontSize: "0.8rem" }}>{lastMessage}</Typography>
                </Box>
            </Box>
        </Box>
    </Box>
}
export default Chat;