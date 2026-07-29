import axios from "axios"
import { logOutUser, updateToken, } from "../redux/features/UserSlice"

let reduxStore;

export const injectStore = (store) => {
    reduxStore = store
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

// Attach access token
axiosInstance.interceptors.request.use((config) => {
    const token = reduxStore?.getState()?.user?.token || localStorage.getItem("flipkart_token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Refresh token automatically
axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config

        if (err.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes("/refresh")) {
            originalRequest._retry = true
            try {
                const res = await axiosInstance.post("/refresh")

                if (res.data?.token) {
                    localStorage.setItem("flipkart_token", res.data.token)
                    reduxStore.dispatch(updateToken(res.data.token))

                    originalRequest.headers.Authorization =
                        `Bearer ${res.data.token}`

                    return axiosInstance(originalRequest)
                }
            } catch {
                localStorage.removeItem("flipkart_token")
                reduxStore.dispatch(logOutUser())
            }
        }
        return Promise.reject(err)
    }
)

export default axiosInstance