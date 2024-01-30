import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import Mode from '../mode';

const Navigation = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    // const { palette } = useTheme();
    const theme = useTheme();
    return <Box sx={{ position: "sticky", top: 0, zIndex: 100, background: theme.palette.background.alt, borderRadius: 4, p: "0.5rem", boxShadow: isNonMobile ? "1px 0px 5px rgba(0,0,0,0.1)" : "", m: 0, height: isNonMobile ? "100vh" : "5rem", width: isNonMobile ? "max-content" : "100%", display: "flex", flexDirection: "column", alignItems: "left", justifyContent: "space-between" }}>
        {isNonMobile && (
            <Box sx={{
                // p: "0.7rem 1rem 0.2rem 1rem",
                p: "0 4rem",
                fontSize: "2rem",
                '& > *': {
                    color: theme.palette.neutral.dark,
                    cursor: 'pointer',
                }
            }}>
                <Box>
                    {/* <Typography sx={{
                    color: palette.neutral.main,
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                }}>
                    MAGNET
                </Typography> */}
                    <img src="./assets/logo/magnet3.png" style={{ width: "5rem", height: "4rem", objectFit: "cover" }} alt="" />
                </Box>
            </Box>
        )}
        <Box sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-beteen"
        }}>
            <Box sx={{
                flex: 1,
                display: "flex",
                // gap: "1rem",
                justifyContent: isNonMobile ? "" : "space-evenly",
                flexDirection: isNonMobile ? "column" : "row",
                padding: isNonMobile ? "1rem 0rem" : "0",
                boxShadow: isNonMobile ? "" : "0px -1px 5px rgba(0,0,0,0.1)",
                position: isNonMobile ? "" : "fixed",
                left: isNonMobile ? "" : "0",
                right: isNonMobile ? "" : "0",
                bottom: isNonMobile ? "" : "0",
                color: theme.palette.neutral.dark,
                zIndex: 100,
                background: theme.palette.background.alt,
                '& > *': {
                    borderRadius: 2,
                    p: "0.7rem 1rem", fontSize: "2rem"
                },
                '& > *:hover': {
                    color: theme.palette.neutral.light,
                    background: theme.palette.neutral.mediumMain, // Change the background color on hover
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
                <Link to={"/create"} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <AddBoxIcon titleAccess='Create' sx={{ fontSize: "2rem" }} />
                        {isNonMobile && (
                            <Typography>
                                Create
                            </Typography>
                        )}
                    </Box>
                </Link>
                <Link to={"/notifications"} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <NotificationsIcon titleAccess='Notifications' sx={{ fontSize: "2rem" }} />
                        {isNonMobile && (
                            <Typography>
                                Notification
                            </Typography>
                        )}
                    </Box>
                </Link>
                <Link to={"/profile "} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <PersonIcon titleAccess='Profile' sx={{ fontSize: "2rem" }} />
                        {isNonMobile && (
                            <Typography>
                                Profile
                            </Typography>
                        )}
                    </Box>
                </Link>
            </Box>

            {isNonMobile && (<Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <Box sx={{
                    display: "flex",
                    flexDirection: isNonMobile ? "column" : "row",
                    boxShadow: isNonMobile ? "" : "0px -1px 5px rgba(0,0,0,0.1)",
                    color: theme.palette.neutral.dark,
                    zIndex: 100,
                    background: theme.palette.background.alt,
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
                    <Link to={"/settings"} style={{ textDecoration: "none", color: theme.palette.neutral.dark }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <MenuIcon titleAccess='Settings' sx={{ fontSize: "2rem" }} />
                            {isNonMobile && (
                                <Typography>
                                    Settings
                                </Typography>
                            )}
                        </Box>
                    </Link>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Mode></Mode>
                </Box>
            </Box>
            )}
        </Box>
    </Box>
};

export default Navigation;