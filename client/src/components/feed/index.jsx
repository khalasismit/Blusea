import { Box, CircularProgress } from "@mui/material";
import Post from "./post";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
// import io from "socket.io-client";
const Feed = ({socket}) => {
    // const socket = io("http://localhost:3001");
    // const theme = useTheme()
    // const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const Posts = useSelector((state) => state.posts)
    const [posts, setPosts] = useState(null);
    const fetchPosts = async () => {
        try {
            const res = await fetch("http://localhost:3001/posts", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });
            // const res = await fetch(`http://localhost:3001/posts/${user._id}`, {
            //     method: "GET",
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            // });
            if (!res.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await res.json();
            // console.log(data)
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setPosts([]);
        }
    };

    useEffect(() => {
        fetchPosts()
    }, [Posts]);

    return <Box sx={{ flex: 1,display: "flex", justifyContent: "center",flexDirection: "column-reverse" }}>
        {/* <Box sx={{m:1,height:"100%",background:theme.palette.background.alt,borderRadius:2}}> */}
            {
                Array.isArray(posts) ? (
                    posts.map((post) => (
                        <Post
                            post={post}
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
                            socket={socket}
                        />
                    ))
                ) : (
                    <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <CircularProgress />
                    </Box>
                )
            }
        {/* </Box> */}
    </Box>
}
export default Feed;