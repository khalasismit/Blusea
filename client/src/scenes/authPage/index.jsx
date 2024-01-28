import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

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
        <Typography fontWeight="bold" fontSize="32px" color={"dark"}>
          Magnet
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" align="center" sx={{ mb: "1.5rem" }}>
          Welcome to Magnet, Where People Konnect!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default AuthPage;