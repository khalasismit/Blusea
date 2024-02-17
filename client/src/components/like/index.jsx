import { Box } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../redux/reducers";
const Like = ({ postId,likes }) => {
    const user = useSelector((state) => state.user)
    const isLiked = likes.includes(user._id)
    const dispatch = useDispatch()
    
    const handleLike = async () => {
        const res = await fetch(`http://localhost:3001/posts/${postId}/toggleLike/${user._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
        });
        const updatedPost = await res.json();
        dispatch(setPost({ post: updatedPost }));
    }

    return (
        <Box onClick={handleLike} >
            {
                isLiked ?
                    <FavoriteIcon sx={{ fontSize: "1.7rem", color: "red" }
                    } /> :
                    <FavoriteBorderIcon sx={{ fontSize: "1.7rem" }} />
            }
        </Box >
    )
}
export default Like;