import { Avatar, Box, Input, Switch, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import * as React from 'react';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import Dialog from '@mui/material/Dialog';
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
// import { setLogin } from "../../redux/reducers";
import { useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { setPosts } from "../../redux/reducers";
const Create = () => {
    const dispatch = useDispatch()
    const [isOpenAdditional, setIsOpenAdditional] = useState(false);
    const user = useSelector((state) => state.user);
    const initialValues = {
        file: null,
        caption: "",
        location: ""
    };

    const createPost = async (values, onSubmitProps) => {
        // console.log(values);
        var formData = new FormData();
        formData.append("file", values.file);
        formData.append("userId", user._id);
        formData.append("caption", values.caption);
        const uploadResponse = await fetch('http://localhost:3001/upload', {
            method: 'POST',
            headers: {},
            body: formData
        });

        const fileData = await uploadResponse.json();
        formData.append("fileId", fileData);
        const createPost = await fetch("http://localhost:3001/posts/create", {
            method: "POST",
            headers: {},
            body: formData,
        });
        const newPost = await createPost.json();
        dispatch(
            setPosts({ posts: newPost })
        )
        if(newPost){
            setOpen(false);
        }
    };
    const theme = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", color: theme.palette.neutral.dark }} onClick={handleClickOpen}>
            <AddBoxIcon titleAccess='Create' sx={{ fontSize: "2rem" }} />
            {isNonMobile && (
                <Typography>
                    Create
                </Typography>
            )}
        </Box>
        <Dialog maxWidth={isNonMobile ? "md" : "sm" } fullWidth open={open} onClose={handleClose}>
            <Formik initialValues={initialValues} onSubmit={createPost} >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm,
                }) => (
                    <form autoComplete="on" onSubmit={handleSubmit}>
                        <Box sx={{
                            flex: "1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            background: theme.palette.neutral.light,
                        }}>
                            <KeyboardBackspaceOutlinedIcon sx={{ fontSize: "1.7rem", m: 1, '&:hover': { cursor: "pointer" } }} onClick={handleClose} />
                            <Box>
                                <Typography sx={{ fontWeight: "Bold", fontSize: "1rem", p: 1 }}>
                                    Create new post
                                </Typography>
                            </Box>
                            <Box>
                                <Typography sx={{
                                    p: 1, fontSize: "1rem", color: theme.palette.primary.main, '&:hover': {
                                        cursor: "pointer"
                                    }
                                }} onClick={handleSubmit}>
                                    Share
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: isNonMobile ? "row" : "column", justifyContent: "center", gap: 2 }}>
                            <Box>
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles) =>
                                        setFieldValue("file", acceptedFiles[0])
                                    }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${theme.palette.primary.main}`}
                                            sx={{ background: theme.palette.primary.light, "&:hover": { cursor: "pointer" } }}
                                        >
                                            <Input {...getInputProps()} />
                                            {!values.file ? (
                                                <Box sx={{ flex: 1, width: isNonMobile ? "400px": "400px" , height: isNonMobile ? "400px": "320px" , display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <Typography>Add Picture Here</Typography>
                                                </Box>
                                            ) : (
                                                <Box sx={{ flex: 1, width: isNonMobile ? "400px": "320px" , height: isNonMobile ? "400px": "320px" , display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    {/* <Box sx={{ display: "flex", alignItems: "center" }} > */}
                                                    <img src={URL.createObjectURL(values.file)} alt="Selected Media" style={{ width: '100%', height: '100%', objectFit: "cover" }} />
                                                </Box >
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, flexDirection: "column", p: 1 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Avatar src={user.picturePath} sx={{ height: "2.5rem", width: "2.5rem",borderRadius:"10%" }}></Avatar>
                                    <Typography>
                                        {user.userName}
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 0 }}>
                                    <TextField name="caption" placeholder="Write a caption..." variant="standard" fullWidth multiline rows={6} value={values.caption} onChange={handleChange} onBlur={handleBlur} />
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 1 }}>
                                    <TextField name="location" placeholder="Add location" variant="standard" fullWidth multiline value={values.location} onChange={handleChange} onBlur={handleBlur} />
                                    <LocationOnOutlinedIcon />
                                </Box>
                                <Box sx={{ p: 1, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} onClick={() => setIsOpenAdditional(!isOpenAdditional)}>
                                    <Typography>
                                        Advanced settings
                                    </Typography>
                                    {
                                        isOpenAdditional ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />
                                    }
                                </Box>
                                {
                                    isOpenAdditional && (
                                        <Box sx={{ p: "0px 8px" }}>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <Typography>
                                                    Friends Only
                                                </Typography>
                                                <Switch />
                                            </Box>
                                            <Typography fontSize={"0.9rem"} sx={{color:theme.palette.neutral.mediumMain }}> "Friends Only" is a privacy feature that limits content visibility to a user's approved connections or friends. </Typography>
                                        </Box>
                                    )
                                }
                            </Box>
                        </Box>
                    </form>
                )}</Formik>
        </Dialog>
    </Box >
}

export default Create
