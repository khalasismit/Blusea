import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { setMode } from "../../redux/reducers"
const Mode = () => {
    const isNonMobile = useMediaQuery('(min-width:600px)')
    const dispatch = useDispatch();
    const theme = useTheme();
    return <Box>
        <IconButton onClick={() => { dispatch(setMode()) }} sx={{p:isNonMobile?"1rem":"0.5rem"}} >
            {
                theme.palette.mode === "dark" ? (
                    <LightModeIcon />
                ) : (
                    <DarkModeIcon />
                )
            }
        </IconButton>
    </Box>
};

export default Mode;