import { Alert, Box, Button, Dialog, Snackbar, Typography, useTheme } from "@mui/material"
import * as React from 'react';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setLogout } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
const Logout = () => {
    const theme = useTheme()
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
        <Box onClick={handleClickOpen} titleAccess='Logout' sx={{textAlign:"center",p: 1, m: "0rem 1rem", cursor: "pointer" }}>
            <Typography>Logout</Typography>
        </Box>
        <Dialog maxWidth="sm" open={open} onClose={handleClose}>
            <Box sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box>
                    <LogoutOutlinedIcon onClick={handleClickOpen} titleAccess='Logout' sx={{ fontSize: "5rem" }} />
                </Box>
                <Box>
                    <Typography sx={{ fontSize: "1rem", textAlign: "center" }}>Oh no ! You're leaving...</Typography>
                    <Typography sx={{ fontSize: "1rem", textAlign: "center" }}>Are you sure</Typography>
                </Box>
                <Box
                    p={2}
                    display="flex"
                    flexDirection={"column"}
                    justifyContent="center"
                    alignItems="center"
                    gap={1}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleClose}
                        sx={{
                            color:theme.palette.neutral.light,
                            background:theme.palette.primary.dark,
                            maxWidth: "12rem",
                            borderRadius: "2rem",
                            border:`1px solid ${theme.palette.neutral.light}`
                        }}
                    >
                        <Typography>
                            Naah just Kidding
                        </Typography>
                    </Button>
                    <Button
                        fullWidth
                        variant="text"
                        onClick={handleLogout}
                        sx={{
                            color:theme.palette.neutral.dark,
                            maxWidth: "12rem",
                            borderRadius: "2rem",
                            border:`1px solid ${theme.palette.neutral.dark}`
                        }}
                    >
                        <Typography>
                            Yes, Log Me Out
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Dialog>
    </Box>
}
export default Logout;