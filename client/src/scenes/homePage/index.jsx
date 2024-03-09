import { Box, useMediaQuery, useTheme } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Feed from "../../components/feed";
import Requests from "../../components/requests";
import Ads from "../../components/ads";
import { Link } from "react-router-dom";
// import Story from "../../components/feed/magnetStories/story";
const HomePage = () => {
    const isNonMobile = useMediaQuery('(min-width:1000px)')
    const theme = useTheme();
    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    const handleDragStart = (e) => {
        e.preventDefault();
    };
    return <Box sx={{ display: "flex", flex: 1, justifyContent: "space-evenly" }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {
                !isNonMobile && <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", background: theme.palette.background.alt, position: "sticky", top: 0, zIndex: 100 }}>
                    <Box sx={{ flex: 1, display: "flex", alignItems: "center", }}>
                        <img
                            src={"https://firebasestorage.googleapis.com/v0/b/magnet784492.appspot.com/o/logo%2Fmagnet3.png?alt=media&token=750dc1ef-316a-4bf3-8a83-8024f0a90dea"}
                            onContextMenu={handleContextMenu}
                            onDragStart={handleDragStart}
                            style={{ width: "4.8rem", height: "3.8rem", objectFit: "cover" }}
                        />
                    </Box>
                    <Link
                        to={"/notifications"}
                        style={{ textDecoration: "none", color: theme.palette.neutral.dark }}
                    >
                        <NotificationsIcon titleAccess='Notifications' sx={{ fontSize: "2rem", m: "0 1rem" }} />
                    </Link>
                </Box>
            }
            <Feed></Feed>
            {/* <Box>
                <Story></Story> 
            </Box> */}
        </Box>
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