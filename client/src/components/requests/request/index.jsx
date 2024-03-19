import { Avatar, Box, Typography } from "@mui/material";
import {Accept} from "../../follow";
import {Decline} from "../../follow";
import { useNavigate } from "react-router-dom";
const Request = ({ userName,reqId,profilePic }) => {
    const navigate = useNavigate()
    // const { palette } = useTheme();
    return <Box sx={{
        display: "flex",
        justifyContent:"space-between",
        // width:"100%",
        // maxWidth: "max-content",
        height: "max-content",
        p: 1,
        m:"0.1rem",
        gap: 3,
        borderRadius: 2
    }}>
        <Box sx={{ display: "flex",alignItems:"center",gap: "1rem" }}>
            <Avatar src={profilePic} sx={{ borderRadius: 2, height: "3rem", width: "3rem" }}></Avatar>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{fontSize:"0.9rem",fontWeight:"bold",cursor:"pointer"}} onClick={()=>{
                    navigate(`/profile/${userName}`)
                }} >{userName}</Typography>
                <Typography sx={{fontSize:"0.9rem"}}> • wants to follow you • </Typography>
            </Box>
        </Box>
        <Box sx={{display: "flex", justifyContent: "space-around", gap: "1rem" }}>
            {/* accept or decline individual without button group*/}
            <Accept reqId={reqId}></Accept>
            <Decline reqId={reqId}></Decline>
        </Box>
    </Box>
}
export default Request;