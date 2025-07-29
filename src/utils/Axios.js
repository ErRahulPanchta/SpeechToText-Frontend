import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

const refreshAxios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

Axios.interceptors.request.use(
  async (config) => {
    const accesstoken = localStorage.getItem("accessToken");
    if (accesstoken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshtoken = localStorage.getItem("refreshToken");

      if (refreshtoken) {
        const newAccessToken = await refreshAccessToken(refreshtoken);
        if (newAccessToken) {
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios(originalRequest);
        }
      }
    }

    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshtoken) => {
  try {
    const response = await refreshAxios({
      ...SummaryApi.refreshToken,
      headers: {
        Authorization: `Bearer ${refreshtoken}`,
      },
    });

    const accessToken = response?.data?.data?.accessToken;
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
    return accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error?.response?.data || error.message);
    return null;
  }
};

export default Axios;
