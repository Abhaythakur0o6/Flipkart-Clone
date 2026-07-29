import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../service/AxiosInstance"
import axios from "axios"

//Fetch User
export const fetchMe = createAsyncThunk(
    "user/fetchMe",
    async (_, { rejectWithValue }) => {
        try {
            // 1. Try fetching /me using stored token
            const { data } = await axiosInstance.get("/me")
            const currentToken = localStorage.getItem("flipkart_token")
            return {
                user: data.resUser,
                token: currentToken
            }
        } catch {
            // 2. Fallback to /refresh cookie
            try {
                const { data: tokenData } = await axiosInstance.post("/refresh")
                if (tokenData?.token) {
                    localStorage.setItem("flipkart_token", tokenData.token)
                    const { data } = await axiosInstance.get("/me")
                    return {
                        user: data.resUser,
                        token: tokenData.token
                    }
                }
            } catch (refreshErr) {
                localStorage.removeItem("flipkart_token")
                return rejectWithValue(refreshErr.response?.data?.message || "Session expired")
            }
            localStorage.removeItem("flipkart_token")
            return rejectWithValue("Session expired")
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

const savedToken = typeof window !== "undefined" ? localStorage.getItem("flipkart_token") : null;

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: savedToken || null,
        authenticated: !!savedToken,
        error: null,
        loading: false,
        message: null
    },
    reducers: {
        updateToken(state, action) {
            state.token = action.payload
            state.authenticated = true
            if (action.payload) {
                localStorage.setItem("flipkart_token", action.payload)
            }
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
                state.token = action.payload.token
                state.authenticated = true
                state.loading = false
            })
            .addCase(fetchMe.rejected, (state) => {
                state.user = null
                state.token = null
                state.authenticated = false
                state.loading = false
                localStorage.removeItem("flipkart_token")
            })

            //Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token
                if (action.payload.token) {
                    localStorage.setItem("flipkart_token", action.payload.token)
                }
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
                if (action.payload.token) {
                    localStorage.setItem("flipkart_token", action.payload.token)
                }
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
                localStorage.removeItem("flipkart_token")
            })
            .addCase(logOutUser.rejected, (state) => {
                state.loading = false;
                localStorage.removeItem("flipkart_token")
            })

            //Verify OTP
            .addCase(VerifyOtp.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token
                if (action.payload.token) {
                    localStorage.setItem("flipkart_token", action.payload.token)
                }
                state.loading = false;
                state.authenticated = true
            })
    }
})

export const { updateToken } = userSlice.actions
export default userSlice.reducer