import { Avatar, Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";

// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
// import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { useState } from "react";
import ImageWidget from "../imgwidget";




const Post = ({picturePath,pictureAlt}) => {
    const { palette } = useTheme();
    const { typography } = useTheme();
    const [comment, setComment] = useState("");
    const isNonMobile = useMediaQuery("(min-width:768px)")
    return <Box sx={{ flex:1,background: palette.background.alt,m:"0.5rem 0",width:isNonMobile?"600px":"100%",display: "flex",flexDirection:"column",p: "1rem",borderRadius:2,boxShadow:"1px 1px 5px rgba(0,0,0,0.1)"}}>
        {/*First - Avatar,userName, */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Box>
                    <Avatar src="./assets/images/Snapchat-1048757234.jpg" sx={{ borderRadius: 2, height: "2.5rem", width: "2.5rem" }}></Avatar>
                </Box>
                <Box sx={{display:"flex",flexDirection:"column"}}>
                    <Typography sx={{fontSize:typography.h5,fontFamily:typography.h5}}>userName</Typography>
                    <Typography sx={{fontSize:typography.h6,fontFamily:typography.h6}}>time ago</Typography>
                </Box>
            </Box>
            <Box>
                <MoreHorizIcon sx={{ fontSize: "1.7rem" }} />
            </Box>
        </Box>
        {/* Second-image */}
        <Box>
            <ImageWidget src={picturePath} alt={pictureAlt} />
        </Box>
        {/* Third-like,comment,share,save */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{
                display: "flex",
                gap: "1rem",
                '& > *:hover': {
                    color: palette.neutral.main,
                },
            }}>
                <Box>
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: "1.7rem" }} />
                </Box>
                <Box>
                    <ModeCommentOutlinedIcon sx={{ fontSize: "1.7rem" }} />
                </Box>
                <Box>
                    <SendOutlinedIcon sx={{ fontSize: "1.7rem" }} />
                </Box>
            </Box>
            <Box sx={{
                '& > *:hover': {
                    color: palette.neutral.main,
                },
            }}>
                <Box>


                    <TurnedInNotIcon sx={{ fontSize: "1.7rem" }} />
                </Box>
            </Box>
        </Box>
        {/* Fourth- no. of like,caption,no. of comments */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box>
                <Typography> no. of likes </Typography>
            </Box>
            <Box>
                <Typography> userName - caption </Typography>
            </Box>
            <Box>
                <Typography> view all - comment </Typography>
            </Box>
        </Box>
        {/* Fifth - add a comment textfield */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField fullWidth size="small" variant="standard" label="Add a comment..." value={comment} onChange={(e) => { setComment(e.target.value) }} />
            {/* if textfield has some value then show the post button else hide it  */}
            <Button disabled={!comment || comment === "" ? true : false} sx={{ display: comment === "" ? "none" : "block", color: palette.neutral.dark, }}>Post</Button>
            {/* <Button size="large" disabled={!comment ? true : false} sx={{color:palette.neutral.dark,background:"none"}}>Post</Button> */}
        </Box>
    </Box>
}
export default Post;