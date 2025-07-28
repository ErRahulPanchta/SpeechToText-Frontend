import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { setAudioDetails, setHistoryUpdate } from '../store/audioSlice';

const History = () => {
    const { _id, transcript, audio_file } = useSelector((state) => state.audio);
    const dispatch = useDispatch();

    const handleDownloadTranscript = () => {
        const element = document.createElement("a");
        const file = new Blob([transcript], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "transcript.txt";
        document.body.appendChild(element);
        element.click();
    };

    const handleDownloadAudio = () => {
        const link = document.createElement('a');
        link.href = audio_file;
        link.download = "audio.mp3";
        document.body.appendChild(link);
        link.click();
    };

    const handleDelete = async () => {
        if (!_id) return;
        try {
            const response = await Axios(SummaryApi.deleteAudioHistory(_id));
            if (response.data.success) {
                toast.success("Deleted successfully");
                dispatch(setAudioDetails({
                    _id: "",
                    audio_file: "",
                    transcript: "",
                    user: ""
                }));
                dispatch(setHistoryUpdate());
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Transcript Details</h2>

            <div className="bg-slate-800 p-4 rounded-md text-slate-200 text-sm space-y-4">
                {transcript ? (
                    <>
                        <p>{transcript}</p>
                        <div className="flex-col lg:flex-row">
                            <button
                                onClick={handleDownloadTranscript}
                                className="px-4 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-md text-white m-2"
                            >
                                Download Transcript
                            </button>
                            {audio_file && (
                                <button
                                    onClick={handleDownloadAudio}
                                    className="px-4 py-1 text-sm bg-green-600 hover:bg-green-700 rounded-md text-white m-2"
                                >
                                    Download Audio
                                </button>
                            )}
                            <button
                                onClick={handleDelete}
                                className="px-4 py-1 text-sm bg-red-600 hover:bg-red-700 rounded-md text-white m-2"
                            >
                                Delete
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-slate-400">No transcript selected. Please click a title from sidebar history.</p>
                )}
            </div>
        </div>
    );
};

export default History;
