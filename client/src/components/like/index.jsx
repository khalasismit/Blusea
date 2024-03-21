import { Box } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../redux/reducers";
import { useEffect, useState } from "react";
const Like = ({ postId, postUserName, likes, socket }) => {
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const [isLiked, setIsLiked] = useState(likes.includes(user._id))
    // const [likeType, setLikeType] = useState("LIKE_POST");
    const dispatch = useDispatch()
    const handleLike = async () => {
        setIsLiked(!isLiked);
        const res = await fetch(`http://localhost:3001/posts/${postId}/toggleLike/${user._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json",Authorization: `Bearer ${token}` },
        });
        const updatedPost = await res.json();
        try {
            if (user._id !== updatedPost.userId) {
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
                    headers: { "Content-Type": "application/json",Authorization: `Bearer ${token}` },
                    body: JSON.stringify({
                        postId: postId,
                        senderId: user._id,
                        receiverId: updatedPost.userId,
                        message: `liked your post`
                    })
                });
                const newNotif = await NotifRes.json();
                console.log("newNotif: ", newNotif);
                if (!isLiked) {
                    socket.on("authenticate", user.userId);
                    socket.emit("like", { newNotif: newNotif });
                }
            }
            dispatch(setPost({ post: updatedPost }));
        } catch (error) {
            console.log("Error in Like.jsx", error)
        }
    }
    useEffect(() => {
        socket.connect();
        return () => {
            socket.close();
        };
    }, [])
    // useEffect(()=>{
    //     if(liked){
    //         handleLike()
    //     }
    // },[liked])
    return (
        <Box onClick={handleLike}>
            {
                isLiked ?
                    <FavoriteIcon sx={{ fontSize: "1.7rem", color: "red" }} />
                    :
                    <FavoriteBorderIcon sx={{ fontSize: "1.7rem" }} />
            }
        </Box >
    )
}
export default Like;