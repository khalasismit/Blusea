import { Box, IconButton, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { setMode } from "../../redux/reducers"
const Mode = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    return <Box>
        <IconButton onClick={() => { dispatch(setMode()) }} sx={{p:"1rem"}} >
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