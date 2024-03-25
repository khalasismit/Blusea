import { useState } from "react";
import { Box, Dialog, Divider, Typography, useTheme } from "@mui/material";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../../redux/reducers";
const DeleteComment = ({ commentId, postId }) => {
    const dispatch = useDispatch()
    const theme = useTheme();
    const token = useSelector((state) => state.token)
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.user);

    const handleDelete = async () => {
        // console.log(post)
        const postres =await fetch(`http://localhost:3001/posts/${postId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })
        const post = await postres.json();

        const commentRes = await fetch(`http://localhost:3001/posts/${postId}/comments/${commentId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });
        const data = await commentRes.json();
        console.log("getComment", data)

        const parentres = await fetch(`http://localhost:3001/users/userToReply/${commentId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const ParentCommentuser = await parentres.json();

        let message = "";
        let receiverId = "";
        if (data.type === "comment") {
            message = `commented on your post : ${data.comment}`;
            receiverId = post.userId
        } else if (data.type === "reply") {
            message = `replied to your comment : ${data.comment}`;
            receiverId = ParentCommentuser._id;
        }

        // console.log("message",message)
        // console.log("receiverId",receiverId)
        // console.log("postId",postId)
        // console.log("commentId",commentId)
        // console.log("senderId",user._id)
        await fetch(`http://localhost:3001/notifications/deleteComment`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                postId: postId,
                senderId: user._id,
                receiverId: receiverId,
                message: message
            })
        });
        // const newNotif = await NotifRes.json();
        const res = await fetch(`http://localhost:3001/posts/${postId}/comment/delete`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                commentId
            })
        });
        const updatedPost = await res.json();
        dispatch(setPost({ post: updatedPost }));
        // console.log(updatedPost);
        setOpen(false);
    };
    return (
        <>
            <MoreHorizOutlinedIcon onClick={() => { setOpen(true) }} />
            <Dialog maxWidth="xs" fullWidth open={open} onClose={() => { setOpen(false) }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ textAlign: "center", fontWeight: "bold", color: "red", p: 2, cursor: "pointer", ":hover": { background: theme.palette.neutral.medium } }} onClick={handleDelete}>Delete</Typography>
                    <Divider flexItem ></Divider>
                    <Typography sx={{ textAlign: "center", fontWeight: "bold", p: 2, cursor: "pointer", ":hover": { background: theme.palette.neutral.medium } }} onClick={() => { setOpen(false) }}>Close</Typography>
                </Box>
            </Dialog>
        </>
    );
};

export default DeleteComment;