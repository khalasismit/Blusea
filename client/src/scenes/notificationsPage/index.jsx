import { Box, CircularProgress, Divider, Typography, useMediaQuery, } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
// import io from "socket.io-client"
import Notification from "./notification"
const NotificationsPage = () => {
    const [loading,setLoading]= useState(false)
    const isNonMobile = useMediaQuery("(min-width:1000px)");
    // const socket = io("http://localhost:3001");
    const [Data, setData] = useState([]);
    const user = useSelector((state) => state.user)
    const getNotif = async () => {
        try {
            setLoading(true)
            const res = await fetch(`http://localhost:3001/notifications/${user._id}`, {
                method: "GET",
            });
            const notifs = await res.json();
            setData(notifs);
            console.log("notifs", notifs)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    }
    useEffect(() => {
        getNotif()
    }, []); //eslint-disable-line react-hooks/exhaustive-deps
    // socket.on("connect", () => {
    //     console.log('connected to server');
    //     //get notifications when connected to the server 
    // })
    // socket.on("notification", (data) => {
        //     console.log(data);
        //     setNotifications([...notifications, data])
        // })
        
        // useEffect(() => {
            //     socket.on("connect", () => {
                //         socket.emit("authenticate", user._id);
    //         socket.on("notification", (data) => {
    //             setNotifications(...notifications, data)
    //         })
    //     })
    // }, [])
    return <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ width: isNonMobile ? "50%" : "100%", display: "flex", alignItems: "center", p: "0 1rem" }}>
            <ArrowBackIosNewOutlinedIcon sx={{ fontSize: "2rem" }} onClick={() => { window.history.back() }} />
            <Typography sx={{ flex: 1, textAlign: "center", fontSize: "1.5rem", p: 1 }}>Notifications</Typography>
        </Box>
        <Divider flexItem />
        <Box sx={{ width: isNonMobile ? "50%" : "100%", display: "flex", flexDirection: "column-reverse", justifyContent: "center" }}>
            {
                !loading ? (
                    Data.map((notification, i) => (
                        <Notification
                            key={i}
                            message={notification._doc.message}
                            createdAt={notification._doc.createdAt}
                            sender={notification._doc.senderId}
                            post={notification._doc.postId}
                            url={notification.url}
                        ></Notification>
                    ))
                ) : (
                    <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", height: "50vh" }}>
                        <CircularProgress />
                    </Box>
                )
            }
        </Box>
    </Box>
}
export default NotificationsPage