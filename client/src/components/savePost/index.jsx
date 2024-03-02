import { Box } from "@mui/material"
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setPost } from "../../redux/reducers";
// import { useEffect } from "react";
const SavePost = ({ saved, postId }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    let isSaved = saved.includes(postId);
    const handleSave = async () => {
        const res = await fetch(`http://localhost:3001/posts/${postId}/toggleSave`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user._id,
                postId: postId
            })
        })
        const data = await res.json();
        console.log(data.updatedUser)
        dispatch(
            setLogin({
                user: data.updatedUser,
                token: token
            }),
            setPost(data.updatedPost)
        )
        // isSaved = saved.has(postId);
    }
    // useEffect(() => {
    //     isSaved = user.saved.includes(postId);
    //     console.log(isSaved)
    // }, [user])
    return <Box>
        {
            isSaved ?
                <TurnedInIcon sx={{ fontSize: "1.7rem", color: "red" }} onClick={handleSave} />
                :
                <TurnedInNotIcon sx={{ fontSize: "1.7rem" }} onClick={handleSave} />
        }
    </Box>
}
export default SavePost