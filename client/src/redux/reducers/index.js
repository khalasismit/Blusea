import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    user: null,
    token: null,
    status: false,
    posts: [],
    notifs : [],
    conversations:[]
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setStatus: (state, action) => {
            state.status = action.payload.status === false ? true : false;
        },
        setLogout: (state) => {
            state.user = null
            state.token = null;
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setNotifs: (state, action) => {
            state.notifs = action.payload.notifs;
        },
        setPost: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post._id === action.payload.post._id) {
                    return { ...post, ...action.payload.post };
                }
                return post;
            });
        },
        // addNewMessages: (state, action) => {
        //     const { conversationId, newMessages } = action.payload;
        //     const conversationIndex = state.conversations.findIndex(conversation => conversation.conversationId === conversationId);
        //     if (conversationIndex !== -1) {
        //         state.conversations[conversationIndex].newMessages.push(newMessages);
        //     } else {
        //         state.conversations.push({ conversationId, newMessages });
        //     }
        // },
        addNewMessages: (state, action) => {
            const { conversationId, newMessages } = action.payload;
            const conversationIndex = state.conversations.findIndex(conversation => conversation.conversationId === conversationId);
            if (conversationIndex !== -1) {
                const conversation = state.conversations[conversationIndex];
                if (!Array.isArray(conversation.newMessages)) {
                    // Initialize newMessages as an empty array if it's not already an array
                    conversation.newMessages = [];
                }
                conversation.newMessages.push(...newMessages);
            } else {
                state.conversations.push({ conversationId, newMessages });
            }
        },
        
        clearNewMessages: (state, action) => {
            const conversationId = action.payload.conversationId;
            const conversationIndex = state.conversations.findIndex(conversation => conversation.conversationId === conversationId);
            if (conversationIndex !== -1) {
                state.conversations[conversationIndex].newMessages = [];
            }
        }
    }
})

export const { setMode, setLogin, setStatus, setLogout, setPosts, setPost,setNotifs,addNewMessages,clearNewMessages } = authSlice.actions;
export default authSlice.reducer;