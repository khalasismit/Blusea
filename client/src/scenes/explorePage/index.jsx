import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useEffect, useState } from 'react';

const ExplorePage = () => {
  const [exploreData, setExploreData] = useState(null);
  const explore = async () => {
    let res = await fetch('http://localhost:3001/posts/explore', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    setExploreData(data);
  }
  useEffect(() => {
    explore()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <Box sx={{ flex: 1, p: "1rem" }}>
    {
      Array.isArray(exploreData) ? (
        <ImageList variant='masonry' cols={3} gap={4}>
          {
            exploreData.map((item) => (
              <ImageListItem key={item._doc._id} >
                <img
                  srcSet={`${item.url}`}
                  src={`${item.url}`}
                  alt={`${item._doc._id}`}
                  style={{ objectFit: "cover", borderRadius: "0.5rem" }}
                />
              </ImageListItem>
            ))
          }
        </ImageList>
      ) : (

        <Box sx={{ flex: 1, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )
    }
  </Box>
}
export default ExplorePage;