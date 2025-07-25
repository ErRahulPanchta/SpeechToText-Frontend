import { MdUpload } from "react-icons/md";
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi";
import { useState, useRef } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import fetchAudioDetails from "../utils/fetchAudioDetails";
import { useDispatch } from "react-redux";
import { setAudioDetails } from "../store/audioSlice";

const Home = () => {
  const [audioSample, setAudioSample] = useState(null);
  const [transcript, settranscript] = useState("")
  const inpuRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioSample) {
      toast.error("Please Provide Audio File")
      return;
    }
    const formData = new FormData();
    formData.append("audioSample", audioSample);

    try {
      const response = await Axios({
        ...SummaryApi.uploadAudio,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (response?.data?.data?._id) {
        const newId = response.data.data._id;

        toast.success(response.data.message);

        const audioData = await fetchAudioDetails(newId);
        dispatch(setAudioDetails(audioData));
        setAudioSample(null);
        inpuRef.current.value = "";

      }

      console.log("response", response);

      const Transcript = response.data?.data?.audio?.transcript;
      Transcript ? toast.success("Transcript successfully")
        : toast.error("transcription not available")

      settranscript(Transcript);

    } catch (error) {
      AxiosToastError(error);
    }

  }
  return (
    <section className='flex-1 w-full flex justify-center items-center m-4'>
      <div className="bg-slate-400 w-[95%] h-full flex flex-col items-center justify-center gap-4">
        <div className="w-2 mr-auto">
          <select name="version" id="version">
            <option value="stt1">STT</option>
            <option value="stt1">STT-1.0.0</option>
            <option value="stt1">STT-1.0.1</option>
          </select>
        </div>
        <div className="bg-slate-500 w-full h-[60%] p-2">
          <div>
            <h1 className="text-xl font-bold text-slate-950"> The Transcript of the audio file:</h1>
          </div>
          <div><p className="text-md font-semibold text-slate-950">{transcript}</p></div>
        </div>
        <div className="bg-slate-600 w-full h-[20%] flex justify-between items-center p-2">
          <form className="flex items-center gap-10" onSubmit={handleSubmit}>
            <div>
              <input
                type="file"
                name="audio"
                id="audio"
                accept="audio/*"
                ref={inpuRef}
                className="border outline-none h-7 rounded"
                onChange={(e) => { setAudioSample(e.target.files[0]) }}
              />
            </div>
            <div>
              <button className="rounded-full border cursor-pointer hover:p-0.5">
                <MdUpload size={25} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Home
