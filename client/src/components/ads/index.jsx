import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
// import AdSense from './adsense';

const Ads = () => {
    const { palette } = useTheme();
    return (
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center"}}>
            <Box sx={{ flex: 1, p: "0.5rem 1rem", borderRadius: 2, m: 1, display: "flex", flexDirection: "column", background: palette.background.default }} >
                <Typography sx={{
                    color: palette.neutral.main,
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                }}>
                    Sponsored
                </Typography>
                <Box sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
                    ADS_DATA_NOT_FOUND
                    {/* <AdSense></AdSense> */}
                </Box>
            </Box>
        </Box >
    )
};

export default Ads;