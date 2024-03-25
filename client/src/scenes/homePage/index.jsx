import { Badge, Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Feed from "../../components/feed";
import Requests from "../../components/requests";
import Ads from "../../components/ads";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotifs } from "../../redux/reducers";
const HomePage = ({ socket }) => {
    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery('(min-width:1000px)')
    const nonMobile = useMediaQuery('(min-width:600px)')
    const theme = useTheme();
    const [newNotif, setNewNotif] = useState(useSelector(state => state.notifs));
    // const user = useSelector(state => state.user);
    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    const handleDragStart = (e) => {
        e.preventDefault();
    };
    useEffect(() => {
        socket.on("notification", (data) => {
            if (newNotif[newNotif.length - 1] !== data) {
                setNewNotif(newNotif => [...newNotif, data])
                dispatch(setNotifs({ notifs: [...newNotif, data] }));
            }
        })
        return () => {
            socket.off("notification");
            socket.close();
        }
    }, [socket])
    return <Box sx={{ display: "flex", flex: 1, justifyContent: "space-evenly" }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {
                !nonMobile && <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", background: theme.palette.background.default, position: "sticky", top: 0, zIndex: 100 }}>
                    <Box sx={{ flex: 1, display: "flex", alignItems: "center", }}>
                        <img
                            src={"https://firebasestorage.googleapis.com/v0/b/magnet784492.appspot.com/o/logo%2Fmagnet3.png?alt=media&token=750dc1ef-316a-4bf3-8a83-8024f0a90dea"}
                            onContextMenu={handleContextMenu}
                            onDragStart={handleDragStart}
                            style={{ width: "4.2rem", height: "3.2rem", objectFit: "cover" }}
                        />
                    </Box>
                    <Box>
                        <Link
                            onClick={() => {
                                setNewNotif([]);
                                dispatch(
                                    setNotifs({
                                        notifs: []
                                    })
                                )
                            }}
                            to={"/notifications"}
                            style={{ textDecoration: "none", color: theme.palette.neutral.dark }}
                        >
                            <Badge badgeContent={newNotif.length} color="secondary" sx={{ m: "0 1rem" }}>
                                <NotificationsIcon titleAccess='Notifications' sx={{ fontSize: "2rem" }} />
                            </Badge>
                        </Link>
                    </Box>
                </Box>
            }
            <Feed socket={socket}></Feed>
            {/* <Box>
                <Story></Story> 
            </Box> */}
        </Box>
        {isNonMobile &&
            (
                <Box sx={{ height: "100vh", flex: 1, display: "flex", flexDirection: "column" }}>
                    <Requests></Requests>
                    <Divider flexItem variant="middle" ></Divider>
                    <Ads></Ads>
                </Box>
            )
        }
    </Box>
};

export default HomePage;