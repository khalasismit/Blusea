import { Box } from "@mui/material";
import Post from "../post";
const Feed = () => {
    // const isNonMobile = useMediaQuery("(min-width:600px)");
    return <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "flex", gap: 1, flexDirection: "column-reverse" }}>
            <Post picturePath={"./assets/images/Snapchat-2059617544.jpg"} pictureAlt={""} ></Post>
            <Post picturePath={"./assets/images/Snapchat-748000666.jpg"} pictureAlt={""} ></Post>
            <Post picturePath={"./assets/images/Snapchat-2142773828.jpg"} pictureAlt={""} ></Post>
            <Post picturePath={"./assets/images/Snapchat-1048757234.jpg"} pictureAlt={""} ></Post>
            <Post picturePath={"./assets/images/Snapchat-2059617544.jpg"} pictureAlt={""} ></Post>
            <Post picturePath={"./assets/images/Snapchat-748000666.jpg"} pictureAlt={""} ></Post>
            <Post picturePath={"./assets/images/Snapchat-2142773828.jpg"} pictureAlt={""} ></Post>
            <Post picturePath={"./assets/images/IMG_20231126_173834.jpg"} pictureAlt={""} ></Post>
            <Post picturePath={"./assets/images/Snapchat-2059617544.jpg"} pictureAlt={""} ></Post>
            <Post picturePath={"./assets/images/Snapchat-748000666.jpg"} pictureAlt={""} ></Post>
            <Post picturePath={"./assets/images/Snapchat-2142773828.jpg"} pictureAlt={""} ></Post>
            <Post picturePath={"./assets/images/Snapchat-1048757234.jpg"} pictureAlt={""} ></Post>
            <Post picturePath={"./assets/images/Snapchat-2059617544.jpg"} pictureAlt={""} ></Post>
            <Post picturePath={"./assets/images/Snapchat-748000666.jpg"} pictureAlt={""} ></Post>
            <Post picturePath={"./assets/images/Snapchat-2142773828.jpg"} pictureAlt={""} ></Post>
            <Post picturePath={"./assets/images/Snapchat-1048757234.jpg"} pictureAlt={""} ></Post>
        </Box>
    </Box>
}
export default Feed;