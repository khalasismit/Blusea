import { Box, CircularProgress, Dialog, Input, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Avatar, TextField } from "@mui/material";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import Dropzone from "react-dropzone";
import { setLogin } from "../../redux/reducers";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from "react-router-dom";
const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const theme = useTheme();
    const [profilePic, setProfilePic] = useState(user.picturePath)

    const handleClose = () => {
        setOpen(false);
    }
    const initialValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        bio: user.bio,
        email: user.email,
        file: user.picturePath,
    };

    const handleEditProfile = async (values, onSubmitProps) => {
        setLoading(true);
        console.log("OldProfile: ", profilePic)
        var formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("userName", values.userName);
        formData.append("bio", values.bio);
        formData.append("file", values.file);

        if (initialValues.file !== values.file) {
            const uploadRes = await fetch('http://localhost:3001/upload', {
                method: 'POST',
                headers: {Authorization: `Bearer ${token}`},
                body: formData
            });
            const fileData = await uploadRes.json();
            const downloadUrlRes = await fetch(`http://localhost:3001/download`, {
                method: "POST",
                headers: { "Content-Type": "application/json",Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    fileId: fileData
                })
            })
            const url = await downloadUrlRes.json()
            setProfilePic(url)
            console.log("NewProfile:", url)
            formData.set("file", await url)
        }
        console.log("file:", formData.get("file"))
        const editUserRes = await fetch(`http://localhost:3001/users/edit/${user._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                firstName: formData.get("firstName"),
                lastName: formData.get("lastName"),
                userName: formData.get("userName"),
                bio: formData.get("bio"),
                picturePath: formData.get("file"),
            })
        })
        const updatedProfile = await editUserRes.json();
        console.log("updatedProfile: ", updatedProfile)
        setLoading(false)
        if (user.userName !== updatedProfile.userName) {
            navigate(`/profile/${updatedProfile.userName}`)
        }
        dispatch(setLogin({
            user: updatedProfile,
            token: token
        }))
        // window.location.href = `http://localhost:3000/profile/${updatedProfile.userName}`
        handleClose()
    }
    return (
        <Box>
            {/* <Button variant="text" sx={{ color: theme.palette.neutral.dark, background: theme.palette.background.alt, p: 1, textTransform: "none", borderRadius: 2 }} onClick={() => { setOpen(true) }}>
                <Typography sx={{ fontSize: "0.9rem", cursor: "pointer", }}>
                    Edit profile
                </Typography>
            </Button> */}
            <Box sx={{ cursor: "pointer",borderRadius: "50%", p: "0.5rem 0.5rem 0.1rem 0.5rem", ":hover": { background: theme.palette.background.alt } }}>
                <EditOutlinedIcon onClick={() => { setOpen(true) }} />
            </Box>
            <Dialog maxWidth="md" fullWidth open={open} onClose={handleClose}>
                <Formik initialValues={initialValues} onSubmit={handleEditProfile} >
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
                                        Edit profile
                                    </Typography>
                                </Box>
                                <Box>
                                    {
                                        loading ? (
                                            <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                                                <CircularProgress size={25} />
                                            </Box>
                                        ) : (
                                            <Typography sx={{
                                                p: 1, fontSize: "1rem", color: theme.palette.primary.main, '&:hover': {
                                                    cursor: "pointer"
                                                }
                                            }} onClick={handleSubmit}>
                                                Update
                                            </Typography>
                                        )
                                    }
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: isNonMobile ? "row" : "column", justifyContent: "center", gap: 2 }}>
                                <Box sx={{ display: "flex", flex: 1, flexDirection: "column", p: 1 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <Avatar src={user.picturePath} sx={{ height: "2.5rem", width: "2.5rem", borderRadius: "10%" }}></Avatar>
                                        <Typography>
                                            {user.userName}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", flex: 1, m: 1, gap: 1, flexDirection: isNonMobile ? "row" : "column" }}>
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
                                                        borderRadius={"5%"}
                                                        border={`2px dashed ${theme.palette.primary.main}`}
                                                        sx={{ background: theme.palette.primary.light, "&:hover": { cursor: "pointer" } }}
                                                    >
                                                        <Input {...getInputProps()} />
                                                        {!values.file ? (
                                                            <Box sx={{ flex: 1, width: isNonMobile ? "400px" : "400px", height: isNonMobile ? "400px" : "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                <Typography>Add Profile Picture Here</Typography>
                                                            </Box>
                                                        ) : (
                                                            <Box sx={{ flex: 1, width: isNonMobile ? "400px" : "400px", height: isNonMobile ? "400px" : "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                {/* <Box sx={{ display: "flex", alignItems: "center" }} > */}
                                                                {
                                                                    initialValues.file === values.file ? (
                                                                        <>
                                                                            <img src={values.file} alt="Selected Media" style={{ width: '100%', height: '100%', objectFit: "contain" }} />
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <img src={URL.createObjectURL(values.file)} alt="Selected Media" style={{ width: '100%', height: '100%', objectFit: "contain" }} />
                                                                        </>
                                                                    )
                                                                }
                                                            </Box >
                                                        )}
                                                    </Box>
                                                )}
                                            </Dropzone>
                                        </Box>
                                        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label="First Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.firstName}
                                                name="firstName"
                                                error={
                                                    Boolean(touched.firstName) && Boolean(errors.firstName)
                                                }
                                                helperText={touched.firstName && errors.firstName}
                                            />
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label="Last Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.lastName}
                                                name="lastName"
                                                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                                helperText={touched.lastName && errors.lastName}

                                            />
                                            <TextField
                                                size="small"
                                                fullWidth
                                                label="User Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.userName}
                                                name="userName"
                                                error={Boolean(touched.userName) && Boolean(errors.userName)}
                                                helperText={touched.userName && errors.userName}

                                            />
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label="Bio"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.bio}
                                                name="bio"
                                                rows={3}
                                                multiline
                                                error={
                                                    Boolean(touched.bio) && Boolean(errors.bio)
                                                }
                                                helperText={touched.bio && errors.bio}

                                            />
                                            <TextField
                                                disabled
                                                size="small"
                                                label="Email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.email}
                                                name="email"
                                                error={Boolean(touched.email) && Boolean(errors.email)}
                                                helperText={touched.email && errors.email}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </form>
                    )}</Formik>
            </Dialog>
        </Box>
    )
}
export default EditProfile