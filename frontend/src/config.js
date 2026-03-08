import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
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