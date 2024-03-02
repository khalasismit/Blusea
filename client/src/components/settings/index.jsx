import { Box, Dialog, useMediaQuery } from "@mui/material"
import { useState } from "react"
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Logout from "../logout";

const Settings = () => {
    const isNonMobile = useMediaQuery("(min-width:768px)")
    const [open,setOpen]= useState(false);
    return  <Box>
        <SettingsOutlinedIcon sx={{ fontSize: "1.5rem", cursor: "pointer" }} onClick={()=>{setOpen(true)}} />
    <Dialog maxWidth="sm" open={open} onClose={()=>{setOpen(false)}}>
        <Logout>Logout</Logout>
    </Dialog>
    </Box>
}
export default Settings