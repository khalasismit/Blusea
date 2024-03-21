import { Avatar, Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { formatDistanceToNow } from 'date-fns';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { useEffect, useState } from "react";
import ImageWidget from "../../imgwidget";
import Like from "../../like";
// import io from "socket.io-client";
// import { useSelector } from "react-redux";
// import Follow from "../follow";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DialogPost from "../../dialogPost";
import SavePost from "../../savePost";
import Share from "../../share";
import CommentInput from "./commentInput";

const Post = ({ post, postId, profilePic, picturePath, pictureAlt, userName, likes, comments, caption, createdAt, socket }) => {

    const user = useSelector((state) => state.user);
    const LIKES = likes.length
    const COMMENTS = comments.length
    const navigate = useNavigate();
    const theme = useTheme();
    const { typography } = useTheme();
    const isNonMobile = useMediaQuery("(min-width:768px)")
    const [timeAgo, setTimeAgo] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpen = () => {
        // console.log(item)
        setOpenDialog(true); // Open the dialog
    };

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

    return <Box sx={{ flex: 1, background: theme.palette.background.default, width: isNonMobile ? "600px" : "100%", display: "flex", flexDirection: "column", p: "1rem", }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {
                    profilePic === "" ?
                        <Avatar sx={{ borderRadius: 2, height: "2.5rem", width: "2.5rem" }}></Avatar>
                        :
                        <Avatar src={profilePic} sx={{ borderRadius: 2, height: "2.5rem", width: "2.5rem" }}></Avatar>
                }
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ fontSize: typography.h5, fontFamily: typography.h5, cursor: "pointer" }} onClick={NavigateToProfile} >{userName}</Typography>
                    <Typography sx={{ fontSize: typography.h6, fontFamily: typography.h6 }}>{timeAgo} </Typography>
                </Box>
            </Box>
            <MoreHorizIcon sx={{ fontSize: "1.7rem" }} />
        </Box>
        <Box >
            <ImageWidget src={picturePath} alt={pictureAlt} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{
                display: "flex",
                gap: "1rem",
                '& > *:hover': {
                    color: theme.palette.neutral.main,
                },
            }}>
                <Like socket={socket} postId={postId} postUserName={userName} likes={likes} />
                <ModeCommentOutlinedIcon sx={{ fontSize: "1.7rem" }} onClick={handleOpen} />
                <Share post={post} picturePath={picturePath}></Share>
            </Box>
            <Box sx={{
                '& > *:hover': {
                    color: theme.palette.neutral.main,
                },
            }}>
                <SavePost saved={user.saved} postId={postId}></SavePost>
            </Box>
        </Box>
        {/* Fourth- no. of like,caption,no. of comments */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>{LIKES} likes </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
                <Typography sx={{ fontWeight: "bold" }}> {userName} </Typography>
                <Typography> {caption} </Typography>
            </Box>
            <Typography sx={{ cursor: "pointer" }} onClick={handleOpen}> view all {COMMENTS} comment </Typography>
        </Box>
        <CommentInput socket={socket} postId={postId} commentId={""} CM={""} ></CommentInput>
        {openDialog && (
            <DialogPost
                socket={socket}
                key={post._doc._id}
                item={post}
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
            />)
        }
    </Box>
}
export default Post;