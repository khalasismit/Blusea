import { Avatar, Box, Typography } from "@mui/material"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../../redux/reducers";
import DeleteComment from "../deleteComment";

const Comment = ({ _id, postId, type, userName, comment, likes, profilePic, createdAt, updateCommentField, parentId, handleViewReplies, replies,socket }) => {
    // console.log(_id, postId, type, userName, comment, likes, profilePic, createdAt )
    const [timeAgo, setTimeAgo] = useState('');
    useEffect(() => {
        const calculateTimeAgo = () => {
            if (createdAt) {
                const timeAgoString = formatDistanceToNow(new Date(createdAt), { addSuffix: true, roundingMethod: 'floor' });
                setTimeAgo(timeAgoString);
            }
        };
        calculateTimeAgo();
        const intervalId = setInterval(() => {
            calculateTimeAgo();
        }, 60000);
        return () => clearInterval(intervalId);
    }, [createdAt]);
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const [isLiked, setIsLiked] = useState(likes.includes(user._id))
    // const isLiked = likes.includes(user._id) ? true : false
    const dispatch = useDispatch()
    const handleCommentLike = async () => {
        setIsLiked(!isLiked)
        const res = await fetch(`http://localhost:3001/posts/${postId}/comment/toggleCommentLike`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                userId: user._id,
                commentId: _id
            })
        });
        const updatedPost = await res.json();
        const CommentIdRes = await fetch(`http://localhost:3001/users/userToReply/${_id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',Authorization: `Bearer ${token}`
            }
        });
        const Commentuser = await CommentIdRes.json();
        // dispatch(setPost(updatedPost));
        try {
            if (user._id !== Commentuser._id) {
                let url = ""
                if (!isLiked) {
                    url = `http://localhost:3001/notifications/new`
                } else if (isLiked) {
                    url = `http://localhost:3001/notifications/deleteLike`
                } else {
                    console.log("Error in Like.jsx")
                }
                const NotifRes = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` },
                    body: JSON.stringify({
                        postId: postId,
                        senderId: user._id,
                        receiverId: Commentuser._id,
                        message: `liked your comment : ${comment}`
                    })
                });
                const newNotif = await NotifRes.json();
                console.log("newNotif: ", newNotif);
                if (!isLiked) {
                    socket.on("authenticate", user.userId);
                    socket.emit("like", { newNotif: newNotif });
                }
            }
        } catch (error) {
            console.log("Error in Like.jsx", error)
        }
        dispatch(setPost({post:updatedPost}));
    }
    const iscomment = type === 'comment' ? true : false;
    return <Box sx={{ p: iscomment ? "0.5rem" : "0.5rem 0.5rem 0.5rem 3rem" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
                {
                    profilePic === "" ?
                        <Avatar sx={{ borderRadius: 2, height: "2rem", width: "2rem" }}></Avatar>
                        :
                        <Avatar src={profilePic} sx={{ borderRadius: 2, height: "2rem", width: "2rem" }}></Avatar>
                }
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", gap: 1, }}>
                        <Typography>
                            <span style={{ fontWeight: "bold", marginRight: "1rem" }}>
                                {userName}
                            </span>
                            <span>
                                {comment}
                            </span>
                        </Typography>
                    </Box>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                        <span>
                            {timeAgo}
                        </span>
                        <span style={{ margin: "0 1rem", cursor: "pointer" }} onClick={() => { updateCommentField(`@${userName} `); parentId(_id); }}>
                            Reply
                        </span>
                        {userName === user.userName
                            &&
                            <DeleteComment commentId={_id} postId={postId}></DeleteComment>
                        }
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} onClick={handleCommentLike} >
                {
                    isLiked ?
                        (
                            <FavoriteIcon sx={{ fontSize: "1.2rem", color: "red" }} />
                        )
                        :
                        (
                            <FavoriteBorderIcon sx={{ fontSize: "1.2rem" }} />
                        )
                }
                <span style={{ cursor: "pointer" }}>
                    {likes.length}
                </span>
            </Box >
        </Box>
        {
            <Box sx={{ ml: "2.5rem", cursor: "pointer" }} onClick={() => { handleViewReplies(_id) }}>
                <Typography>
                    see more ({replies})
                </Typography>
            </Box>
        }
    </Box>
}
export default Comment