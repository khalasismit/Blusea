import { Box, Dialog, Typography, useTheme } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDispatch, useSelector } from "react-redux";
// import { setPost } from "../../redux/reducers";
import { useEffect, useState } from "react";
import { setLogin, setPosts } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";
const DeletePost = ({ postId, socket, handleClose }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const dispatch = useDispatch()
    const handleRemove = async () => {
        const res = await fetch(`http://localhost:3001/posts/${postId}/remove`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data) {
            dispatch(
                setPosts({post:data.updatedPosts}),
                setLogin({
                    user: data.updatedUser,
                    token: token
                })
            );
        }
        handleClose();
    }
    useEffect(() => {
        socket.connect();
        return () => {
            socket.close();
        };
    }, [])
    const handleDialog = () => {
        setOpen(!open);
    }
    return (
        <Box onClick={handleDialog}>
            <Box sx={{cursor: "pointer",p:1,":hover":{background:theme.palette.background.default,borderRadius:"10%"}}}>
            <DeleteOutlineOutlinedIcon sx={{ fontSize: "1.5rem"}} />
            </Box>
            
            <Dialog maxWidth={"xs"}fullWidth open={open} onClose={handleDialog}>
                <Box sx={{ display: "flex", flexDirection: "column",}}>
                    <Box sx={{  p: 1,cursor: "pointer", ":hover": { background: theme.palette.primary.main} }} onClick={() => { handleRemove() }}>
                        <Typography textAlign={"center"}> Delete </Typography>
                    </Box>
                    <Box sx={{  p: 1,cursor: "pointer", ":hover": { background: theme.palette.primary.main} }} onClick={() => { setOpen(false) }}>
                        <Typography textAlign={"center"}> Close </Typography>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    )
}
export default DeletePost;