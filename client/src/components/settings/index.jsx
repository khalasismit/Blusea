import { Box, Dialog, Typography, useTheme } from "@mui/material"
import { useState } from "react"
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Logout from "../logout";

const Settings = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    return <Box sx={{ cursor: "pointer", borderRadius: "50%", p: "0.5rem 0.5rem 0.1rem 0.5rem", ":hover": { background: theme.palette.background.alt } }}>
        {/* <Box sx={{p: "0.5rem 1rem 0.1rem 1rem",background:theme.palette.background.alt,":hover":{background:theme.palette.background.default}}}> */}
        <SettingsOutlinedIcon sx={{ cursor: "pointer" }} onClick={() => { setOpen(true) }} />
        <Dialog maxWidth="xs" fullWidth open={open} onClose={() => { setOpen(false) }}>
            <Box sx={{display:"flex",flexDirection:"column",gap:1,p:1}}>
            <Box sx={{ border: `1px solid ${theme.palette.neutral.dark}`, borderRadius: "1rem",":hover":{background: theme.palette.primary.main} }}>
                <Logout></Logout>
            </Box>
            <Box sx={{ border: `1px solid ${theme.palette.neutral.dark}`,p:1, borderRadius: "1rem",cursor:"pointer",":hover":{background: theme.palette.primary.main} }} onClick={() => { setOpen(false) }}>
                <Typography textAlign={"center"}>Close</Typography>
            </Box>
            </Box>
        </Dialog>
    </Box>
}
export default Settings