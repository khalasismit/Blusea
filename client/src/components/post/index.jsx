import { Avatar, Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { formatDistanceToNow } from 'date-fns';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
// import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { useEffect, useState } from "react";
import ImageWidget from "../imgwidget";
import Like from "../like";
// import { useSelector } from "react-redux";
// import Follow from "../follow";
import { useNavigate } from "react-router-dom";

const Post = ({ postId, profilePic, picturePath, pictureAlt, userName, likes, comments, caption, createdAt }) => {
    const LIKES = likes.length
    const COMMENTS = comments.length
    const navigate = useNavigate();
    const theme = useTheme();
    const { typography } = useTheme();
    const [comment, setComment] = useState("");
    const isNonMobile = useMediaQuery("(min-width:768px)")
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        const calculateTimeAgo = () => {
            if (createdAt) {
                const timeAgoString = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
                setTimeAgo(timeAgoString);
            }
        };
        calculateTimeAgo();
        const intervalId = setInterval(() => {
            calculateTimeAgo();
        }, 60000);
        return () => clearInterval(intervalId);
    }, [createdAt]);

    const NavigateToProfile = () => {
        navigate(`/profile/${userName}`);
    }

    return <Box sx={{ flex: 1, background: theme.palette.background.alt, m: "0.5rem 0", width: isNonMobile ? "600px" : "100%", display: "flex", flexDirection: "column", p: "1rem", borderRadius: 2, boxShadow: "1px 1px 5px rgba(0,0,0,0.1)" }}>
        {/*First - Avatar,userName, */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Box>
                    {
                        profilePic === "" ?
                            <Avatar sx={{ borderRadius: 2, height: "2.5rem", width: "2.5rem" }}></Avatar>
                            :
                            <Avatar src={profilePic} sx={{ borderRadius: 2, height: "2.5rem", width: "2.5rem" }}></Avatar>
                    }
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ fontSize: typography.h5, fontFamily: typography.h5, cursor: "pointer" }} onClick={NavigateToProfile} >{userName}</Typography>
                    <Typography sx={{ fontSize: typography.h6, fontFamily: typography.h6 }}>{timeAgo} </Typography>
                </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <MoreHorizIcon sx={{ fontSize: "1.7rem" }} />
            </Box>
        </Box>
        {/* Second-image */}
        <Box>
            <ImageWidget src={picturePath} alt={pictureAlt} />
        </Box>
        {/* Third-like,comment,share,save */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{
                display: "flex",
                gap: "1rem",
                '& > *:hover': {
                    color: theme.palette.neutral.main,
                },
            }}>
                <Box>
                    <Like postId={postId} likes={likes} />
                    {/* <FavoriteBorderOutlinedIcon sx={{ fontSize: "1.7rem" }} /> */}
                </Box>
                <Box>
                    <ModeCommentOutlinedIcon sx={{ fontSize: "1.7rem" }} onClick={() => { navigate(`/p/${postId}`) }} />
                </Box>
                <Box>
                    <SendOutlinedIcon sx={{ fontSize: "1.7rem" }} />
                </Box>
            </Box>
            <Box sx={{
                '& > *:hover': {
                    color: theme.palette.neutral.main,
                },
            }}>
                <Box>
                    <TurnedInNotIcon sx={{ fontSize: "1.7rem" }} />
                </Box>
            </Box>
        </Box>
        {/* Fourth- no. of like,caption,no. of comments */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box>
                <Typography>{LIKES} likes </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
                <Typography sx={{ fontWeight: "bold" }}> {userName} </Typography>
                <Typography> {caption} </Typography>
            </Box>
            <Box>
                <Typography> view all {COMMENTS} comment </Typography>
            </Box>
        </Box>
        {/* Fifth - add a comment textfield */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField fullWidth size="small" variant="standard" label="Add a comment..." value={comment} onChange={(e) => { setComment(e.target.value) }} />
            {/* if textfield has some value then show the post button else hide it  */}
            <Button disabled={!comment || comment === "" ? true : false} sx={{ display: comment === "" ? "none" : "block", color: theme.palette.neutral.dark, }}>Post</Button>
            {/* <Button size="large" disabled={!comment ? true : false} sx={{color:palette.neutral.dark,background:"none"}}>Post</Button> */}
        </Box>
    </Box>

}
export default Post;