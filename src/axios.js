// src/axios.js
import axios from "axios";

// Create an axios instance with custom configuration
const axiosInstance = axios.create({
    baseURL: "https://dynamic-store.vercel.app", // Replace with your backend API URL
    timeout: 1000, // Optional timeout setting (in milliseconds)
    headers: {
        "Content-Type": "application/json", // Set default content type header
    },
});

export default axiosInstance; // Export the configured axios instance
