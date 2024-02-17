import { Avatar, Box, Button, Dialog, Divider, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux"
import { Follow } from "../../components/follow";
import GridOnIcon from '@mui/icons-material/GridOn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import { setLogin } from "../../redux/reducers";
const ProfilePage = () => {
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [ListData, setListData] = useState([]);
    const [isLoggedInUser, setIsLoggedInUser] = useState(true)
    const theme = useTheme()
    const navigate = useNavigate();
    const { userName } = useParams();
    const [user, setUser] = useState([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalFollowers, setTotalFollowers] = useState(0);
    const [totalFollowing, setTotalFollowing] = useState(0);

    const User = useSelector((state) => state.user);
    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/${userName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            // console.log(data)
            setUser(data)
        } catch (error) {
            console.log("Error in getting the profile details");
        };
    }

    useEffect(() => {
        getUser()
    }, [userName]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (user) {
            setTotalPosts(user.posts ? user.posts.length : 0);
            setTotalFollowers(user.followers ? user.followers.length : 0);
            setTotalFollowing(user.following ? user.following.length : 0);
        }
        setIsLoggedInUser(User.userName === userName ? true : false)
    }, [user, User, userName]);

    const handleListData = async (title) => {
        try {
            let url = ''
            if (await title === 'followers') {
                url = `http://localhost:3001/users/${userName}/followers`
                setTitle(title);
            } else if (title === 'following') {
                url = `http://localhost:3001/users/${userName}/following`
                setTitle(title);
            }
            // console.log(await url)
            await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).then(async (res) => {
                const data = await res.json();
                // console.log(data)
                setListData(data)
                handleClickOpen()
            })
        } catch (error) {
            console.log(error)
        }
    }
    const NavigateToProfile = (userName) => {
        handleClose();
        navigate(`/profile/${userName}`);
    }

    return <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: "2rem", m: "2rem 0" }}>
            {
                user.picturePath === "" ?
                    <Avatar sx={{ width: "10rem", height: "10rem",borderRadius:"10%" }} />
                    :
                    <Avatar src={user.picturePath} sx={{ width: "10rem", height: "10rem",cursor:"pointer",borderRadius:"10%" }} alt={user.userName} />
            }
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", }}>
                {/* user details */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 3, p: 1 }}>
                    <Typography sx={{ fontSize: "1.2rem" }}>{userName}</Typography>
                    {
                        isLoggedInUser ?
                            <>
                                <Button variant="text" sx={{ color: theme.palette.neutral.dark, background: theme.palette.neutral.light, textTransform: "none", borderRadius: 2 }}>
                                    <Typography sx={{ fontSize: "0.9rem", cursor: "pointer" }}>
                                        Edit profile
                                    </Typography>
                                </Button>
                                <SettingsOutlinedIcon sx={{ fontSize: "1.5rem", cursor: "pointer" }} />
                            </>
                            :
                            <>
                                <Follow user2userName={userName}></Follow>
                            </>
                    }
                </Box>
                <Box sx={{ display: "flex", gap: 3, p: "0.5rem" }}>
                    <Typography sx={{ fontSize: "0.9rem" }}>{totalPosts} posts</Typography>
                    <Typography sx={{ fontSize: "0.9rem", cursor: "pointer" }} onClick={() => handleListData('followers')} >{totalFollowers} followers</Typography>
                    <Typography sx={{ fontSize: "0.9rem", cursor: "pointer" }} onClick={() => handleListData('following')} >{totalFollowing} following</Typography>
                    <Dialog maxWidth="sm" sx={{ width: "100%" }} open={open} onClose={handleClose}>
                        <Box sx={{ flex: 1, p: 1, display: "flex", alignItems: "center", width: "400px" }}>
                            <Typography sx={{ flex: 1, p: 1, fontSize: "1.1rem", textTransform: "capitalize" }}>{title}</Typography>
                            <CloseOutlinedIcon onClick={handleClose} sx={{ fontSize: "2rem" }} />
                        </Box>
                        <Divider></Divider>
                        {
                            Array.isArray(ListData) && (
                                ListData.length > 0 ? (
                                    <Box sx={{ minHeight: "350px", flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
                                        {
                                            ListData.map((user) => {
                                                return <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", m: 1 }}>
                                                    <Avatar src={user.picturePath} sx={{ borderRadius: 2, height: "3rem", width: "3rem" }} />
                                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                        <Typography onClick={()=>NavigateToProfile(user.userName)} >{user.userName}</Typography>
                                                        <Typography>{user.firstName} {user.lastName}</Typography>
                                                    </Box>
                                                </Box>
                                            })
                                        }

                                    </Box>
                                ) : (
                                    <Box sx={{ minHeight: "350px", flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
                                        <Typography sx={{ flex: 1, fontSize: "1rem", p: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>No User Found</Typography>
                                    </Box>
                                )
                            )
                        }
                    </Dialog>
                </Box>
                <Box sx={{ p: 1 }}>
                    <Typography sx={{ fontSize: "1rem" }}>
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography sx={{ fontSize: "0.85rem", width: "15rem" }}>
                        {user.bio}
                    </Typography>
                </Box>
            </Box>
        </Box>
        <Divider orientation="horizontal" variant="middle" flexItem />
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3rem", }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: "0.6rem", color: theme.palette.neutral.dark, '&:hover': { cursor: "pointer" } }}>
                <GridOnIcon sx={{ fontSize: "0.85rem" }} />
                <Typography sx={{ fontSize: "0.85rem" }} > POSTS</Typography>
            </Box>
            {isLoggedInUser && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: "0.6rem", color: theme.palette.neutral.dark, '&:hover': { cursor: "pointer" } }} >
                    <TurnedInNotIcon sx={{ fontSize: "0.85rem" }} />
                    <Typography sx={{ fontSize: "0.85rem" }} > SAVED</Typography>
                </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: "0.6rem", color: theme.palette.neutral.dark, '&:hover': { cursor: "pointer" } }}>
                <AssignmentIndOutlinedIcon sx={{ fontSize: "0.85rem" }} />
                <Typography sx={{ fontSize: "0.85rem" }} > TAGGED</Typography>
            </Box>
        </Box>
        <Box sx={{ flex: 1 }}>
        </Box>
    </Box>
};

export default ProfilePage;