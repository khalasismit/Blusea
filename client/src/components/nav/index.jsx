import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { palette } = useTheme();
    return <Box sx={{ p: "0.5rem", boxShadow: isNonMobile ? "1px 0px 5px rgba(0,0,0,0.1)" : "", m: "0 0rem", height: "100vh", width: isNonMobile ? "5rem" : "100%", display: "flex", flexDirection: "column", alignItems: "left", justifyContent: "space-around", gap: "4rem" }}>
        {isNonMobile && (
            <Box sx={{
                p: "0.7rem 1rem 0.2rem 1rem",
                fontSize: "2rem",
                '& > *': {
                    color: palette.neutral.dark,
                    cursor: 'pointer', // Add a pointer cursor on hover
                }
            }}>
                <Box>
                    <InstagramIcon sx={{ fontSize: '2rem' }} />
                </Box>
            </Box>
        )}

        <Box sx={{
            flex: 1,
            display: "flex",
            flexDirection: isNonMobile ? "column" : "row",
            justifyContent: "space-evenly",
            padding: isNonMobile ? "0.5rem 0rem" : "",
            boxShadow: isNonMobile ? "" : "0px -1px 5px rgba(0,0,0,0.1)",
            position: isNonMobile ? "" : "fixed",
            left: isNonMobile ? "" : "0",
            right: isNonMobile ? "" : "0",
            bottom: isNonMobile ? "" : "0",
            color: palette.neutral.dark,
            '& > *': {
                borderRadius: "1rem",
                p: "0.7rem 1rem 0.2rem 1rem", fontSize: "2rem"
            },
            '& > *:hover': {
                color: palette.neutral.light,
                background: palette.neutral.main, // Change the background color on hover
                cursor: 'pointer', // Add a pointer cursor on hover
            },

        }}>
            <Link to={"/"} style={{ color: palette.neutral.dark }}>
                <Box>
                    <HomeIcon titleAccess='Home' sx={{ fontSize: "2rem" }} />
                </Box>
            </Link>
            <Link to={"/explore"} style={{ color: palette.neutral.dark }}>
                <Box>
                    <ExploreIcon titleAccess='Explore' sx={{ fontSize: "2rem" }} />
                </Box>
            </Link>
            <Link to={"/search"} style={{ color: palette.neutral.dark }}>
                <Box>
                    <SearchIcon titleAccess='Search' sx={{ fontSize: "2rem" }} />
                </Box>
            </Link>
            <Link to={"/create"} style={{ color: palette.neutral.dark }}>
                <Box>
                    <AddBoxIcon titleAccess='Create' sx={{ fontSize: "2rem" }} />
                </Box>
            </Link>
            <Link to={"/notifications"} style={{ color: palette.neutral.dark }}>
                <Box>
                    <NotificationsIcon titleAccess='Notifications' sx={{ fontSize: "2rem" }} />
                </Box>
            </Link>
            <Link to={"/profile "} style={{ color: palette.neutral.dark }}>
                <Box>
                    <PersonIcon titleAccess='Profile' sx={{ fontSize: "2rem" }} />
                </Box>
            </Link>
        </Box>

        {isNonMobile && (
            <Box sx={{
                // padding: isNonMobile ? "0.5rem 0rem" : "",
                // m: "2rem 0",
                '& > *': {
                    borderRadius: "1rem",
                    p: "0.7rem 1rem 0.5rem 1rem",
                },
                '& > *:hover': {
                    color: palette.neutral.light,
                    background: palette.neutral.main, 
                    cursor: 'pointer',
                }
            }}>
                    <Box>
                <Link to={"/settings"} style={{ color: palette.neutral.dark }}>
                        <MenuIcon titleAccess='Settings' sx={{ fontSize: "2rem" }} />
                </Link>
                    </Box>
            </Box>
        )}
    </Box>
};

export default Navigation;