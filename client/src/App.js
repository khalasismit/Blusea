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
import { useEffect, useMemo } from 'react';
import { themeSettings } from './styles/theme/theme';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from './components/nav';
import ChatArea from './components/chatArea';
import TermsAndConditions from './scenes/tncPage/tnc';
import PrivacyPolicy from './scenes/tncPage/privacyPolicy';
import io from "socket.io-client";
import Requests from './components/requests';
function App() {
  const socket = io("http://localhost:3001");
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const bgTheme = useTheme();
  const user = useSelector((state) => state.user);
  const bg = bgTheme.palette.background.alt

  useEffect(() => {
    if (user) {
      socket.emit("authenticate", user._id);
    }
    return () => {
      socket.disconnect();
    }
  }, [user, socket])

  // const handleCallbackResponse = (response) => {
  //   console.log(response)
  // }

  // useEffect(()=>{
  //   /*global google*/
  //   google.account.id.intialize({
  //     client_id:"39621683080-fhj153siej8cpsp7k5lc408pcuqgt7eu.apps.googleusercontent.com",
  //     callback: handleCallbackResponse
  //   })
  //   google.accounts.id.renderButton(
  //     document.getElementById("google-signin"),
  //     {theme:"outline", size:"small", text:"continue_with"}
  //   )
  // },[])
  return (
    <Box sx={{ background: { bg } }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={isAuth ? <Navigate to="/home" /> : <AuthPage />} />
            <Route path="/tnc/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/tnc/privacy-policies" element={<PrivacyPolicy />} />
          </Routes>
          <Box display={'flex'} flexDirection={isNonMobile ? "row" : "column-reverse"} gap={isNonMobile ? "2rem" : ""}>
            {isAuth && (
              <Navigation socket={socket}></Navigation>
            )}
            <Routes>
              {/* <Route exact path="/home" element={<HomePage />} /> */}
              <Route exact path="/home" element={isAuth ? <HomePage socket={socket} /> : <Navigate to="/" />} />
              <Route path="/explore" element={isAuth ? <ExplorePage socket={socket}/> : <Navigate to="/" />} />
              <Route path="/profile/:userName" element={isAuth ? <ProfilePage socket={socket}/> : <Navigate to="/" />} />
              <Route path="/search" element={isAuth ? <SearchPage socket={socket}/> : <Navigate to="/" />} />
              <Route path="/notifications" element={isAuth ? <NotificationsPage socket={socket} /> : <Navigate to="/" />} />
              <Route path="/chats" element={isAuth ? <ChatPage socket={socket}/> : <Navigate to="/" />} />
              <Route path="/chats/:conversationId/messages" element={isAuth ? <ChatArea socket={socket}/> : <Navigate to="/" />} />
              <Route path="/requests/:id" element={isAuth ? <Requests/> : <Navigate to="/" />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </Box>
  );
}

export default App;
