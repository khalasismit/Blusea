import { Avatar, Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
const Notification = ({ message, sender, post, url, createdAt }) => {
    const navigate = useNavigate()
    const [time, setTime] = useState("")
    function timeAgo(CA) {
        const createdAt = new Date(CA)
        const now = new Date();
        const diff = now - createdAt;

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        if (weeks >= 1) {
            if (diff > 0) {
                return `+${weeks}w`;
            } else {
                return `${weeks}w`;
            }
        } else if (days >= 1) {
            return `${days}d`;
        } else if (hours >= 1) {
            return `${hours}h`;
        } else {
            return `${minutes}m`;
        }
    }
    useEffect(() => {
        setTime(timeAgo(createdAt))
    }, [])
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {
                    sender.picturePath === "" ?
                        <Avatar sx={{ height: "3rem", width: "3rem" }}></Avatar>
                        :
                        <Avatar src={sender.picturePath} sx={{ height: "3rem", width: "3rem" }}></Avatar>
                }
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography fontSize="1rem">
                        <span style={{ fontSize: "1rem", fontWeight: "bold", cursor: "pointer" }} onClick={() => { navigate(`/profile/${sender.userName}`) }} >@{sender.userName} </span>
                        <span>{message}</span>
                        <span style={{ fontSize:"0.9rem",}}> • {time}</span>
                    </Typography>
                    {/* <Typography fontSize={"1rem"}>{message}</Typography>
                    <Typography fontSize={"1rem"}>•{time}</Typography> */}
                </Box>
            </Box>
            {
                url === "" ?
                    <Avatar sx={{ height: "3rem", width: "3rem" }}></Avatar>
                    :
                    <Avatar src={url} sx={{ borderRadius: '1px', height: "3rem", width: "3rem" }}></Avatar>
            }
        </Box>
    )
}
export default Notification