import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';
import fetchUserDetails from "./utils/fetchUserDetails";
import { useEffect, useState } from "react";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchUser = async () => {
    try {
      const userData = await fetchUserDetails();
      if (userData && userData._id) {
        dispatch(setUserDetails(userData))
      }
    } catch (error) {
      console.error("user fetch failed", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchUser()
    }
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen min-w-screen flex overflow-hidden">
      <div className={`${sidebarOpen ? "block" : "hidden"} lg:block fixed lg:static z-50`}>
        <Sidebar setSidebarOpen={setSidebarOpen} />
      </div>
      <main className="flex flex-col w-full lg:w-[75vw]">
        <Header setSidebarOpen={setSidebarOpen} />
        <Outlet />
        <Footer />
      </main>
      <Toaster />
    </div>
  )
}

export default App;
