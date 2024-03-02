import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

const Message = ({ message, senderId, senderProfilePic }) => {
    const theme = useTheme();
    const user = useSelector((state) => state.user);
    const isSender = senderId === user._id ? true : false;
    
    return <Box sx={{flex:1,display: "flex", alignItems: "center", flexDirection: isSender ? "row-reverse" : "row" }}>
        {
            senderProfilePic === "" ?
                <Avatar sx={{ height: "2.5rem", width: "2.5rem" }}></Avatar>
                :
                <Avatar src={senderProfilePic} sx={{ height: "2.5rem", width: "2.5rem" }}></Avatar>
        }
        <Typography sx={{ background: theme.palette.neutral.light, borderRadius: "1rem",textOverflow:"ellipsis", p: 1, m: 1, alignItems: isSender ? "end" : "start", justifyContent: isSender ? "end" : "start", }}>
            {message}
        </Typography>
    </Box>
}
export default Message;