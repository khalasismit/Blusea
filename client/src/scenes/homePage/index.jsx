import { Box, useMediaQuery } from "@mui/material";
import Feed from "../../components/feed";
import Requests from "../../components/requests";
const HomePage = () => {
    const isNonMobile = useMediaQuery('(min-width:1000px)')
    return <Box sx={{ display: "flex", flex: 1, justifyContent: "space-around" }}>
        <Feed></Feed>
        {isNonMobile &&
            (
                <Requests></Requests>
            )
        }
    </Box>
};

export default HomePage;