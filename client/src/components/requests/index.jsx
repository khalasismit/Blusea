import { Box, CircularProgress, Typography, useTheme } from "@mui/material"
import Request from "../request"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
const Requests = () => {
    const user = useSelector(state => state.user)
    const { _id } = user
    const [Loading, setLoading] = useState(true);
    const [Users, setUsers] = useState([])
    const { palette } = useTheme();
    const handleRequest = async () => {
        let res = await fetch(`http://localhost:3001/users/${_id}/requests`, {
            method: "GET",
            headers: {}
        })
        const data = await res.json();
        setUsers(data);
        setLoading(false);
    }
    useEffect(() => {
        handleRequest();
    }, [user]);
    return <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }} >
            <Typography sx={{
                color: palette.neutral.main,
                fontSize: "1.2rem",
                fontWeight: "bold",
            }}>
                REQUESTS
            </Typography>
            <Box sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
                {
                    !Loading ? (
                        Users.map((User) => (
                            <Request
                                reqId={User._id}
                                key={User._id}
                                userName={User.userName}
                            />
                        ))
                    ) : (
                        <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <CircularProgress />
                        </Box>
                    )}
            </Box>
        </Box>
    </Box >
}
export default Requests;