import { Avatar, Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useNavigate } from "react-router-dom";
const ChatHeader = ({ participants }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [UserToChat, setUserToChat] = useState([]);
    useEffect(() => {
        if (participants) {
            participants.map((participant) => {
                if (participant._id !== user._id) {
                    setUserToChat(participant)
                }
                return participant;
            })
        }
    }, [participants, user._id])
    const handleBack = () => {
        window.history.back();
    }
    return <Box sx={{ display: "flex", alignItems: "center" }}>
        <ArrowBackIosNewOutlinedIcon sx={{ fontSize: "2rem", m: 2, cursor: "pointer" }} onClick={handleBack} />
        <Divider orientation="vertical" flexItem />
        <Box sx={{ display: "flex", p: 1 }}>
            {
                UserToChat.picturePath === "" ?
                    <Avatar sx={{ width: "2.5rem", height: "2.5rem", borderRadius: "10%" }} />
                    :
                    <Avatar src={UserToChat.picturePath} sx={{ width: "2.5rem", height: "2.5rem", cursor: "pointer", borderRadius: "10%" }} />
            }
            <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold", ml: "1rem", cursor: "pointer" }} onClick={() => { navigate(`/profile/${UserToChat.userName}`) }}>{UserToChat.userName}</Typography>
        </Box>
    </Box>
}
export default ChatHeader;