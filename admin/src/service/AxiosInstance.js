const axios = require("axios")

const axiosInstance = axios.create({
    baseURL: "import.meta.env.VITE_API_URL",
    withCredentials: true
})