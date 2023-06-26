import axios from "axios";

export const http = axios.create({
  baseURL: "https://staging-dot-wawapi.uc.r.appspot.com/",
  headers: {
    "Content-type": "application/json",
  },
});

// Setup middleware for axios to use the JWT token when available
http.interceptors.request.use(
  config => {
    const token = localStorage.getItem("user-token").trim();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete http.defaults.headers.common["Authorization"];
    }

    return config;
  },
  error => Promise.reject(error),
);
