import { Avatar, Box, Typography, useTheme } from "@mui/material";
import {Accept} from "../follow";
import {Decline} from "../follow";
const Request = ({ userName,reqId }) => {
    const { palette } = useTheme();
    // const { typography } = useTheme();
    return <Box sx={{
        width:"max-content",
        maxWidth: "max-content",
        height: "max-content",
        p: 1,
        m:"0.1rem",
        display: "flex",
        // flexDirection: "column",
        background: palette.background.alt,
        gap: 3,
        borderRadius: 2,
        // border:"1px solid Black"
    }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Avatar src="./assets/images/Snapchat-1048757234.jpg" sx={{ borderRadius: 2, height: "3rem", width: "3rem" }}></Avatar>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>{userName}</Typography>
                <Typography> • Wants to follow you • </Typography>
            </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around", gap: "1rem" }}>
            {/* accept or decline individual without button group*/}
            <Accept reqId={reqId}></Accept>
            <Decline reqId={reqId}></Decline>
        </Box>
    </Box>
}
export default Request;