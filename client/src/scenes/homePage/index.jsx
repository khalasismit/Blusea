import { Box, useMediaQuery } from "@mui/material";
import Feed from "../../components/feed";
import Requests from "../../components/requests";
import AdSense from "../../components/adsense";
const HomePage = () => {
    const isNonMobile = useMediaQuery('(min-width:1000px)')
    return <Box sx={{ display: "flex", flex: 1, justifyContent: "space-around" }}>
        <Feed></Feed>
        {isNonMobile &&
            (
                <Box sx={{flex:1,display:"flex",flexDirection:"column",justifyContent:"start"}}>
                    <Requests></Requests>
                    <AdSense></AdSense>
                </Box>
            )
        }
    </Box>
};

export default HomePage;