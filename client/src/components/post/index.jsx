import { Avatar, Box, Button, Dialog, Divider, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { formatDistanceToNow } from 'date-fns';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { useEffect, useState } from "react";
import ImageWidget from "../imgwidget";
import Like from "../like";
// import { useSelector } from "react-redux";
// import Follow from "../follow";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Post = ({ postId, profilePic, picturePath, pictureAlt, userName, likes, comments, caption, createdAt }) => {
    const user = useSelector((state) => state.user);
    const LIKES = likes.length
    const COMMENTS = comments.length
    const navigate = useNavigate();
    const theme = useTheme();
    const { typography } = useTheme();
    const [comment, setComment] = useState("");
    const isNonMobile = useMediaQuery("(min-width:768px)")
    const [timeAgo, setTimeAgo] = useState('');

    // dialog Post 
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleComment = async () => {

        console.log(user._id, postId, comment)
        await fetch(`http://localhost:3001/posts/${postId}/comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user._id,
                comment: comment
            })
        }).then(async (res) => await res.json()).then(async (data) => {
            // console.log(data);
            setComment("");
        }).catch(err => { console.log(err) });
    }

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

    return <Box sx={{ flex: 1, background: theme.palette.background.alt, m: "0.5rem 0", width: isNonMobile ? "600px" : "100%", display: "flex", flexDirection: "column", p: "1rem", borderRadius: 2 }}>
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
        <ImageWidget src={picturePath} alt={pictureAlt} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{
                display: "flex",
                gap: "1rem",
                '& > *:hover': {
                    color: theme.palette.neutral.main,
                },
            }}>
                <Like postId={postId} likes={likes} />
                <ModeCommentOutlinedIcon sx={{ fontSize: "1.7rem" }} onClick={handleOpen} />
                <SendOutlinedIcon sx={{ fontSize: "1.7rem" }} />
            </Box>
            <Box sx={{
                '& > *:hover': {
                    color: theme.palette.neutral.main,
                },
            }}>
                <TurnedInNotIcon sx={{ fontSize: "1.7rem" }} />
            </Box>
        </Box>
        {/* Fourth- no. of like,caption,no. of comments */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>{LIKES} likes </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
                <Typography sx={{ fontWeight: "bold" }}> {userName} </Typography>
                <Typography> {caption} </Typography>
            </Box>
            <Typography> view all {COMMENTS} comment </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField fullWidth size="small" variant="standard" label="Add a comment..." value={comment} onChange={(e) => { setComment(e.target.value) }} />
            {/* if textfield has some value then show the post button else hide it  */}
            <Button disabled={!comment || comment === "" ? true : false} sx={{ display: comment === "" ? "none" : "block", color: theme.palette.neutral.dark, }} onClick={handleComment}>Post</Button>
            {/* <Button size="large" disabled={!comment ? true : false} sx={{color:palette.neutral.dark,background:"none"}}>Post</Button> */}
        </Box>
        <Dialog maxWidth={isNonMobile ? 'md' : "sm"} fullWidth open={open} onClose={handleClose} >
            <CloseOutlinedIcon onClick={handleClose} sx={{ fontSize: "2rem", position: "fixed", top: ".3rem", right: ".3rem" }} />
            <Box sx={{ flex: 1, display: "flex", flexDirection: isNonMobile ? "row" : "column", overflowY: "auto", scrollbarWidth: "none" }}>
                <Box sx={{ width: isNonMobile ? "600px" : "100%", p: "0 0.5rem" }}>
                    <ImageWidget src={picturePath} alt={pictureAlt} />
                    {/* <img src={picturePath} alt={pictureAlt} srcset={picturePath} style={{width: '100%', height: 'auto'}} /> */}
                </Box>
                {/* <Divider orientation="horizontal" variant="middle" flexItem /> */}
                <Divider orientation={isNonMobile ? "vertical" : "horizontal"} variant="middle" flexItem ></Divider>
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    {/* first Box */}
                    <Box>
                        <Box sx={{ display: "flex", gap: "0.5rem", p: "0.5rem 0.5rem" }}>
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
                        <Divider orientation="horizontal" variant="fullwidth" flexItem ></Divider>
                    </Box>
                    {/* second Box */}
                    <Box sx={{ p: 1 }}>
                        <Divider orientation="horizontal" variant="fullwidth" flexItem ></Divider>
                        <Box sx={{ display: "flex", justifyContent: "space-between", p: "0.4rem 0" }}>
                            <Box sx={{
                                display: "flex",
                                gap: "1rem",
                                '& > *:hover': {
                                    color: theme.palette.neutral.main,
                                },
                            }}>
                                <Box>
                                    <Like postId={postId} likes={likes} />
                                </Box>
                                <Box>
                                    <ModeCommentOutlinedIcon sx={{ fontSize: "1.7rem" }} onClick={handleOpen} />
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
                        <Box>
                            <Typography>{LIKES} likes </Typography>
                        </Box>

                        {/* add a comment textfield */}
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <TextField fullWidth size="small" variant="standard" label="Add a comment..." value={comment} onChange={(e) => { setComment(e.target.value) }} />
                            <Button disabled={!comment || comment === "" ? true : false} sx={{ display: comment === "" ? "none" : "block", color: theme.palette.neutral.dark, }} onClick={handleComment}>Post</Button>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Dialog>
    </Box>
}
export default Post;