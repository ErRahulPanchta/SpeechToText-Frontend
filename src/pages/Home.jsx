import { MdUpload } from "react-icons/md";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useState, useRef } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import fetchAudioDetails from "../utils/fetchAudioDetails";
import { useDispatch } from "react-redux";
import { setAudioDetails, setHistoryUpdate } from "../store/audioSlice";

const Home = () => {
  const [audioSample, setAudioSample] = useState(null);
  const [transcript, settranscript] = useState("");
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const inpuRef = useRef();
  const dispatch = useDispatch();

  const isBlob = audioSample instanceof Blob;
  const isFile = audioSample instanceof File;

  // ✅ Start Recording
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioSample(blob);
        toast.success("Recording complete. Ready to upload.");
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
      toast("Recording started");
    } catch (err) {
      toast.error("Failed to start recording");
      console.error(err);
    }
  };

  // ✅ Stop Recording
  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioSample) {
      toast.error("Please Provide Audio File");
      return;
    }

    const formData = new FormData();
    formData.append("audioSample", audioSample, "recorded_audio.webm");

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
        dispatch(setHistoryUpdate());


        setAudioSample(null);
        setRecording(false);
        if (inpuRef.current) inpuRef.current.value = "";
      }

      const Transcript = response.data?.data?.audio?.transcript;
      Transcript
        ? toast.success("Transcript successfully")
        : toast.error("Transcription not available");

      settranscript(Transcript);
    } catch (error) {
      AxiosToastError(error);
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioSample(file);
      setRecording(false);
    }
  };

  return (
    <section className='flex-1 w-full flex justify-center items-center px-4 py-6 bg-slate-900'>
      <div className="bg-slate-800 w-full max-w-5xl rounded-xl shadow-md p-6 flex flex-col gap-6">

        <div className="w-full flex justify-end">
          <select
            className="bg-slate-700 text-white text-sm rounded px-2 py-1 outline-none border border-slate-600"
            name="version"
            id="version"
          >
            <option value="stt1">STT-1.0.0</option>
          </select>
        </div>

        <div className="bg-slate-700 p-4 rounded-lg">
          <h1 className="text-xl font-bold text-white mb-2">Transcript:</h1>
          <p className="text-sm text-slate-300 flex flex-wrap">{transcript}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex justify-center items-center">
          <div className="container lg:flex flex-col justify-center items-center">
            <div className="lg:flex lg:justify-around border border-slate-400 bg-slate-900 py-2 rounded w-full justify-center items-center">
              <div className=" flex justify-center items-center m-2">
                <input
                  type="file"
                  name="audio"
                  id="audio"
                  accept="audio/*"
                  ref={inpuRef}
                  disabled={recording || isBlob}
                  className={`text-sm px-2 py-1 rounded border w-full ${(recording || isBlob)
                    ? "bg-slate-500 text-slate-300 cursor-not-allowed"
                    : "bg-slate-600 text-white"
                    }`}
                  onChange={handleFileChange}
                />
              </div>
              
              <div className="flex justify-center items-center mt-2">
                {!recording ? (
                  <button
                    type="button"
                    disabled={isFile}
                    onClick={handleStartRecording}
                    className={`text-sm px-2 py-1 rounded transition ${isFile
                      ? "bg-green-400 cursor-not-allowed text-slate-700"
                      : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                  >
                    Start Recording
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStopRecording}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-2 py-1 rounded transition"
                  >
                    Stop Recording
                  </button>
                )}
              </div>
            </div>
            <div className="flex justify-center items-center mx-auto mt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
              >
                <MdUpload size={20} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Home;
