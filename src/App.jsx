import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from "./utils/fetchUserDetails";
import { useEffect } from "react";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";


function App() {
  const dispatch = useDispatch()
  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData))
  }
  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <div className="bg-slate-900 min-h-screen min-w-screen flex flex-1/2 overflow-hidden">
      <div>
        <Sidebar />
      </div>
      <main className=" flex flex-col w-[75vw]">
        <Header />
        <Outlet />
        <Footer />
      </main>
      <Toaster />
    </div>
  )
}

export default App