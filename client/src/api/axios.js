import axios from "axios";

const api = axios.create({
  baseURL: "https://codex-server-eight.vercel.app/api",
});

api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("adminToken");

    // Fallback for existing login systems
    if (!token) {
      token = localStorage.getItem("token");
    }

    // Fallback if token is stored inside codex_user
    if (!token) {
      try {
        const user = JSON.parse(
          localStorage.getItem("codex_user")
        );

        token =
          user?.token ||
          user?.accessToken ||
          user?.jwt ||
          null;
      } catch {
        token = null;
      }
    }

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;