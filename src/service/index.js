import { MGS_NOT_FOUND_ERROR, MGS_SYSTEM_ERROR } from "@/utils";
import axios from "axios";

const request = axios.create({
  baseURL: process.env.apiUrl, // Replace with your API base URL
});

// Request interceptor
request.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    const accessToken = JSON.parse(localStorage.getItem("token"));

    // If token is present add it to request's Authorization Header
    if (accessToken) {
      if (config.headers) config.headers.token = accessToken;
    }
    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);
// End of Request interceptor

// Response interceptor
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle response errors here
    if (error.response.status === 404) {
      return Promise.reject(error.response.data.message || MGS_NOT_FOUND_ERROR);
    }

    if (error.response.status === 403) {
      return Promise.reject(
        new Error("You are not authorized to perform this function")
      );
    }

    return Promise.reject(error.response.data.message || MGS_SYSTEM_ERROR);
  }
);
// End of Response interceptor

export default request;
