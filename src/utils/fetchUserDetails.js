import SummaryApi from "../common/SummaryApi";
import Axios from "./Axios";

const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.userDetail
        })
        return response.data.data
    } catch (error) {
        console.log(error);

    }
}

export default fetchUserDetails