import axios from "axios";

const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const api = axios.create({
  baseURL: isLocal
    ? "http://localhost:5000/api"
    : "https://codex-server-eight.vercel.app/api",

  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    let token = null;

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

    if (!token) {
      token =
        localStorage.getItem("adminToken");
    }

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;