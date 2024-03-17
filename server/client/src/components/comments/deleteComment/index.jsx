import { useState } from "react";
import { Box, Dialog, Divider, Typography, useTheme } from "@mui/material";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useDispatch } from "react-redux";
import { setPost } from "../../../redux/reducers";
const DeleteComment = ({ commentId, postId }) => {
    const dispatch = useDispatch()
    const theme =useTheme();
    const [open, setOpen] = useState(false);
    const handleDelete = async () => {
        const res = await fetch(`http://localhost:3001/posts/${postId}/comment/delete`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                commentId
            })
        });
        const updatedPost = await res.json();
        dispatch(setPost(updatedPost));
        // console.log(updatedPost);
        setOpen(false);
    };
    return (
        <>
            <MoreHorizOutlinedIcon onClick={() => { setOpen(true) }} />
            <Dialog maxWidth="xs" fullWidth open={open} onClose={() => { setOpen(false) }}>
                <Box sx={{ display: "flex", flexDirection: "column"}}>
                        <Typography sx={{textAlign:"center",fontWeight:"bold",color:"red",p:2,cursor:"pointer",":hover": { background: theme.palette.neutral.medium } }} onClick={handleDelete}>Delete</Typography>
                        <Divider flexItem ></Divider>
                        <Typography sx={{textAlign:"center",fontWeight:"bold",p:2,cursor:"pointer",":hover": { background: theme.palette.neutral.medium } }} onClick={()=>{setOpen(false)}}>Close</Typography>
                </Box>
            </Dialog>
        </>
    );
};

export default DeleteComment;