import { Box, CssBaseline, ThemeProvider, createTheme, useMediaQuery, useTheme } from '@mui/material';
import './App.css';
import AuthPage from './scenes/authPage';
import HomePage from './scenes/homePage';
import SearchPage from './scenes/searchPage'
import ExplorePage from './scenes/explorePage';
import ProfilePage from './scenes/profilePage';
import NotificationsPage from './scenes/notificationsPage';
import ChatPage from './scenes/chatPage';

import { useSelector } from "react-redux";
import { useMemo } from 'react';
import { themeSettings } from './styles/theme/theme';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from './components/nav';
import ChatArea from './components/chatArea';
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const bgTheme = useTheme();
  const bg = bgTheme.palette.background.alt

  return (
    <Box sx={{ background: { bg } }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={isAuth ? <Navigate to="/home" /> : <AuthPage />} />
          </Routes>
          <Box display={'flex'} flexDirection={isNonMobile ? "row" : "column-reverse"} gap={isNonMobile ? "2rem" : ""}>
            {isAuth && (
              <Navigation></Navigation>
            )}
            <Routes>
              {/* <Route exact path="/home" element={<HomePage />} /> */}
              <Route exact path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
              <Route path="/explore" element={isAuth ? <ExplorePage /> : <Navigate to="/" />} />
              <Route path="/profile/:userName" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
              <Route path="/search" element={isAuth ? <SearchPage /> : <Navigate to="/" />} />
              <Route path="/notifications" element={isAuth ? <NotificationsPage /> : <Navigate to="/" />} />
              <Route path="/chats" element={isAuth ? <ChatPage /> : <Navigate to="/" />} />
              <Route path="/chats/:conversationId/messages" element={isAuth ? <ChatArea /> : <Navigate to="/" />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </Box>
  );
}

export default App;
