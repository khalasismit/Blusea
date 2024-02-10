import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"
import { Follow } from "../../components/follow";
import GridOnIcon from '@mui/icons-material/GridOn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import { setLogin } from "../../redux/reducers";
const ProfilePage = () => {
    const [isLoggedInUser, setIsLoggedInUser] = useState(true)
    const theme = useTheme()
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

    return <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: "2rem", m: "2rem 0" }}>
            <img src="https://storage.googleapis.com/magnet784492.appspot.com/1707242019109-Snapchat-1395104439.jpg?GoogleAccessId=firebase-adminsdk-n84xd%40magnet784492.iam.gserviceaccount.com&Expires=253402300799&Signature=pRxC8URIXXGFlKqrFMra6ra88lftBEF63cgYTwi%2FcOdg62yZ3lo464GLFTy0svtpcDeCvSv0f2LbuXP4fwoxXSGiIlLyZyDGZuL%2BnstXBsTsRdATJcV0R2JYnppdKxm7XuwKcVR1blTdn2Bp4dgzgnNg5Aj%2F7xd7t1foC4Hx9e044zKBf2oamLD66RV6Q7nf6jm7oV5800O%2Bd84N4S%2FbYGUpZUMC1WPoizkkqSo41aEGSIZHXvHrvlpQ9bRIXOjkroEuf1GlrXOWAYtdprfmSOGPX0vFEfMb2ORUBrORidF91w8Ewb%2Ft2XjoI1IaVvpx7iXCSmxGZk0u3ybOh%2FtFiw%3D%3D" style={{ width: "10rem", height: "10rem", objectFit: "cover", borderRadius: "10%", cursor: "pointer" }} alt="" />
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
                    <Typography sx={{ fontSize: "0.9rem", cursor: "pointer" }}>{totalFollowers} followers</Typography>
                    <Typography sx={{ fontSize: "0.9rem", cursor: "pointer" }}>{totalFollowing} following</Typography>
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