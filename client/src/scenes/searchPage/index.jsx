import { Avatar, Box, Divider, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import Chats from "../../components/chats"
const SearchPage = () => {
    const theme = useTheme()
    const isNonMobile = useMediaQuery('(min-width:1000px)')
    const navigate = useNavigate()
    const [searchData, setSearchData] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    const handleDragStart = (e) => {
        e.preventDefault();
    };

    const handleSearch = async (value) => {
        const searchRes = await fetch(`http://localhost:3001/users/search/${value}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });
        const data = await searchRes.json();
        setSearchData(data);
    }
    const getSuggestion = async () => {
        const res = await fetch(`http://localhost:3001/users/suggestions/${user._id}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        })
        const data = await res.json();
        setSuggestions(data);
        console.log(data)
    }
    useEffect(() => {
        if (user._id) {
            getSuggestion()
        }
    }, [])
    return <Box sx={{ display: "flex", flex: 1 }}>
        <Box sx={{ height: isNonMobile ? "100vh" : "90%", display: "flex", flex: 1 }}>
            <Box sx={{ flex: 1, borderRadius: "0.5rem", m: 1, display: "flex", flexDirection: isNonMobile ? "row" : "column" }}>
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", background: theme.palette.background.default}}>
                    <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        size="small"
                        onChange={e => {
                            handleSearch(e.target.value)
                        }}
                        sx={{ m: 2 }}
                    ></TextField>
                    <Box sx={{ overflowY: "auto", scrollbarWidth: "none", p: "1rem 0" }}>
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
                                        borderRadius:2,
                                        ":hover": { background: theme.palette.background.alt }
                                    }}
                                    onClick={() => {
                                        navigate(`/profile/${user.userName}`)
                                    }}>
                                    <Avatar srcSet={user.picturePath}></Avatar>
                                    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                        <Typography fontSize="1rem" fontWeight="bold">{user.firstName} {user.lastName}</Typography>
                                        <Typography fontSize="0.9rem">{user.userName} | followers: {user.followers.length}</Typography>
                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
                {
                    isNonMobile &&
                    <Divider orientation="vertical" sx={{ m: 1 }} flexItem></Divider>
                }
                {isNonMobile && (
                    <Box sx={{ flex: 1, borderRadius: 2, background: theme.palette.background.default }}>
                        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                            <Box sx={{
                                height: "30%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
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
                                    Looking for someone to connect with ?
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{maxHeight:"75%",display: "grid", gridTemplateColumns: "repeat(3, 1fr)",overflow:"auto",scrollbarWidth:"none",p: 1 }}>
                            {
                                suggestions && suggestions.map((user) => (
                                    <Box key={user._id}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: "1rem",
                                            p: "0.5rem",
                                            m: "0.2rem",
                                            borderRadius: 2,
                                            ":hover": { background: theme.palette.background.alt }
                                        }}
                                        onClick={() => {
                                            navigate(`/profile/${user.userName}`)
                                        }}>
                                        <Avatar srcSet={user.picturePath} sx={{ width: "5rem", height: "5rem", borderRadius: 5 }}></Avatar>
                                        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                            <Typography sx={{ fontSize: "1rem", fontWeight: "bold", textAlign: "center" }}>{user.userName}</Typography>
                                            <Typography sx={{ fontSize: "0.9rem", textAlign: "center" }}>{user.firstName} {user.lastName}</Typography>
                                            <Typography sx={{fontSize:"0.8rem",textAlign:"center"}}>followers: {user.followers.length}</Typography>
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    </Box>
}
export default SearchPage