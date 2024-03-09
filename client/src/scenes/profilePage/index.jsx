import { Avatar, Box, Dialog, Divider, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux"
import { Follow } from "../../components/follow";
import GridOnIcon from '@mui/icons-material/GridOn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EditProfile from "../../components/editProfile";
import Settings from "../../components/settings";
import ActivityFeed from "./ActivityFeed";
// import { setLogin } from "../../redux/reducers";
const ProfilePage = () => {
    const [active, setActive] = useState("posts")
    const [AFT, setAFT] = useState("posts")
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);
    const [profilePicOpen, setProfilePicOpen] = useState(false);
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
    }, [userName, User])
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
    const handleProfilePic = () => {
        setProfilePicOpen(!profilePicOpen)
    }

    return <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Dialog open={profilePicOpen} onClose={handleProfilePic}>
            {
                user.picturePath === "" ?
                    <Avatar sx={{ width: "20rem", height: "20rem" }} />
                    :
                    <Avatar src={user.picturePath} sx={{
                        width: "20rem", height: "20rem", cursor: "pointer",
                        borderRadius: "1%"
                    }} />
            }
        </Dialog>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, m: "2rem 0"}}>
            {/* <Box onClick={handleProfilePic} m={0}> */}
            {
                user.picturePath === "" ?
                    <Avatar sx={{ width: "10rem", height: "10rem", borderRadius: "10%" }} />
                    :
                    <Avatar src={user.picturePath} sx={{ width: "10rem", height: "10rem", cursor: "pointer", borderRadius: "10%" }} onClick={handleProfilePic} />
            }
            {/* </Box> */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column",background:theme.palette.background.alt,borderRadius:"1rem" }}>
                {/* user details */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 3, p: 1 }}>
                    <Typography sx={{ fontSize: "1.2rem",fontWeight:"bold" }}>{userName}</Typography>
                    {
                        !isLoggedInUser &&
                        <>
                            <Follow user2userName={userName}></Follow>
                        </>
                    }
                </Box> 
                <Box sx={{ display: "flex", flexDirection: "column",p: "0 0.5rem" }}>
                    <Typography sx={{ fontSize: "0.9rem" }}>{totalPosts} posts</Typography>
                    <Box sx={{flex:1,display:"flex",gap: 1, alignItems: "center" }}>
                        <Typography sx={{ fontSize: "0.9rem", cursor: "pointer" }} onClick={() => handleListData('followers')} >{totalFollowers} followers</Typography>
                        <Typography sx={{ fontSize: "0.9rem", cursor: "pointer" }} onClick={() => handleListData('following')} >{totalFollowing} following</Typography>
                    </Box>
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
            <Dialog maxWidth="sm" sx={{ width: "100%" }} open={open} onClose={handleClose}>
                <Box sx={{ flex: 1, p: 1, display: "flex", alignItems: "center", width: "400px" }}>
                    <Typography sx={{ flex: 1, p: 1, fontSize: "1.1rem", textTransform: "capitalize" }}>{title}</Typography>
                    <CloseOutlinedIcon onClick={handleClose} sx={{ fontSize: "2rem" }} />
                </Box>
                <Divider></Divider>
                {
                    Array.isArray(ListData) && (
                        ListData.length > 0 ? (
                            <Box sx={{ minHeight: "350px", maxHeight: "50vh", flex: 1, display: "flex", flexDirection: "column", overflow: "auto", scrollbarWidth: "none" }}>
                                {
                                    ListData.map((user) => {
                                        return <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", m: 1 }}>
                                            <Avatar src={user.picturePath} sx={{ borderRadius: 2, height: "3rem", width: "3rem" }} />
                                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                <Typography onClick={() => NavigateToProfile(user.userName)} sx={{ cursor: "pointer", fontWeight: "bold" }}>{user.userName}</Typography>
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
            {
                isLoggedInUser &&
                <>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", p: "0.2rem", background: theme.palette.background.alt, borderRadius: "2rem" }}>
                        <Settings></Settings>
                        <EditProfile></EditProfile>
                    </Box>
                </>
            }
        </Box>
        <Divider orientation="horizontal" variant="middle" flexItem />
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3rem", }}>
            <Box sx={{ borderTop: active === "posts" && `1px solid ${theme.palette.neutral.dark}`, display: "flex", alignItems: "center", gap: 1, p: "0.6rem", color: theme.palette.neutral.dark, '&:hover': { cursor: "pointer" } }} onClick={() => { setAFT("posts"); setActive("posts") }} >
                <GridOnIcon sx={{ fontSize: "0.85rem" }} />
                <Typography sx={{ fontSize: "0.85rem" }} > POSTS</Typography>
            </Box>
            {isLoggedInUser && (
                <Box sx={{ borderTop: active === "saved" && `1px solid ${theme.palette.neutral.dark}`, display: "flex", alignItems: "center", gap: 1, p: "0.6rem", color: theme.palette.neutral.dark, '&:hover': { cursor: "pointer" } }} onClick={() => { setAFT("saved"); setActive("saved") }}>
                    <TurnedInNotIcon sx={{ fontSize: "0.85rem" }} />
                    <Typography sx={{ fontSize: "0.85rem" }} > SAVED</Typography>
                </Box>
            )}
            <Box sx={{ borderTop: active === "tagged" && `1px solid ${theme.palette.neutral.dark}`, display: "none", alignItems: "center", gap: 1, p: "0.6rem", color: theme.palette.neutral.dark, '&:hover': { cursor: "pointer" } }} onClick={() => { setAFT("tagged"); setActive("tagged") }} >
                <AssignmentIndOutlinedIcon sx={{ fontSize: "0.85rem" }} />
                <Typography sx={{ fontSize: "0.85rem" }} > TAGGED</Typography>
            </Box>
        </Box>
        <Box sx={{ flex: 1 }}>
            <ActivityFeed Type={AFT} user={user}></ActivityFeed>
        </Box>
    </Box>
};

export default ProfilePage;