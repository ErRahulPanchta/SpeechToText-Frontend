import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { setAudioDetails, setHistoryUpdate } from "../store/audioSlice";

const Sidebar = ({ setSidebarOpen }) => {
  const user = useSelector((state) => state?.user);
  const historyUpdated = useSelector((state) => state.audio.historyUpdated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userHistory, setUserHistory] = useState([]);
  const [sliceCount, setSliceCount] = useState(5);

  const handleResize = () => {
    setSliceCount(window.innerWidth >= 1024 ? 10 : 5);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios(SummaryApi.logout);
      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();
        setUserHistory([]);
        toast.success(response.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const getHistory = async () => {
    try {
      const response = await Axios({ ...SummaryApi.audioHistory });
      if (response.data.history) {
        setUserHistory(response.data.history);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const deleteHistory = async (id) => {
    try {
      const response = await Axios({ ...SummaryApi.deleteAudioHistory(id) });
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setHistoryUpdate());
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    if (user?._id && userHistory) {
      getHistory();
    }
  }, [user, historyUpdated]);

  return (
    <div className="relative border-r border-slate-700 w-[75vw] lg:w-[25vw] h-screen bg-slate-950 flex flex-col justify-between shadow-md z-50">

      <div className="absolute top-4 right-4 lg:hidden">
        <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-slate-200 text-2xl transition">
          <IoClose />
        </button>
      </div>

      <div className="min-h-[15vh] border-b border-slate-700 w-full flex flex-col justify-center items-center px-4 py-6">
        {user?._id ? (
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-400 flex items-center justify-center">
              {user.profile_picture ? (
                <img src={user.profile_picture} alt={user.name} className="object-cover w-full h-full" />
              ) : (
                <FaUser size={48} className="text-gray-500" />
              )}
            </div>
            <p className="text-slate-200 font-semibold text-lg text-center">{user.name}</p>
          </div>
        ) : (
          <Link
            to={"login"}
            className="px-6 py-2 text-xl rounded-full bg-slate-200 text-slate-800 hover:bg-slate-800 hover:text-slate-200 font-semibold transition"
          >
            Login
          </Link>
        )}
      </div>

      <div className="h-[78vh] px-4 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 text-slate-300">
        <h2 className="text-center text-lg font-bold mb-4 border-b border-slate-700 pb-2">
          Transcription History
        </h2>

        {userHistory.length > 0 ? (
          userHistory.map((item, index) => (
            <div
              key={index}
              className="mb-3 p-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 transition cursor-pointer group"
              onClick={() => {
                dispatch(setAudioDetails(item));
                navigate("/history");
                setSidebarOpen(false);
              }}
            >
              <p className="text-sm font-medium text-slate-200 truncate">
                {item.transcript?.split(" ").slice(0, sliceCount).join(" ")}...
              </p>
              <p className="text-xs text-slate-400 mt-1">{new Date(item.createdAt).toLocaleString()}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteHistory(item._id);
                }}
                className="mt-2 text-xs text-red-400 hover:text-red-500 transition font-semibold"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500 text-center">No history found.</p>
        )}
      </div>

      {user?._id && (
        <div className="h-[7vh] flex justify-center items-center border-t border-slate-700">
          <button
            className="px-5 py-2 rounded-full text-sm font-semibold bg-slate-200 text-slate-900 hover:bg-slate-800 hover:text-slate-200 transition"
            onClick={(e) => {
              handleLogout(e);
              setSidebarOpen(false);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
