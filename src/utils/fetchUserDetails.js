import SummaryApi from "../common/SummaryApi";
import Axios from "./Axios";

const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.userDetail
        });


        if (response?.data?.error) {
            console.error("Backend error:", response.data.message);
            return null;
        }

        return response?.data?.data;

    } catch (error) {
        console.error("fetchUserDetails error:", error?.response?.data?.message || error.message);
        return null;
    }
};

export default fetchUserDetails;
