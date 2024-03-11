import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    user: null,
    token: null,
    status: false,
    posts: [],
    notifs : [],
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
    }
})

export const { setMode, setLogin, setStatus, setLogout, setPosts, setPost,setNotifs } = authSlice.actions;
export default authSlice.reducer;