import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_URL;


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        // check if token exists
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log("Token found:", token);
        } else {
            console.log("No token in localStorage");
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;