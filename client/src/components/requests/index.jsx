import { Box, Typography, useTheme } from "@mui/material"
import Request from "../request"
const Requests = () => {
    const { palette } = useTheme();
    return <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }} >
            <Box>
                <Typography sx={{
                    color: palette.neutral.main,
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                }}>
                    REQUESTS note max-3
                </Typography>
            </Box>
            <Box sx={{gap:1, display:"flex",flexDirection:"column"}}>
                <Request></Request>
                <Request></Request>
                <Request></Request>
            </Box>
        </Box>
    </Box>
}
export default Requests;