import { Box, CircularProgress, ImageList, ImageListItem, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DialogPost from "../../../components/dialogPost";

const ActivityFeed = ({ socket, Type, user }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const User = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    // const Posts = useSelector((state) => state.posts)
    const isNonMobile = useMediaQuery("(min-width:768px)")
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const fetchData = async (user) => {
            try {
                setLoading(true);
                let userPostsPromise, savedPostsPromise;
                // Fetch user's own posts
                userPostsPromise = await fetch(`http://localhost:3001/posts/${user._id}/posts`, {
                    method: "GET",
                    headers: {Authorization: `Bearer ${token}`}
                }).then(res => res.json());

                // Fetch user's saved posts
                savedPostsPromise = await fetch(`http://localhost:3001/users/${user._id}/posts/saved`, {
                    method: "GET",
                    headers: {Authorization: `Bearer ${token}`}
                }).then(res => res.json());

                // Wait for both promises to resolve
                const [userPostsData, savedPostsData] = await Promise.all([userPostsPromise, savedPostsPromise]);
                setUserPosts(userPostsData)
                setSavedPosts(savedPostsData)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData(user)
    }, [user, User]);
    useEffect(() => {
        // Determine which data to set based on Type
        if (Type === "saved") {
            // console.log("Fetching saved posts");
            setData(savedPosts);
        } else if (Type === "tagged") {
            // console.log("Fetching tagged posts");

        } else {
            // console.log("Fetching user's own posts");
            // Default to user's own posts if Type is not "saved" or "tagged"
            setData(userPosts);
        }
    }, [Type, userPosts, savedPosts]);

    const handleImageClick = (item) => {
        setSelectedPost(item);
        // console.log(item)
        setOpenDialog(true); // Open the dialog
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    const handleDragStart = (e) => {
        e.preventDefault();
    };

    return <Box sx={{ width: "100%", display: "flex", justifyContent: "center", p: "1rem" }}>
        {!loading ? (
            data.length > 0 ? (
                <Box width={isNonMobile ? "80%" : "100%"}>
                    <ImageList variant='standard' cols={3} gap={3}>
                        {
                            data && data.slice().reverse().map((item) => (
                                <ImageListItem key={item._doc._id}>
                                    <img
                                        srcSet={`${item.url}`}
                                        src={`${item.url}`}
                                        alt={`${item._doc._id}`}
                                        onContextMenu={handleContextMenu}
                                        onDragStart={handleDragStart}
                                        style={{ width: "100%", height: "auto", aspectRatio: "1 / 1", objectFit: "cover", }}
                                        onClick={() => handleImageClick(item)}
                                    />
                                </ImageListItem>
                            ))
                        }
                    </ImageList>
                </Box>
            ) : (
                <Box sx={{ flex:1 ,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Typography sx={{fontSize:"1.2rem"}}> No {Type} data </Typography>
                </Box>
            )
        ) : (
            <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        )}

        {selectedPost && (
            <DialogPost
                DeleteIcon={Type === "posts" && User._id === user._id ? true : false}
                socket={socket}
                key={selectedPost._doc._id}
                item={selectedPost}
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                onClose={() => setSelectedPost(null)}
            />
        )}
    </Box>
};
export default ActivityFeed;