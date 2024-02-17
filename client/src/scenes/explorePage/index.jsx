import { CircularProgress, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useEffect, useState } from 'react';
import DialogPost from '../../components/dialogPost';
import { useSelector } from 'react-redux';
const ExplorePage = () => {
  const posts = useSelector((state) => state.posts)
  const isNonMobile = useMediaQuery("(min-width:768px)")
  const [exploreData, setExploreData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const explore = async () => {
    let res = await fetch('http://localhost:3001/posts/explore', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    setExploreData(data);
    // console.log(data);
  }

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
              exploreData.map((item) => (
                <ImageListItem key={item._doc._id}>
                  <img
                    srcSet={`${item.url}`}
                    src={`${item.url}`}
                    alt={`${item._doc._id}`}
                    style={{ objectFit: "cover", borderRadius: "0.5rem" }}
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
      )}
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
}
export default ExplorePage;