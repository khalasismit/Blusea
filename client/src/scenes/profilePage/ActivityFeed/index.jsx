import { Box, CircularProgress, ImageList, ImageListItem, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import DialogPost from "../../../components/dialogPost";

const ActivityFeed = ({ Type,user }) => {
    const [data, setData] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    // const user = useSelector((state) => state.user);
    // const posts = useSelector((state) => state.posts)
    const isNonMobile = useMediaQuery("(min-width:768px)")
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const fetchData = async (user) => {
            try {
                let userPostsPromise, savedPostsPromise;
                // Fetch user's own posts
                userPostsPromise =await fetch(`http://localhost:3001/posts/${user._id}/posts`, {
                    method: "GET",
                    headers: {}
                }).then(res => res.json());

                // Fetch user's saved posts
                savedPostsPromise =await fetch(`http://localhost:3001/users/${user._id}/posts/saved`, {
                    method: "GET",
                    headers: {}
                }).then(res => res.json());

                // Wait for both promises to resolve
                const [userPostsData, savedPostsData] = await Promise.all([userPostsPromise, savedPostsPromise]);
                setUserPosts(userPostsData)
                setSavedPosts(savedPostsData)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData(user)
    }, [user]);
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
        {Array.isArray(data) ? (
            <Box width={isNonMobile ? "80%" : "100%"}>
                <ImageList variant='standard' cols={3} gap={3}>
                    {
                        data.map((item) => (
                            <ImageListItem key={item._doc._id}>
                                <img
                                    srcSet={`${item.url}`}
                                    src={`${item.url}`}
                                    alt={`${item._doc._id}`}
                                    onContextMenu={handleContextMenu}
                                    onDragStart={handleDragStart}
                                    style={{  width: "100%", height: "auto", aspectRatio: "1 / 1", objectFit: "cover", }}
                                    onClick={() => handleImageClick(item)}
                                />
                            </ImageListItem>
                        ))
                    }
                </ImageList>
            </Box>
        ) : (
            <Box sx={{ flex: 1, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        )
        }
        {selectedPost && (
            <DialogPost
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