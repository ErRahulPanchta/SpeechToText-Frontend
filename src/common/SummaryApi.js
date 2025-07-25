export const baseURL="http://localhost:8080"

const SummaryApi={
    register:{
        url:"/user/register",
        method:"post"
    },
    login:{
        url:"/user/login",
        method:"post"
    },
    refreshToken:{
        url:"/user/refresh-token",
        method:"post"
    },
    userDetail:{
        url:"/user/user-details",
        method:"get"
    },
    logout:{
        url:"/user/logout",
        method:"get"
    }
}

export default SummaryApi