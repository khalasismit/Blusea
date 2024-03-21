import { Box, CircularProgress, Typography, useTheme } from "@mui/material"
import Request from "./request"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
const Requests = () => {
    const user = useSelector(state => state.user)
    const token = useSelector(state => state.token)
    const { _id } = user
    const [Loading, setLoading] = useState(true);
    const [Users, setUsers] = useState([])
    const { palette } = useTheme();
    const handleRequest = async () => {
        let res = await fetch(`http://localhost:3001/users/${_id}/requests`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        })
        const data = await res.json();
        setUsers(data);
        setLoading(false);
    }
    useEffect(() => {
        handleRequest();
    }, [user]);
    return <Box sx={{ flex:1,display: "flex", justifyContent: "center" }}>
        <Box sx={{ flex: 1, p: "0.5rem 1rem", borderRadius: 2, m: 1, display: "flex", flexDirection: "column", background: palette.background.default }} >
            <Typography sx={{
                color: palette.neutral.main,
                fontSize: "1.2rem",
                fontWeight: "bold",
            }}>
                Requests
            </Typography>
            <Box sx={{height:"46vh",overflowY:"scroll",scrollbarWidth:"none",gap: 1, display: "flex", flexDirection: "column" }}>
                {
                    !Loading ? (
                        Users.length <= 0 ? (
                            <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>No requests yet.</Typography>
                        ) : (
                            Users.map((User) => (
                                <Request
                                    profilePic={User.picturePath}
                                    reqId={User._id}
                                    key={User._id}
                                    userName={User.userName}
                                />
                            ))
                        )
                    ) : (
                        <Box sx={{ height: "30vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <CircularProgress />
                        </Box>
                    )}
            </Box>
        </Box>
    </Box >
}
export default Requests;