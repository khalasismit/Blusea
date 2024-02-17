import { Box } from "@mui/material";

const ImageWidget = ({ src, alt }) => {
    return <Box sx={{ height: "650px",p: "0.5rem 0" }}>
        <img src={src} alt={alt} style={{ width: "100%", height: "100%",objectFit:"cover", borderRadius:"0.3rem" }} />
    </Box>
}
export default ImageWidget;