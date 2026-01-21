import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true // send cookies
});

// Response interceptor for token refresh
api.interceptors.response.use(
  (response )=> response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post("/api/auth/refresh");
        api.defaults.headers.common["Authorization"] =
          "Bearer " + data.accessToken;
        originalRequest.headers["Authorization"] = "Bearer " + data.accessToken;
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
