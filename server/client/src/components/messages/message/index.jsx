import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Message = ({ message, senderId, senderProfilePic, createdAt }) => {
    const theme = useTheme();
    const user = useSelector((state) => state.user);
    const isSender = senderId === user._id ? true : false;
    const [time, setTime] = useState("");
    useEffect(() => {
        setTime(() => {
            // console.log(typeof createdAt) // return String
            //converting String To Date object
            const Time = new Date(createdAt);
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
            return `${hours}:${minutes} ${ampm}`
        })
    }, [])

    return <Box sx={{ flex: 1, display: "flex", alignItems: "center", flexDirection: isSender ? "row-reverse" : "row" }}>
        {
            senderProfilePic === "" ?
                <Avatar sx={{ height: "3rem", width: "3rem" }}></Avatar>
                :
                <Avatar src={senderProfilePic} sx={{ height: "3rem", width: "3rem" }}></Avatar>
        }
        <Box sx={{maxWidth:"85%",background: theme.palette.neutral.light, borderRadius: "1rem",p:1,m:1, alignItems: isSender ? "end" : "start", justifyContent: isSender ? "end" : "start", flexDirection: isSender ? "row" : "row-reverse" }}>
            <Typography sx={{textOverflow: "ellipsis" }}>
                {message}
            </Typography>
            <Typography sx={{textAlign:isSender?"end":"start",fontSize: "0.75rem", color: theme.palette.text.secondary }}>
                {time}
            </Typography>
        </Box>
    </Box>
}
export default Message;