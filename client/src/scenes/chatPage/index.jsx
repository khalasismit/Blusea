import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material"
import Chats from "../../components/chats"
const ChatPage = ({socket}) => {
    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    const handleDragStart = (e) => {
        e.preventDefault();
    };
    const theme = useTheme()
    const isNonMobile = useMediaQuery('(min-width:1000px)')
    return <Box sx={{ display: "flex", flex: 1 }}>
        <Box sx={{ height: isNonMobile?"100vh":"90%", display: "flex", flex: 1 }}>
            <Box sx={{ flex: 1, borderRadius: "0.5rem", m: 1, display: "flex", flexDirection: isNonMobile ? "row" : "column" }}>
                <Chats socket={socket}></Chats>
                {
                    isNonMobile &&
                    <Divider orientation="vertical" sx={{ m: 1 }} flexItem></Divider>
                }
                {isNonMobile && (
                    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                        <Box sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "1rem",
                            background: theme.palette.background.default,
                            // p: "1.5rem 4rem",
                            fontSize: "2rem",
                            '& > *': {
                                color: theme.palette.neutral.dark,
                            }
                        }}>
                            <img src={"https://firebasestorage.googleapis.com/v0/b/magnet784492.appspot.com/o/logo%2Fmagnet3.png?alt=media&token=750dc1ef-316a-4bf3-8a83-8024f0a90dea"}
                                onContextMenu={handleContextMenu}
                                onDragStart={handleDragStart}
                                style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
                                alt="Magnet" />
                            <Typography fontWeight="bold" fontSize="30px" color={theme.palette.neutral.dark} sx={{ lineHeight: "0px" }}>
                                Magnet
                            </Typography>
                            <Typography fontSize={"1rem"} color={theme.palette.neutral.dark} sx={{ lineHeight: "5rem" }}>
                                To start chatting, please select a user from the list on the left.
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    </Box>
}
export default ChatPage