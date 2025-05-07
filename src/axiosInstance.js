import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api", // Adjust base URL to match your backend
  
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include credentials in requests
});

export default axiosInstance;
