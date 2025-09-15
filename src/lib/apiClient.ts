import axios from "axios";

// Base URL comes from env, fallback to empty string to allow relative paths in dev
const baseURL = import.meta.env.VITE_API_URL || "";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// Request interceptor: attach bearer token if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  // ngrok header for dev tunnels if needed
  if (baseURL.includes("ngrok")) {
    config.headers = config.headers || {};
    // Some ngrok setups require this to bypass warnings
    (config.headers as Record<string, string>)["ngrok-skip-browser-warning"] =
      "69420";
  }
  return config;
});

// Response interceptor: unwrap data and normalize errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle 401 globally
    if (error?.response?.status === 401) {
      // Clear stale token
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
