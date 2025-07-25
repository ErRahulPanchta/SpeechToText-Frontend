import SummaryApi from "../common/SummaryApi";
import Axios from "./Axios";

const fetchAudioDetails = async (_id) => {
    try {
        const response = await Axios({
            ...SummaryApi.audioDetail(_id)
        })
        
        return response.data.data
    } catch (error) {
        console.log(error);

    }
}

export default fetchAudioDetails