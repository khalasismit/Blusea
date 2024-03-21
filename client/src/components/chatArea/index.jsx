import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import TextArea from "./textArea";
import Messages from "../messages";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ChatHeader from "./chatHeader";
import { useSelector } from "react-redux";
const ChatArea = ({socket}) => {
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const [conversation, setConversation] = useState([])
    const { conversationId } = useParams();
    const [update,setUpdate] = useState("")
    const updateMessage = (value) =>{
        setUpdate(value)
    }
    const getConversation = async () => {
        const res = await fetch(`http://localhost:3001/chats/${conversationId}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        })
        const data = await res.json();
        setConversation(data);
    }
    useEffect(() => {
        socket.emit("authenticate",user._id);
        getConversation()
        return () =>{
            socket.close()
        }
    }, [conversationId,socket])
    const isNonMobile = useMediaQuery('(min-width:1000px)');
    const theme = useTheme();
    return <Box sx={{
        // width:isNonMobile?"80%":"100%",
        // height:isNonMobile?"100vh":"95vh",
        // display:"flex",flexDirection:"column",
        // background:theme.palette.background.default 
        
        // flex: 1,
        width:"100%",
        display: "flex",
        flexDirection: "column",
        background: theme.palette.background.default,
        height: isNonMobile ? "100vh" : "95vh",
    }}>
        <ChatHeader participants={conversation.participants}></ChatHeader>
        <Divider></Divider>
        <Messages socket={socket} conversationId={conversationId} updateMessage={update}></Messages>
        <TextArea socket={socket} participants={conversation.participants} updateMessage={updateMessage}></TextArea>
    </Box>
}

export default ChatArea;

/* for new message notification purpose */ 
// const data = [
//     {
//         "conversationId":"someid",
//         "newMessages":[
//             //array of new messages objects
//         ]
//     },
//     {
//         "conversationId":"someid",
//         "newMessages":[
//             //array of new messages objects
//         ]
//     },
//     {
//         "conversationId":"someid",
//         "newMessages":[
//             //array of new messages objects
//         ]
//     },
// ]