import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

Axios.interceptors.request.use(
    async (config) => {
        const accesstoken = localStorage.getItem('accessToken');
        if (accesstoken) {
            config.headers.authorization = `Bearer ${accesstoken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        let originrequest = error.config;
        if (error.response && error.response.status === 401 && !originrequest.retry) {
            originrequest.retry = true;

            const refreshtoken = localStorage.getItem("refreshToken");

            if (refreshtoken) {
                const newAccessToken = await refreshAccessToken(refreshtoken);
                if (newAccessToken) {
                    originrequest.headers.authorization = `Bearer ${newAccessToken}`;
                    return Axios(originrequest);
                }
            }
        }
        return Promise.reject(error);
    }
);

const refreshAccessToken = async (refreshtoken) => {
    try {
        const response = await Axios({
            ...SummaryApi.refreshToken,
            headers: {
                Authorization: `Bearer ${refreshtoken}`
            }
        });
        const accessToken = response.data.data.accessToken;
        localStorage.setItem('accessToken', accessToken); 
        return accessToken;

    } catch (error) {
        console.log(error);
    }
};

export default Axios;
