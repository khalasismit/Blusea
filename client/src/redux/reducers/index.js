import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    status:false,
    posts: [],
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
        setStatus:(state,action)=>{
            state.status = action.payload.status === false ? true : false;
        },
        setLogout: (state) => {
            state.user = null
            state.token = null;
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        }
    }
})

export const { setMode, setLogin, setStatus,setLogout, setPosts } = authSlice.actions;
export default authSlice.reducer;