import axios from "axios";

const api = axios.create({
  baseURL: "https://codex-server-eight.vercel.app/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    let token = null;

    // Existing CodeX login stores token inside codex_user
    try {
      const user = JSON.parse(
        localStorage.getItem("codex_user")
      );

      token = user?.token || null;
    } catch (error) {
      console.error(
        "Failed to read codex_user:",
        error
      );
    }

    // Fallback for adminToken if it exists
    if (!token) {
      token = localStorage.getItem("adminToken");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;