import { Box, useMediaQuery } from "@mui/material";
import Feed from "../../components/feed";
import Requests from "../../components/requests";
import Ads from "../../components/ads";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
const HomePage = () => {
    const socket = io("http://localhost:3001");
    const user = useSelector((state) => state.user)
    const isNonMobile = useMediaQuery('(min-width:1000px)')
    useEffect(()=>{
        socket.on("connect",()=>{
            socket.emit("authenticate", user._id);
        })
    },[])
    
    return <Box sx={{ display: "flex", flex: 1, justifyContent: "space-evenly" }}>
        {/* commented // */}
        <Feed></Feed>
        {isNonMobile &&
            (
                <Box sx={{ height: "100vh", flex: 1, gap: 1, display: "flex", flexDirection: "column" }}>
                        <Requests></Requests>
                        <Ads></Ads>
                </Box>
            )
        }
    </Box>
};

export default HomePage;