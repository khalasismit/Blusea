import { Box, Button, TextField, useTheme } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../../../redux/reducers";

const CommentInput = ({ postId, commentId, CM }) => {
    const user = useSelector(s => s.user);
    const theme = useTheme();
    const dispatch = useDispatch();
    const [comment, setComment] = useState(CM);
    const handleComment = async () => {
        await fetch(`http://localhost:3001/posts/${postId}/comment/new`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user._id,
                comment: comment,
                commentId: commentId
            })
        }).then(async (res) => await res.json()).then(async (data) => {
            // console.log("Comment data: ", data);
            const updatedPost = data.updatedPost;
            const newComment = data.newComment;
            console.log("newComment: ", newComment);
            let message = "";
            let receiverId = "";
            try {
                if (newComment.type === "comment") {
                    receiverId = updatedPost.userId;
                    message = `commented on your post : ${newComment.comment}`;
                } else if (newComment.type === "reply") { 
                    receiverId = commentId;
                    message = `replied to your comment : ${newComment.comment}`;
                } else {
                    console.log("Error in comment.jsx")
                }
                const NotifRes = await fetch(`http://localhost:3001/notifications/new`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        postId: postId,
                        senderId: user._id,
                        receiverId: receiverId,
                        message: message
                    })
                });
                const newNotif = await NotifRes.json();
                console.log("newNotif: ", newNotif);
            } catch (error) {
                console.log("Error in comment.jsx", error)
            }
            setComment("");
            dispatch(setPost(updatedPost));
        }).catch(err => { console.log(err) });
    }
    useEffect(() => {
        setComment(CM);
        // console.log("Comment Input -> ReplyTo :",CM)
        // console.log("Comment Input -> parentId :",commentId)
    }, [CM])
    return <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField fullWidth size="small" variant="standard" label="Add a comment..." value={comment} onChange={(e) => { setComment(e.target.value) }} />
        {/* if textfield has some value then show the post button else hide it  */}
        <Button disabled={!comment || comment === "" ? true : false} sx={{ display: comment === "" ? "none" : "block", color: theme.palette.neutral.dark, }} onClick={handleComment}>Post</Button>
        {/* <Button size="large" disabled={!comment ? true : false} sx={{color:palette.neutral.dark,background:"none"}}>Post</Button> */}
    </Box>
}
export default CommentInput