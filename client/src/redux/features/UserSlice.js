import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../service/AxiosInstance"
import axios from "axios"

//Fetch User
export const fetchMe = createAsyncThunk(
    "user/fetchMe",
    async () => {
        const { data } = await axiosInstance.get("/me")
        return {
            user: data.resUser
        }
    }
)

//Login User
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (cred) => {
        const { data } = await axiosInstance.post(`/login`, cred)
        return {
            user: data.resUser,
            token: data.token
        }
    }
)

//SignUp User
export const signUpUser = createAsyncThunk(
    "user/signUp",
    async (signupData) => {
        const { data } = await axiosInstance.post(`/signup`, signupData);
        return {
            user: data.resUser,
            token: data.token
        }
    }
)

//LogOut User
export const logOutUser = createAsyncThunk(
    "user/logOut",
    async () => {
        const { data } = await axiosInstance.post(`/logout`);
        return {
            message: data.message
        }
    }
)

//OTP Verify For Login
export const VerifyOtp = createAsyncThunk(
    "user/login/otp",
    async ({ email, otp }) => {
        const { data } = await axiosInstance.post(`/verify-otp`, { email, otp })
        return {
            user: data.resUser,
            token: data.token
        }
    }
)

// Slice ------------------------------->

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: null,
        authenticated: false,
        error: null,
        loading: false,
        message: null
    },
    reducers: {
        updateToken(state, action) {
            state.token = action.payload
            state.authenticated = true
        }
    },
    extraReducers: (builder) => {
        builder

            //Fetch User
            .addCase(fetchMe.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.authenticated = true
                state.loading = false
            })
            .addCase(fetchMe.rejected, (state) => {
                state.loading = false
            })

            //Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token
                state.loading = false;
                state.authenticated = true
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message
                state.loading = false;
            })

            //Signup
            .addCase(signUpUser.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token
                state.authenticated = true
                state.loading = false;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.error = action.error.message
                state.loading = false;
            })

            //logOut User
            .addCase(logOutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logOutUser.fulfilled, (state, action) => {
                state.user = null;
                state.authenticated = false;
                state.token = null;
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(logOutUser.rejected, (state) => {
                state.loading = false;
            })

            //Verify OTP
            .addCase(VerifyOtp.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token
                state.loading = false;
                state.authenticated = true
            })
    }
})

export const { updateToken } = userSlice.actions
export default userSlice.reducer