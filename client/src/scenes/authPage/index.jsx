import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import Mode from "../../components/mode";

const AuthPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        // backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <img src={"https://firebasestorage.googleapis.com/v0/b/magnet784492.appspot.com/o/logo%2Fmagnet3.png?alt=media&token=750dc1ef-316a-4bf3-8a83-8024f0a90dea"} style={{ width: "5rem", height: "4rem", objectFit: "cover" }} alt="" />
        <Typography fontWeight="bold" fontSize="30px" color={theme.palette.neutral.dark} sx={{ lineHeight: "0px" }}>
          Magnet
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="1.5rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography sx={{ mb: "1.5rem",textAlign:"center",fontSize:"1rem" }}>
          Bringing People Closer : Magnet - Your Social Attraction!
        </Typography>
        <Form />
      </Box>
      <Box sx={{position:"absolute",top:0,right:0}}>
        <Mode></Mode>
      </Box>
    </Box>
  );
};

export default AuthPage;