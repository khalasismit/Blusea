import { Box, CircularProgress, Typography } from "@mui/material"
import Comment from "./comment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Comments = ({ postId, parentId, updateCommentField,socket }) => {
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const [comments, setComments] = useState([]);
    const [Loading, setLoading] = useState(true);

    const toggleRepliesVisibility = (commentId) => {
        setComments(prevComments => {
            return toggleRepliesInTree(prevComments, commentId);
        });
    };

    const toggleRepliesInTree = (comments, commentId) => {
        return comments.map(comment => {
            if (comment._id === commentId) {
                return { ...comment, showReplies: !comment.showReplies };
            } else if (comment.replies && comment.replies.length > 0) {
                return {
                    ...comment,
                    replies: toggleRepliesInTree(comment.replies, commentId)
                };
            }
            return comment;
        });
    };

    const getComments = async () => {
        const res = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        })
        const data = await res.json();
        setComments(data);
        setLoading(false)
        // console.log(comments.map((comment) => comment.replies));
    }
    useEffect(() => {
        getComments()
    }, [posts,postId])

    const renderCommentsTree = (comments) => {
        return comments.slice().reverse().map(comment => (
                <Box key={comment._id}>
                    <Comment
                        _id={comment._id}
                        postId={postId}
                        type={comment.type}
                        userName={comment.userId.userName}
                        comment={comment.comment}
                        likes={comment.likes}
                        profilePic={comment.userId.picturePath}
                        createdAt={comment.createdAt}
                        updateCommentField={updateCommentField}
                        parentId={parentId}
                        socket={socket}
                        replies={comment.replies.length}
                        handleViewReplies={() => toggleRepliesVisibility(comment._id)}
                    />
                    {comment.showReplies && comment.replies && comment.replies.length > 0 &&
                        renderCommentsTree(comment.replies)}
                </Box>
            ));
    };

    return (
        <Box sx={{ maxHeight: "50vh" }}>
            {
                !Loading ? (
                    comments.length === 0 ? (<Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", height: "50vh" }}>
                    <Typography>No comments yet...</Typography>
                </Box>) : renderCommentsTree(comments)
                ) : (
                    <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", height: "50vh" }}>
                        <CircularProgress />
                    </Box>
                )
            }
        </Box>
    );
}
export default Comments