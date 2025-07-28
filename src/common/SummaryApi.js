export const baseURL = import.meta.env.VITE_BACKEND_URL

const SummaryApi = {
    register: {
        url: "/user/register",
        method: "post"
    },
    login: {
        url: "/user/login",
        method: "post"
    },
    refreshToken: {
        url: "/user/refresh-token",
        method: "post"
    },
    userDetail: {
        url: "/user/user-details",
        method: "get"
    },
    logout: {
        url: "/user/logout",
        method: "get"
    },
    uploadAudio: {
        url: "/audio/upload",
        method: "post"
    },
    audioDetail: (id) => ({
        url: `/audio/audio-details/${id}`,
        method: "get"
    }),
    audioHistory: {
        url: "/audio/history",
        method: "get"
    },
    deleteAudioHistory: (id) => ({
        url: `/audio/${id}`,
        method: "delete"
    })
}

export default SummaryApi