import { Box, CircularProgress } from "@mui/material";
import Post from "../post";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
const Feed = () => {
    const POSTS = useSelector((state) => state.posts)
    const [posts, setPosts] = useState(null);
    const fetchPosts = async () => {
        try {
            const res = await fetch("http://localhost:3001/posts", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!res.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setPosts([]); // Set empty array to prevent infinite loading
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [POSTS]); // Fetch posts when POSTS state changes

    return <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "flex", gap: 1, flexDirection: "column-reverse"}}>
            {
                Array.isArray(posts) ? (
                    posts.map((post) => (
                        <Post
                            key={post._doc._id}
                            postId={post._doc._id}
                            postUserId={post._doc.userId}
                            profilePic={post.picturePath}
                            userName={post.userName}
                            picturePath={post.url}
                            pictureAlt={"PostImage"}
                            caption={post._doc.caption}
                            createdAt={post._doc.createdAt}
                            likes={post._doc.likes}
                            comments={post._doc.comments}
                        />
                    ))
                ) : (
                    <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <CircularProgress />
                    </Box>
                )
            }
        </Box>
    </Box>
}
export default Feed;