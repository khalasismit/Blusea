import { CircularProgress, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useEffect, useState } from 'react';
import DialogPost from '../../components/dialogPost';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

const ExplorePage = ({socket}) => {
    const posts = useSelector((state) => state.posts)
    const token = useSelector((state) => state.token)
  const isNonMobile = useMediaQuery("(min-width:768px)")
  const [exploreData, setExploreData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const explore = async () => {
    let res = await fetch('http://localhost:3001/posts/explore', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    setExploreData(data);
  }

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    explore()
  }, [posts])

  const handleImageClick = (item) => {
    setSelectedPost(item);
    // console.log(item)
    setOpenDialog(true); // Open the dialog
  };

  return <Box sx={{ width: "100%", display: "flex", justifyContent: "center", p: "1rem" }}>
    {
      Array.isArray(exploreData) ? (
        <Box width={isNonMobile ? "80%" : "100%"}>
          <ImageList variant='masonry' cols={3} gap={3}>
            {
              exploreData.slice().reverse().map((item) => (
                <ImageListItem key={item._doc._id} >
                  <Box style={{ position: "relative" }}>
                    <img
                      srcSet={`${item.url}`}
                      src={`${item.url}`}
                      alt={`${item._doc._id}`}
                      onContextMenu={handleContextMenu}
                      onDragStart={handleDragStart}
                      style={{ width: "100%", height: "auto", aspectRatio: "1 / 1", objectFit: "cover", cursor: "pointer" }}
                    />
                    {/* <Box
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        opacity: 0,
                        transition: "opacity 0.3s",
                        cursor: "pointer"
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = 1}
                      onMouseLeave={(e) => e.target.style.opacity = 0}
                      onClick={() => handleImageClick(item)}
                    >
                      <span className="comment-count">{item._doc.comments.length}</span>
                      <span className="likes-count">{item._doc.likes.length}</span>
                    </Box> */}
                    <Box
                      className="overlay"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "#fff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        opacity: 0,
                        gap: "1.5rem",
                        transition: "opacity 0.3s ease",
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = 1}
                      onMouseLeave={(e) => e.target.style.opacity = 0}
                      onClick={() => handleImageClick(item)}
                    >
                      <Box className="likes-count" style={{ fontSize: "1rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: 5 }}><FavoriteIcon /> {item._doc.likes.length}</Box>
                      <Box className="comment-count" style={{ fontSize: "1rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: 5 }}><CommentIcon /> {item._doc.comments.length}</Box>
                    </Box>
                  </Box>
                </ImageListItem>
              ))
            }
          </ImageList>
        </Box>
      ) : (
        <Box sx={{ flex: 1, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
    {
      selectedPost && (
        <DialogPost
          socket={socket}
          key={selectedPost._doc._id}
          item={selectedPost}
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          onClose={() => setSelectedPost(null)}
        />
      )
    }
  </Box >
}
export default ExplorePage;