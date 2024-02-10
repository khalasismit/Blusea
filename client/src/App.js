import { Box, CssBaseline, ThemeProvider, createTheme, useMediaQuery, useTheme } from '@mui/material';
import './App.css';
import AuthPage from './scenes/authPage';
import HomePage from './scenes/homePage';
import ExplorePage from './scenes/explorePage';
import { useSelector } from "react-redux";
import { useMemo, useState } from 'react';
import { themeSettings } from './styles/theme/theme';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from './components/nav';
import ProfilePage from './scenes/profilePage';
import DialogPost from './components/dialogPost';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const bgTheme = useTheme();
  const bg = bgTheme.palette.background.alt
  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => {
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box sx={{ background: { bg } }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={isAuth ? <Navigate to="/home" /> : <AuthPage />} />
            {/* <Route path="/" element={<AuthPage />} /> */}
          </Routes>
          <Box display={'flex'} flexDirection={isNonMobile ? "row" : "column-reverse"} gap={isNonMobile ? "2rem" : ""}>
            {isAuth && (
              <Navigation></Navigation>
            )}
            <Routes>
              <Route exact path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
              <Route path="/explore" element={isAuth ? <ExplorePage openDialog={openDialog} /> : <Navigate to="/" />} />
              <Route path="/profile/:userName" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
            </Routes>
            <DialogPost dialogOpen={dialogOpen} closeDialog={closeDialog} />
            {/* <Routes> */}
              {/* <Route path="/p/:id" element={isAuth ? <DialogPost dialogOpen={dialogOpen} closeDialog={closeDialog} /> : <Navigate to="/" />} /> */}
            {/* </Routes> */}
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </Box>
  );
}

export default App;
