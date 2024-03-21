import { Avatar, Box, Divider, TextField, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import Chat from "./chat";
import { useEffect, useState } from "react";
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import { useNavigate } from "react-router-dom";
const Chats = ({ socket }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isSearch, setIsSearch] = useState(false);
    const [otherUserId, setOtherUserId] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [conversations, setConversations] = useState([]);
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const handleCreateConv = async () => {
        const res = await fetch(`http://localhost:3001/chats/conversation/create`, {
            method: "POST",
            headers: { "Content-Type": "Application/json",Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                userId: user._id,
                otherUserId: otherUserId
            })
        })
        const data = await res.json();
        if (res.ok) {
            navigate(`/chats/${data._id}/messages`)
        }
    }
    const getConversations = async () => {
        const res = await fetch(`http://localhost:3001/chats/${user._id}/conversations`, {
            method: "GET",
            headers:{Authorization: `Bearer ${token}`}
        })
        const data = await res.json();
        setConversations(data);
    }
    useEffect(() => {
        getConversations();
        socket.connect();
        socket.emit("authenticate", user._id);
        return ()=>{
            socket.close()
        }
    }, [socket]);
    const handleIsSearch = () => {
        setIsSearch(!isSearch)
    }
    const handleSearch = async (value) => {
        const searchRes = await fetch(`http://localhost:3001/users/${user._id}/search/${value}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });
        const data = await searchRes.json();
        setSearchData(data);
    } 
    const theme = useTheme();
    return <Box sx={{ flex: 1, display: "flex", background: theme.palette.background.default, flexDirection: "column", p: 1, borderRadius: "1rem" }}>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
            <Typography sx={{ fontSize: "1.1rem", p: "0 1rem",fontWeight:"bold" }}>Conversations</Typography>
            <Box onClick={handleIsSearch} sx={{
                p: "0.5rem 0.7rem",
                borderRadius: "50%",
                ':hover': { background: theme.palette.neutral.light }
            }}>
                {
                    isSearch ? <SearchOffOutlinedIcon sx={{ fontSize: "1.6rem", color: theme.palette.neutral.dark }} />
                        : <PersonSearchOutlinedIcon sx={{ fontSize: "1.6rem", color: theme.palette.neutral.dark }} />
                }
                {/* <PersonSearchOutlinedIcon sx={{ fontSize: "1.6rem"}} /> */}
            </Box>
        </Box>
        <Divider sx={{ m: 1 }} flexItem></Divider>
        {isSearch ? (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField fullWidth
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    size="small"
                    onChange={e => {
                        handleSearch(e.target.value)
                    }}
                ></TextField>
                <Box sx={{ p: "1rem 0" }}>
                    {
                        searchData && searchData.map((user) => (
                            <Box key={user._id}
                                sx={{
                                    flex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                    p: "0.5rem",
                                    m: "0.2rem",
                                    borderRadius: 2,
                                    ":hover": { background: theme.palette.background.alt }
                                }}
                                onClick={() => {
                                    setOtherUserId(user._id);
                                    handleCreateConv()
                                }}>
                                <Avatar srcSet={user.picturePath}></Avatar>
                                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                    <Typography fontSize="1rem" fontWeight="bold">{user.firstName} {user.lastName}</Typography>
                                    <Typography fontSize="0.5remrem">followers: {user.followers.length}</Typography>
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
        ) : (
            <Box sx={{ overflow: "auto", scrollbarWidth: "none", display: "flex", flexDirection: "column", }}>
                {
                    !conversations.length <= 0 ? (
                        conversations && conversations.map((conversation) => (
                            <Box
                                key={conversation._id}
                            >
                                <Chat
                                    socket={socket}
                                    id={conversation._id}
                                    participants={conversation.participants}
                                    messages={conversation.messages}
                                // messages={conversation.messages[conversation.messages.length-1].message}
                                />
                            </Box>
                        ))
                    ) : (
                        <Box >
                            <Typography sx={{ justifyContent: "center", display: "flex", fontSize: "1rem" }}>
                                No conversations yet
                            </Typography>
                            <Typography sx={{ justifyContent: "center", display: "flex", fontSize: "0.9rem" }}>
                                start new conversation by clicking on the search button in the top right corner
                            </Typography>
                        </Box>

                    )
                }
            </Box>
        )}
    </Box>
}
export default Chats;