import { Alert, Box, Button, Dialog, Snackbar, Typography } from "@mui/material"
import * as React from 'react';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setLogout } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
const Logout = () => {
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState(false)
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleLogout = () => {
        setSnackbar(true)
        setTimeout(() => {
            setSnackbar(false)
            dispatch(setLogout())
            navigate("/")
        }, 1500);
    }

    return <Box>
        <Snackbar
            open={snackbar}
            varient="filled"
            autoHideDuration={1500}
            anchorOrigin={{ vertical: 'bottom', horizontal: "left" }}
        ><Alert variant="filled" severity="success">Logout Successfully</Alert></Snackbar>
        <Box onClick={handleClickOpen} titleAccess='Logout' sx={{ m: "0rem 1rem",cursor:"pointer" }}>
            <Typography>Logout</Typography>
        </Box>
        {/* <LogoutOutlinedIcon onClick={handleClickOpen} titleAccess='Logout' sx={{ m: "0rem 1rem" }} /> */}
        <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} sx={{ borderRadius: "1rem",p:1 }}>
            <Typography sx={{fontSize:"1.1rem",textAlign:"center",m:"0.5rem 0.5rem 0rem 0.5rem"}}>Are you sure? you want to logout.</Typography>
            <Box display="flex"
                justifyContent="center"
                alignItems="center"
                gap="1rem">
                <Button
                    variant="contained"
                    onClick={handleClose}
                    sx={{
                        borderRadius: "0.5rem",
                        m: "1rem 0rem",
                    }}
                    >
                    <Typography fontFamily="monospace">
                        Cancel
                    </Typography>
                </Button>
                <Button
                    variant="contained"
                    onClick={handleLogout}
                    sx={{
                        borderRadius: "0.5rem",
                        m: "0.5rem 0rem",
                    }}
                >
                    <Typography fontFamily="monospace">
                        Logout
                    </Typography>
                </Button>
            </Box>

        </Dialog>
    </Box>
}
export default Logout;