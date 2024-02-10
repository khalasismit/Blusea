import { Box, CircularProgress } from "@mui/material";
import Post from "../post";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
const Feed = () => {
    const POSTS = useSelector((state) => state.posts)
    const [posts, setPosts] = useState(null);
    const handleFeed = async () => {
        const res = await fetch("http://localhost:3001/posts", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const Data = await res.json();
        setPosts(Data);
    };
    useEffect(() => {
        handleFeed();
    }, [POSTS]); // Empty dependency array means it runs once on mount

    return <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "flex", gap: 1, flexDirection: "column-reverse" }}>
            {
                Array.isArray(posts) ? (
                    posts.map((post) => (
                        <Post
                            key={post._doc._id}
                            postId={post._doc._id}
                            postUserId={post._doc.userId}
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