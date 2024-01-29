import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const ExplorePage = () => {
    const itemData = [
        {
          img: './assets/images/IMG_20231126_173834.jpg',
          title: 'bed',
        },
        {
          img: './assets/images/IMG_20231126_174200_1.jpg',
          title: 'Bed',
        },
        {
          img: './assets/images/IMG_20231126_174219.jpg',
          title: 'Bed',
        },
        {
          img: './assets/images/IMG_20231126_174247.jpg',
          title: 'Bed',
        },
        {
          img: './assets/images/IMG_20231126_174421.jpg',
          title: 'Bed',
        },
        {
          img: './assets/images/IMG_20231126_174907.jpg',
          title: 'Bed',
        },
        {
          img: './assets/images/IMG_20231126_173834.jpg',
          title: 'bed',
        },
        {
          img: './assets/images/IMG_20231126_174200_1.jpg',
          title: 'Bed',
        },
        {
          img: './assets/images/IMG_20231126_174219.jpg',
          title: 'Bed',
        },
        {
          img: './assets/images/IMG_20231126_174247.jpg',
          title: 'Bed',
        },
        {
          img: './assets/images/IMG_20231126_174421.jpg',
          title: 'Bed',
        },
        {
          img: './assets/images/IMG_20231126_174907.jpg',
          title: 'Bed',
        },
      ];
  return (
    <Box sx={{ width: "100%", height: "100vh",p:"1rem", overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={2}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
export default ExplorePage;