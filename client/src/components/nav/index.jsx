import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SearchIcon from '@mui/icons-material/Search';
// import Diversity2Icon from '@mui/icons-material/Diversity2';
import TextsmsIcon from '@mui/icons-material/Textsms';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Badge, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import Mode from '../mode';
import Create from '../create';
import { useDispatch, useSelector } from 'react-redux';
import { addNewMessages, setNotifs } from '../../redux/reducers';

const Navigation = ({ socket }) => {
    const dispatch = useDispatch();
    const [newNotif, setNewNotif] = useState(useSelector(state => state.notifs));
    const [totalNewMessages, setTotalNewMessages] = useState(0);
    const conversations = useSelector(state => state.conversations);
    
    
    const handleContextMenu = (e) => {
        e.preventDefault();
    };
    
    const handleDragStart = (e) => {
        e.preventDefault();
    };
    
    useEffect(()=>{
        let total = 0;
        conversations.forEach(conversation => {
            total += conversation.newMessages.length;
        });
        setTotalNewMessages(total);
    },[socket,conversations])
    
    const user = useSelector(state => state.user)
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();

    useEffect(() => {
        // socket.connect();
        // socket.emit("authenticate", user._id)
        socket.on("notification", (data) => {
            setNewNotif(prevnewNotif => [...prevnewNotif, data])
            dispatch(setNotifs({ notifs: [...newNotif, data] }));
        })

        socket.on("receive_message", (data) => {
            dispatch(addNewMessages({
                conversationId: data.conversationId,
                newMessages: [data.message]
            }))
            // setNewMessages(prevnewMessages => [...prevnewMessages, data]);
        })
        return () => {
            socket.off("notification")
            socket.off("receive_message")
            socket.close()
        }
    }, [conversations,socket]);

    return <Box sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        // borderRadius: 4,
        // p: "0.5rem",    
        // boxShadow: isNonMobile ? `0px -1px 5px ${theme.palette.neutral.light}`: "",
        background: theme.palette.background.default,
        borderRight: `1px solid ${theme.palette.neutral.light}`,
        height: isNonMobile ? "100vh" : "auto",
        width: isNonMobile ? "max-content" : "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        justifyContent: "space-between"
    }}>
        {isNonMobile && (
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // borderRadius: "1rem 1rem 0rem 0rem",
                p: "1.5rem 4rem",
                fontSize: "2rem",
                '& > *': {
                    color: theme.palette.neutral.dark,
                    cursor: 'pointer',
                }
            }}>
                <img src={"https://firebasestorage.googleapis.com/v0/b/magnet784492.appspot.com/o/logo%2Fmagnet3.png?alt=media&token=750dc1ef-316a-4bf3-8a83-8024f0a90dea"}
                    onContextMenu={handleContextMenu}
                    onDragStart={handleDragStart}
                    style={{ width: "5rem", height: "4rem", objectFit: "cover" }}
                />
                <Typography fontWeight="bold" fontSize="30px" color={theme.palette.neutral.dark} sx={{ lineHeight: "0px" }}>
                    Magnet
                </Typography>
            </Box>
        )}
        <Box sx={{
            p: "1rem 0 0 0",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
        }}>
            <Box sx={{
                flex: 1,
                display: "flex",
                // gap: "1rem",
                justifyContent: isNonMobile ? "" : "space-evenly",
                flexDirection: isNonMobile ? "column" : "row",
                padding: isNonMobile ? "1rem 0rem" : "0",
                // boxShadow: isNonMobile ? "" : "0px -1px 5px rgba(0,0,0,0.1)",
                position: isNonMobile ? "" : "fixed",
                left: isNonMobile ? "" : "0",
                right: isNonMobile ? "" : "0",
                bottom: isNonMobile ? "" : "0",
                color: theme.palette.neutral.dark,
                zIndex: 100,
                p: "0 0.5rem",
                background: theme.palette.background.default,
                '& > *': {
                    borderRadius: 2,
                    p: "0.7rem 1rem", fontSize: "2rem"
                },
                '& > *:hover': {
                    color: theme.palette.neutral.light,
                    background: theme.palette.neutral.light, // Change the background color on hover
                    cursor: 'pointer', // Add a pointer cursor on hover
                },
            }}>
                <Link to={"/home"} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <HomeIcon titleAccess='Home' sx={{ fontSize: "2rem" }} />
                        {isNonMobile && (
                            <Typography>
                                Home
                            </Typography>
                        )}
                    </Box>
                </Link>
                <Link to={"/explore"} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <ExploreIcon titleAccess='Explore' sx={{ fontSize: "2rem" }} />
                        {isNonMobile && (
                            <Typography>
                                Explore
                            </Typography>
                        )}
                    </Box>
                </Link>
                <Link to={"/search"} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <SearchIcon titleAccess='Search' sx={{ fontSize: "2rem" }} />
                        {isNonMobile && (
                            <Typography>
                                Search
                            </Typography>
                        )}
                    </Box>
                </Link>
                <Create></Create>
                {isNonMobile && <Link to={"/notifications"} onClick={() => { setNewNotif([]); dispatch(setNotifs({ notifs: [] })) }} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <Badge color="secondary" badgeContent={newNotif.length}>
                            <NotificationsIcon titleAccess='Notifications' sx={{ fontSize: "2rem" }} />
                        </Badge>
                        {isNonMobile && (
                            <Typography>
                                Notification
                            </Typography>
                        )}
                    </Box>
                </Link>}
                <Link to={"/chats"} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <Badge color="secondary" badgeContent={totalNewMessages}>
                            <TextsmsIcon titleAccess='Notifications' sx={{ fontSize: "2rem" }} />
                        </Badge>
                        {isNonMobile && (
                            <Typography>
                                Messaging
                            </Typography>
                        )}
                    </Box>
                </Link>
                <Link to={`/profile/${user.userName}`} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        {
                            user.picturePath === "" ?
                                <Avatar sx={{ borderRadius: 2, height: "2rem", width: "2rem", color: theme.palette.neutral.dark, background: "none" }}></Avatar>
                                :
                                <Avatar src={user.picturePath} sx={{ borderRadius: 2, height: "2rem", width: "2rem" }}></Avatar>
                        }
                        {isNonMobile && (
                            <Typography>
                                Profile
                            </Typography>
                        )}
                    </Box>
                </Link>
            </Box>

            {
                isNonMobile && (
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        // background: theme.palette.background.alt,
                        // borderRadius: "0 0 1rem 1rem",
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: isNonMobile ? "column" : "row",
                            boxShadow: isNonMobile ? "" : "0px -1px 5px rgba(0,0,0,0.1)",
                            color: theme.palette.neutral.dark,
                            zIndex: 100,
                            '& > *': {
                                borderRadius: 2,
                                p: "0.7rem 1rem"
                            },
                            '& > *:hover': {
                                color: theme.palette.neutral.light,
                                background: theme.palette.neutral.mediumMain,
                                cursor: 'pointer'
                            },
                        }}>
                            {/* <Link to={"/settings"} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}> */}
                            {/* <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <MenuIcon titleAccess='Settings' sx={{ fontSize: "2rem" }} />
                                {isNonMobile && (
                                    <Typography>
                                        More
                                    </Typography>
                                )}
                            </Box> */}
                            {/* </Link> */}
                        </Box>
                        <Mode></Mode>
                    </Box>
                )
            }
        </Box >
    </Box >
};

export default Navigation;