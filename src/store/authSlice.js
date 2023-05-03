import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, LOGIN_ENDPOINT } from "../utlis/apiUrls";

// const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: '',
    token: '',
    loading: false,
    message: '',
    error: false,
    isAuthenticated: false,
}

export const signUpUser = createAsyncThunk('signupuser', async (body) => {
    let SIGNUP_ENDPOINT = 'api/v1/auth/register/';
    let SignUpUrl = BASE_URL + SIGNUP_ENDPOINT
    const res = await fetch(SignUpUrl, {
        method: "post",
        headers: {
            'Content-Type': "application/json",
            // Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    })
    return await res.json();
})

export const signInUser = createAsyncThunk('signinuser', async ({ username, password },thunkAPI) => {
    let LoginURL = BASE_URL + LOGIN_ENDPOINT
    const res = await fetch(LoginURL, {
        method: "post",
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            username,
            password,
        }),
    })
    const data = await res.json()
    console.log('user',data)
    return data

})

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addToken: (state, action) => {
            // state.token = localStorage.getItem('token')
        },
        addUser: (state, action) => {
            // state.isAuthenticated = true;
            // const user = window.localStorage.getItem('user')
            // const user_data = JSON.parse(user)
            // state.user = user_data
        },
        logout: (state, action) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            // localStorage.clear()
        },
    },
    extraReducers: {
        /* signin  */
        [signInUser.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        }, [signInUser.fulfilled]: (state, { payload: { message, token, user } }) => {
            state.loading = false;
            
            console.log(user)
            console.log('---------------------00-----------------')

            if (user) {
                state.isAuthenticated = true;
                state.message = message;
                state.token = token;
                state.user = user;
            }

        }, [signInUser.rejected]: (state, action) => {
            state.loading = true;
            state.error = true
            state.message = action.payload
            state.user = null;
            

        },
        /* signup  */
        [signUpUser.pending]: (state, action) => {
            state.loading = true;
        }, [signUpUser.fulfilled]: (state, { payload: { message, token, user } }) => {
            state.loading = false;
            if (user) {
                state.isAuthenticated = true;
                state.message = message;
                state.token = token;
                state.user = user;
            }
        }, [signUpUser.rejected]: (state, action) => {
            state.loading = true;
        },
    }
})

export const { addToken, addUser, logout } = authSlice.actions;
export const selectUser = (state) => state.user.isAuthenticated;
export default authSlice.reducer



export const getToken = () => {
    return localStorage.getItem('token') || '';
}