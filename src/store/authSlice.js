import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL,LOGIN_ENDPOINT } from "../utlis/apiUrls";

// const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
    user:'',
    token: '',
    loading: false,
    msg: '',
    error: '',
    isAuthenticated: false,
}

export const signUpUser = createAsyncThunk('signupuser',async(body)=>{
    let SIGNUP_ENDPOINT = 'api/v1/auth/register/';
    let SignUpUrl = BASE_URL + SIGNUP_ENDPOINT
    const res = await fetch(SignUpUrl,{
        method: "post",
        headers:{
            'Content-Type': "application/json",
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    })
    return await res.json();
})

export const signInUser = createAsyncThunk('signinuser',async(body)=>{
     let LoginURL = BASE_URL + LOGIN_ENDPOINT
    const res = await fetch(LoginURL,{
        method: "post",
        headers:{
            'Content-Type': "application/json",
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    })
    return await res.json();
})

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        addToken: (state, action)=>{
            state.token = localStorage.getItem('token')
        },
        addUser: (state, action)=>{
            // state.isAuthenticated = true;
            // const user = window.localStorage.getItem('user')
            // const user_data = JSON.parse(user)
            // state.user = user_data
        },
        logout: (state, action)=>{  
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            // localStorage.clear()
        },
    },
    extraReducers:{
         /* signin  */
        [signInUser.pending]: (state, action) => {
            state.loading = true;
            // state.isAuthenticated = true;
        },[signInUser.fulfilled]: (state,{payload:{msg,error,token,user}}) => {
            state.loading = false;
            // state.isAuthenticated = true;
            if (error) {
                state.error = error;
            } else {
                state.isAuthenticated = true;
                state.token = msg;
                state.token = token;
                state.user = user;

                // localStorage.setItem('msg',JSON.stringify(msg))
                // localStorage.setItem('token',JSON.stringify(token))
                // localStorage.setItem('user',JSON.stringify(user))
            }
            
        },[signInUser.rejected]: (state, action) =>{
            state.loading = true;
            // state.isAuthenticated = false;
        },
            /* signup  */
        [signUpUser.pending]: (state, action) => {
            state.loading = true;
        },[signUpUser.fulfilled]: (state,{payload:{msg,error,token,user}}) => {
            state.loading = false;
            if (error) {
                state.error = error
            } else{
                state.msg = msg;
                state.token = token;
                state.user = user;

                // localStorage.setItem('msg',JSON.stringify(msg))
                // localStorage.setItem('token',JSON.stringify(token))
                // localStorage.setItem('user',JSON.stringify(user))
            }
        },[signUpUser.rejected]: (state, action) =>{
            state.loading = true;
        },
    }
})

export const { addToken,addUser,logout } = authSlice.actions;
export const selectUser = (state) => state.user.isAuthenticated;
export default authSlice.reducer
