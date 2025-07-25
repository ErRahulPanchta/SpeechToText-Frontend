import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast"
import AxiosToastError from "../utils/AxiosToastError";

const Sidebar = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.logout
      })
      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section>
      <div className="container border-r border-slate-400 w-[25vw] h-screen">
        <div className='min-h-[15vh] border-b border-slate-400 w-full flex flex-col justify-center items-center'>

          {
            user?._id ? <div className="flex items-center gap-3">
              <div className="h-25 w-25 object-fit overflow-clip rounded-full items-center justify-center ">
                <img src={user.profile_picture} alt={user.name} />
              </div>
              <p className="text-slate-200">{user.name}</p>
            </div> : <div>
              <Link to={"login"} className="font-semibold text-slate-800 bg-slate-200 rounded-full cursor-pointer hover:bg-slate-800 hover:text-slate-200 flex justify-center items-center h-15 w-15 p-10 text-2xl " >Login</Link>
            </div>
          }

        </div>
        <div className=' min-h-[80vh] border-b border-slate-400'>
          history
        </div>
        <div className='min-h-[5vh] flex justify-center'>
          {
            user?._id ? <button className="text-slate-800 bg-slate-200 rounded-full cursor-pointer hover:bg-slate-800 hover:text-slate-200 flex justify-center items-center h-6 w-15 p-0.5 m-1" onClick={handleLogout}>Logout</button> : ""
          }
        </div>
      </div>
    </section>
  )
}

export default Sidebar