import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/",
  timeout: 5000,
  headers: {
    Authorization: "JWT " + localStorage.getItem("access"),
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      (error.response.statusText === "Unauthorized" || 
      error.response.statusText === "No active account found with the given credentials") &&
      originalRequest.url !== "/token/refresh/"
    ) {
      const refresh_token = localStorage.getItem("refresh");

      try {
        const response = await axiosInstance.post("/token/refresh/", {
          refresh: refresh_token,
        });
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);

        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + response.data.access;
        originalRequest.headers["Authorization"] =
          "JWT " + response.data.access;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.log("error", err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
