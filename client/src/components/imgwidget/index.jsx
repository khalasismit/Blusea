import { Box } from "@mui/material";
import React from "react";
const ImageWidget = ({ src, alt }) => {
    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    const handleDragStart = (e) => {
        e.preventDefault();
    };
    return <Box sx={{ height: "100%", p: "0.5rem 0" }}>
        <img
            src={src}
            alt={alt}            
            onContextMenu={handleContextMenu}
            onDragStart={handleDragStart}
            style={{width: "100%", height: "100%",objectFit: "contain" }}
        />
    </Box>
}
export default ImageWidget;